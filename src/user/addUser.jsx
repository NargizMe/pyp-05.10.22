import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import {useNavigate} from "react-router";
import { Button, ButtonGroup, Heading, Input } from "@chakra-ui/react"

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
          <Heading as='h4' size='md' style={{margin: '50px 0 20px 0'}}>User Addition</Heading>
            <Formik
                initialValues={{ email: '', firstName: '', lastName: '', birthDay: '' }}
                validationSchema={DisplayingErrorMessagesSchema}
                onSubmit={(values, { setSubmitting }) => {
                    axios.post(`http://localhost:8080/addUser`, values);
                    navigate("/user");
                }}
            >
                {({ errors, touched }) => (
                    <Form style={{display: 'flex', flexDirection: 'column', width: '300px', rowGap: '13px'}}>
                        <Field name="firstName" placeholder="First Name" style={{border: '1px solid black', padding: '5px 13px'}}/>
                        {touched.firstName && errors.firstName && <div>{errors.firstName}</div>}
                        <Field name="lastName" placeholder="Last Name" style={{border: '1px solid black', padding: '5px 13px'}}/>
                        {touched.lastName && errors.lastName && <div>{errors.lastName}</div>}
                        <Field name="birthDay" placeholder="Birth Day" style={{border: '1px solid black', padding: '5px 13px'}}/>
                        {touched.birthDay && errors.birthDay && <div>{errors.birthDay}</div>}
                        <Field name="email" placeholder="Email" style={{border: '1px solid black', padding: '5px 13px'}}/>
                        {touched.email && errors.email && <div>{errors.email}</div>}
                        <ButtonGroup variant="link" spacing="8" style={{border: '1px solid black', padding: '5px 13px', width: '100px'}}>
                            <Button type="submit">Submit</Button>
                        </ButtonGroup>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddUser