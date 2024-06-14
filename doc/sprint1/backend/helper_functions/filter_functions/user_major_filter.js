async function user_major_filter(session, nodes, majors) {
    const results = nodes.records.map(record => {
        // Use the id on node in neo4j to identify the node
        // Convert the neo4j integer to a javascript number
        return { id: record.get('node').identity.toInt() }; 
    });

    const secondaryQuery = `
        UNWIND $results AS result 
        MATCH (n)-[:IS_STUDENT]->(p)-[:MAJOR_IN]->(k) 
        WHERE id(n) = result.id AND ANY(major in $majors WHERE k.name = major)
        RETURN n AS node
    `;
    const params = {results, majors};

    const secondaryResult = await session.run(secondaryQuery, params);
    return secondaryResult;
};

module.exports = user_major_filter;