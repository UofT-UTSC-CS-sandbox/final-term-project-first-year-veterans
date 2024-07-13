const neo4j = require('neo4j-driver');

// Function to convert Neo4j DateTime and Integer to string/number
function convertNeo4jTypes(obj) {
    if (neo4j.isDateTime(obj)) {
        return obj.toString();
    } else if (neo4j.isInt(obj)) {
        return obj.toNumber();
    } else if (typeof obj === 'object' && obj !== null) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                obj[key] = convertNeo4jTypes(obj[key]);
            }
        }
    }
    return obj;
}

module.exports = { convertNeo4jTypes };