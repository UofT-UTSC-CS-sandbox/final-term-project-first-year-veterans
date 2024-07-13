
// import { verify } from 'jsonwebtoken';

// const SECRET_KEY = 'your_secret_key'

// DB = [

//     {email: 'email', password: 'password', username: 'username1'},
//     {email: 'email2', password: 'password2', username: 'username2'},

// ]

// const generalStatement = "Failed to authenticate token";

// function checkAuth(req, res, next) {
//     const token = req.cookies.auth;

//     if (!token) {
//         return false;
//     }

//     verify(token, SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return false
//     }


//     return DB.find(user => user.id === decoded.id);
//     });
// };
// export default { checkAuth };
