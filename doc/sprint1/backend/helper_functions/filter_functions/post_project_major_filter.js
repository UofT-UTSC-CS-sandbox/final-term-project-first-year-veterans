async function post_project_major_filter(session, nodes, majors) {
    const results = nodes.records.map(record => {
        // Use the id on node in neo4j to identify the node
        // Convert the neo4j integer to a javascript number
        return { id: record.get('node').identity.toInt() }; 
    });

    const secondaryQuery = `
        UNWIND $results AS result 
        MATCH (n)-[:HAS_CATEGORY]->(p)
        WHERE id(n) = result.id AND ANY(major in $majors WHERE p.name = major)
        RETURN n AS node
    `;
    const params = {results, majors};

    const secondaryResult = await session.run(secondaryQuery, params);
    return secondaryResult;
};

module.exports = post_project_major_filter;