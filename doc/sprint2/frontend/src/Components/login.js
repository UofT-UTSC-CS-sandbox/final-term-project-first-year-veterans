import React from 'react';
import { useState } from 'react';
import '../Asset/Css/login.css';
import { api_signin } from './api';

function Login({onLogin}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = (event) => {
        event.preventDefault();

        const signIn_data = { email: email, password: password};

        api_signin(signIn_data, (data) => {
            const {signinCorrect} = data;
            console.log(signinCorrect);
            if (!signinCorrect) console.log("sign in failed");
            else {
                console.log("sign in sucessful");
                onLogin(true);
            }
        });
    };

    return (
      <div className="Login">
        <main className="form-signin w-100 m-auto">
            <form>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <input 
                        type="email" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="name@example.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input 
                        type="password" 
                        className="form-control" 
                        id="floatingPassword" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="form-check text-start my-3">
                    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Remember me
                    </label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit" onClick={handleClick}>Sign in</button>
                <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
            </form>
        </main>
      </div>
    );
}

export default Login;