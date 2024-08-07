async function update_gender(tx, uid, gender) {
    // tx is a transaction object, make sure either complete all the queries or none
    try {
        await tx.run(`
            MATCH (u: User{uid: $uid})-[r:HAS_GENDER]->(:Gender)
            DELETE r
            WITH u
            MATCH (g: Gender{type: $gender})
            CREATE (u)-[:HAS_GENDER]->(g);
        `, { uid: uid, gender: gender });
        return true;
    } catch (error) {
        console.error('Error in updating gender: ', error);
        throw error;
    } 
};

module.exports = update_gender;