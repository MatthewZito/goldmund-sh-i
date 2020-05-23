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