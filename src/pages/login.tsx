"use client";
import React, {useState} from 'react'
import {useFormik} from "formik"
import styles from '../components/login.module.css'
import * as yup from 'yup';
import {useRouter} from "next/router";
import axios from 'axios';
import Header from "../components/header";
import type {ServerError} from "@/types";
const LoginUpdate : React.FC = () => {
    const router = useRouter();

    //retrieve the scenario that the validation is not ok after the serer response (404 error or 500 internal server error)
    const[serverError , setServerError] = useState<string|null>(null);

    //define the userSchema that will be triggered to validate the data typed by user
    const userSchema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().required().
        min(10).matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    });

    //useFormik it's a hook that we use from formik library with attributes like initialValues ; validationSchema ; actions like onSubmit
    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: userSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await axios.post('/api/login', values);
                 router.back(); // Redirect to the home page
                console.log("Logged in user ID:", response.data.userId);
            } catch (e) {
                const err = e as ServerError;
                if (err.response?.data?.error) {
                        setServerError(err.response.data.error);
                    } else {
                        setServerError("An unexpected error occurred. Please try again later.");
                    }
                setSubmitting(false);
            }
        },
    });

    return (
        <div>
            <Header/>
            <div className={styles.bodyform}>
                <form id="form" onSubmit={formik.handleSubmit} className={styles.form}>
                    <fieldset><h2 className={styles.fsTitle}>Sign In To your account</h2></fieldset>
                    <label htmlFor="email">Email Address</label>
                    <input className={styles.input} id="email" name="email" type="email" value={formik.values.email}
                           onChange={formik.handleChange}/>
                    {/*in cas of clicking the input email field and there is an error while typing */}
                    {formik.touched.email && formik.errors.email ? (
                        <p className={styles.validation}>{formik.errors.email}</p>
                    ) : null}

                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" value={formik.values.password}
                           onChange={formik.handleChange}/>
                    {/*in cas of clicking the input password field and there is an error while typing */}
                    {formik.touched.password && formik.errors.password ? (
                        <p className={styles.validation}>{formik.errors.password}</p>
                    ) : null}
                    {/*Show the server Error*/}
                    {serverError ? (
                        <p className={styles.validation}>{serverError}</p>
                    ) : null}
                    <button type="submit"> Submit</button>
                </form>
            </div>
        </div>


)
}
export default LoginUpdate
