async function update_institution(tx, uid, institution) {
    // tx is a transaction object, make sure either complete all the queries or none
    try {
        await tx.run(`
            MATCH (s:Student {sid: $uid})-[r:ENROLL_IN]->(:Institution)
            DELETE r
            WITH s
            MATCH (i:Institution{name: $institution})
            CREATE (s)-[:ENROLL_IN]->(i);
        `, { uid: uid, institution: institution});
        return true;
    } catch (error) {
        console.error('Error in updating institution: ', error);
        throw error;
    } 
};

module.exports = update_institution;