async function update_minor(tx, uid, minors) { 
    // tx is a transaction object, make sure either complete all the queries or none
    try {
        const deleteQuery = `
            MATCH (s:Student {sid: $uid})-[r:MINOR_IN]->(:Academic_disciplines)
            DELETE r;
        `;
        await tx.run(deleteQuery, { uid });

        const createQueries = minors.map(minor => {
            const createQuery = `
                MATCH (s:Student {sid: $uid})
                WITH s
                MATCH (a:Academic_disciplines {name: $minor})
                CREATE (s)-[:MINOR_IN]->(a);
            `;
            return tx.run(createQuery, { uid: uid, minor: minor });
        });

        await Promise.all(createQueries);
        return true;
    } catch (error) {
        console.error('Error in updating minors: ', error);
        throw error;
    }
};

module.exports = update_minor;