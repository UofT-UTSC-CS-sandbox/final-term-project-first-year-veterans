async function update_major(tx, uid, majors) { 
    // tx is a transaction object, make sure either complete all the queries or none
    try {
        const deleteQuery = `
            MATCH (s:Student {sid: $uid})-[r:MAJOR_IN]->(:Academic_disciplines)
            DELETE r;
        `;
        await tx.run(deleteQuery, { uid });

        const createQueries = majors.map(major => {
            const createQuery = `
                MATCH (s:Student {sid: $uid})
                WITH s
                MATCH (a:Academic_disciplines {name: $major})
                CREATE (s)-[:MAJOR_IN]->(a);
            `;
            return tx.run(createQuery, { uid: uid, major: major });
        });

        await Promise.all(createQueries);
        return true;
    } catch (error) {
        console.error('Error in updating majors: ', error);
        throw error;
    }
};

module.exports = update_major;