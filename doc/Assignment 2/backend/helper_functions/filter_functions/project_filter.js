async function project_filter(session, nodes) {
    const results = nodes.records.map(record => {
        // Use the id on node in neo4j to identify the node
        // Convert the neo4j integer to a javascript number
        return { id: record.get('node').identity.toInt() }; 
    });

    const secondaryQuery = `
        UNWIND $results AS result 
        MATCH (n) 
        WHERE id(n) = result.id AND 'Project' IN labels(n)
        RETURN n AS node
    `;
    const params = { results };

    const secondaryResult = await session.run(secondaryQuery, params);
    return secondaryResult;
};

module.exports = project_filter;