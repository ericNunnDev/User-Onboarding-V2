import React from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const UserForm = (values) => {
    return ( 
        <div>
            <Form>
                <Field type='text' name='name' placeholder='Name' />
                <Field type='email' name='email' placeholder='Email' />
                <Field type='password' name='password' placeholder='Password' />
                <Field type='checkbox' name='tos' checked={values.tos} />
                <span><em>Terms of Service</em></span>
                <br />
                <button>Sign Up</button>
            </Form>
        </div>
     );
}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string()
        .required('A name or username is required'),
        email: Yup.string()
        .email('Email not valid.')
        .required('Please enter an email address.'),
        password: Yup.string()
        .min(6, 'Please create a password that is six characters or longer.')
        .required('Please choose a password that is at least six characters.')
    }),

    handleSubmit(values) {
        console.log(values);
        axios
        .post(`https://reqres.in/api/users`)
        .then(res => {
            console.log(res);
        })
        .catch(e => {
            console.log(e);
        })
    }
})(UserForm);
 
export default FormikUserForm;