// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

export default function handler(req: NextApiRequest, res: NextApiResponse<{ message: string } | { error: string }>) {
    if (req.method === "POST") {
        // Invalidate the token cookie by setting it with a past expiration date
        setCookie({ res }, "authenticated-token", "", {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            maxAge: -1, // Negative maxAge will remove the cookie
            path: "/",
        });
        return res.status(200).json({ message: "Logout successful" });
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
