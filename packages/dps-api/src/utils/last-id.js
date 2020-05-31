/**
 * @param {Object} entries The current batch of Entries being processed.
 * @returns {String|undefined} The ID of the last Entry in said batch. If EOF, undefined.
 * @summary Fetch id of last entry in given batch. 
 */
const calculateLastProcessedID = (entries) => {
    if (entries.length > 0) { 
        let [newLastProcessedID] = entries.slice(-1)
        return newLastProcessedID.createdAt
        }
    else {
        return undefined
    }
    }
module.exports = calculateLastProcessedID;