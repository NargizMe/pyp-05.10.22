import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import {useNavigate} from "react-router";


const DisplayingErrorMessagesSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

function AddUser() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>User addition</h1>
            <Formik
                initialValues={{ email: '', firstName: '', lastName: '', birthDay: '' }}
                validationSchema={DisplayingErrorMessagesSchema}
                onSubmit={(values, { setSubmitting }) => {
                    axios.post(`http://localhost:8080/addUser`, values);
                    navigate("/user");
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field name="firstName" placeholder="First Name"/>
                        {touched.firstName && errors.firstName && <div>{errors.firstName}</div>}
                        <Field name="lastName" placeholder="Last Name"/>
                        {touched.lastName && errors.lastName && <div>{errors.lastName}</div>}
                        <Field name="birthDay" placeholder="Birth Day"/>
                        {touched.birthDay && errors.birthDay && <div>{errors.birthDay}</div>}
                        <Field name="email" placeholder="Email" />
                        {touched.email && errors.email && <div>{errors.email}</div>}
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddUser