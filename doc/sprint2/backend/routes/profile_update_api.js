const express = require('express');
const router = express.Router();
const update_major = require('../helper_functions/update_functions/update_major');
const update_minor = require('../helper_functions/update_functions/update_minor');
const update_nationality = require('../helper_functions/update_functions/update_nationality');
const update_gender = require('../helper_functions/update_functions/update_gender');
const update_institution = require('../helper_functions/update_functions/update_institution');

const { getSession } = require('../neo4j');

// Middleware to parse JSON bodies
router.use(express.json());

router.post('/api/profile/update', async (req, res) => {
    // Access data from the request body
    console.log("Server received: POST /api/profile/update");
    let uid = req.body.uid;
    let new_profile = req.body.profiles;
    console.log("new_profile: ", new_profile);

    const session = getSession();
    // tx is a transaction object, make sure either complete all the queries or none
    const tx = session.beginTransaction();

    try {
        await tx.run(`
            MATCH (u:User {uid: $uid})
            SET u.email = $email;
        `, { uid: uid, email: new_profile.email });

        await tx.run(`
            MATCH (u:User {uid: $uid})-[:HAS_PROFILE]->(p:User_profile)
            SET p.first_name = $first_name, p.last_name = $last_name, p.phone_number = $phone_number, p.age = $age;
        `, { uid: uid, first_name: new_profile.first_name, last_name: new_profile.last_name, phone_number: new_profile.phone_number, age: new_profile.age });

        await update_nationality(tx, uid, new_profile.nationality);

        await update_gender(tx, uid, new_profile.gender);

        await update_institution(tx, uid, new_profile.institution);

        await update_major(tx, uid, new_profile.major);
        
        await update_minor(tx, uid, new_profile.minor);

        await tx.commit();
        res.status(200).json({ message: 'Profile updated' });
    } catch (error) {
        await tx.rollback();
        console.error('Error updating profile: ', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await session.close();
    }

});

module.exports = router;