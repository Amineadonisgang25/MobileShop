// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";
import jwt from "jsonwebtoken";

type Data = {
    userId: number;
};

type formData = {
    email: string;
    password: string;
};

const JWT_SECRET = "your_secret_key"; // Make sure to replace this with an environment variable

export default function handler(req: NextApiRequest, res: NextApiResponse<Data | { error: string }>) {
    if (req.method === "POST") {
        const { email, password } = req.body as formData;

        if (email && password) {
            // Generate a random userId for demonstration purposes
            const userId = Math.floor(Math.random() * 1000000000);

            // Generate a token
            const token = jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '1h' });

            // Set the token in a cookie
            setCookie({ res }, "authenticated-token", token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
                maxAge: 3600,
                path: "/",
            });

            return res.status(200).json({ userId });
        } else {
            return res.status(400).json({ error: "Invalid email or password" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
