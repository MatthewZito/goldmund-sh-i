## Mocking a Batch Processor to Optimize MongoDB Performance
*implementing infinite scrolling without expensive database calls*

Per the MongoDB docs:

> The cursor.skip() method is often expensive because it requires the server to walk from the beginning of the collection or  index to get the offset or skip position before beginning to return results. As the offset (e.g. pageNumber above) increases, cursor.skip() will become slower and more CPU intensive. With larger collections, cursor.skip() may become IO bound.

In short, MongoDB queries entail iterating over documents *in order to* skip them. Ergo, calling `cursor.skip` compounds and requires, when dealing with large datasets, such processing power that a cursory glance at said processing power's requirement asymptote - after such compounding has occurred - reveals we quickly approach θn^2 complexity. 

Why, exactly, does using `skip` compound to such heights that we find ourselves with an asynmptotic notation of (at least when dealing with a theoretical dataset that is large*) θn^2? Well, per the Mongo docs, `skip` does not utilize an index - hence why it gets exponentially slower in inverse proportion to dataset size.

The implication here is that the processing speed of `skip` will not improve even if the data framework *is* indexed.

**So, our solution is batch processing**

We can implement this with MongoDB; we just need to get a bit creative. Delving yet even further into the Mongo Docs, one discovers that the ObjectID is indeed neither wholly nor in any part arbitrary. In fact, it is quite useful:


MongoDB's ObjectID is a 12-byte struc comprised of the following:
  - 4-byte value, UNIX timestamp
  - 3-byte machine identifier
  - 2-byte process ID
  - 3-byte counter, begins at random int

We can see here that ObjectID has natural ordering! This means we can evaluate ObjectID's like so:

```
$ ObjectId("4828d49863623919ce12243f") >  ObjectId("4828d49363624919cd56f52e")
false
```

Now, we can implement a custom batch processor by utilizing the custom query method, as introduced by Mongoose v4.5.
If we are not sorting the data, we can rely upon the ID: 
  - pull the ObjectID of the last document in each batch of *n* docs
  - est said ObjectID as cursor to query next batch of *n* docs
    * where *n* docs is a server-side, hard-coded int denoting `limit`

Because I want to have all of my documents sorted by most recent, I cannot rely upon the ObjectID in such a fashion. However, the reserved `gte/lte` operators *will* evaluate my custom `createdAt` field (also a UNIX timestamp). 

Here is the final implementation of the batch processing unit:
```
/**
 * Batch process documents by numReturnedDocs per page, as delimited by `lastProcessedID`. 
 * @param {Object|string} lastProcessedID any createdAt Date ID object signifying cursor qua last processed * batch.
 * Returns all matched entries (even if no res).
 */
EntrySchema.query.processBatch = async function(lastProcessedID=undefined) {
    const numReturnedDocs = 5
    // first page
    if (!lastProcessedID) {
        let entries = await this.find().sort({ createdAt: "desc"}).limit(numReturnedDocs);
        if (!entries) {
            // first batch; if nothing found, likely erroneous
            throw new Error("[-] Unable to query database for entries.")
        }
        return entries
    }
    else {
        return await this.find( { "createdAt": { $lt: lastProcessedID }}).sort({ createdAt: "desc"}).limit(numReturnedDocs);
    }
}
```

