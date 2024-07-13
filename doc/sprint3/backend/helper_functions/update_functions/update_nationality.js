async function update_natinality(tx, uid, nationality) {
    // tx is a transaction object, make sure either complete all the queries or none
    try {
        await tx.run(`
            MATCH (u: User{uid: $uid})-[r:HAS_NATIONALITY]->(:Nationality)
            DELETE r
            WITH u
            MATCH (n: Nationality{name: $nationality})
            CREATE (u)-[:HAS_NATIONALITY]->(n);
        `, { uid: uid, nationality: nationality });
        return true;
    } catch (error) {
        console.error('Error in updating natioality: ', error);
        throw error;
    } 
};

module.exports = update_natinality;