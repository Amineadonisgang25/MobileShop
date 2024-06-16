'use client';
import React, { useState  } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';


type formData = {
    email: string;
    password: string;
}

const Login_old: React.FC = () => {
    const [userData, setUserData] = useState<formData>({ email: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);

    const router = useRouter();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{10,}$/;
        return passwordRegex.test(password);
    }

    const handleUserData = async (e: React.FormEvent) => {
        e.preventDefault();
        setValidationError(null);

        if (!validateEmail(userData.email)) {
            setValidationError("Invalid email format.");
            return;
        }

        if (!validatePassword(userData.password)) {
            setValidationError("Password must be at least 10 characters long and contain at least one special character.");
            return;
        }

        try {
            const response = await axios.post('/api/login', userData);
            // router.push('/'); // Redirect to the home page
            window.location.replace('/');

            console.log("Logged in user ID:", response.data.userId);
        } catch (err) {
            setError("Login failed. Please check your credentials and try again.");
            console.error(err);
        }
    }

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setUserData({ ...userData, email });
    }

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setUserData({ ...userData, password });
    };

    return (
        <div>
            <form method="POST" onSubmit={handleUserData}>
                <label>Type your Email</label>
                <input name="email" type="email" placeholder="Jhon@deho.fr" onChange={handleEmailInput} />
                <label>Type your Password</label>
                <input name="password" type="password" placeholder="*******" onChange={handlePasswordInput} />
                <button type="submit">Log In</button>
            </form>
            {validationError && <p>{validationError}</p>}
            {error && <p>{error}</p>}
        </div>
    );
}

export default Login_old;
