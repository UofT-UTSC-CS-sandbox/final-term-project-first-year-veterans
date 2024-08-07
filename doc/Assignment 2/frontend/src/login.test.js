import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import Login from './Components/Login';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react';

test('renders login page and check email field', async () => {
    await act(async () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
    });
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();

});

test('renders login page and check password field', async () => {
    await act(async () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
    });
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
});

test('renders login page and check login button', async () => {
    await act(async () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
    });

    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
}
);

