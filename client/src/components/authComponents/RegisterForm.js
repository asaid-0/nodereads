import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup } from "react-bootstrap";
import useError from './utils/useError';
import Error from '../ui_components/Error';
import { validateLoginForm } from './authHelpers';
import { UserContext } from './authContext';
import { useEffect } from 'react';
import userSchema from '../../schemas/userSchema';

export default function Register(props) {

    const history = useHistory();
    const { setUserSession } = useContext(UserContext);
    const [user, setUser] = useState({});
    const { error, showError } = useError({});
    const [btnMessage, setBtnMessage] = useState("Sign Up");

    const handleError = (error) => {
        console.log(error.details);
        setBtnMessage("Sign up");
        const allErrors = error.details.reduce((agg, err) => ({ ...agg, [err.name]: err.message }), {})
        showError(allErrors);
    }

    const handleInput = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleFileChange = e => {
        setUser({ ...user, "userPhoto": e.target.files[0] })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setBtnMessage("Loading ...");
        // validate
        const newUserSchema = userSchema;
        const cleanedData = newUserSchema.clean({ ...user, userPhoto: user.userPhoto.name });
        try {
            newUserSchema.validate(cleanedData);

        } catch (err) {
            handleError(err);
        }
        console.log(user.userPhoto);
        // send 
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        const formData = new FormData();
        formData.append('firstname', user.firstName);
        formData.append('lastname', user.lastName);
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('userPhoto', user.userPhoto);

        const req = new Request('/register', {
            method: 'POST',
            headers: headers,
            mode: 'no-cors',
            body: formData
        });
        fetch(req)
            .then(res => res.json())
            .then(json => {
                if (json.status === "success") {
                    sessionStorage.setItem('token', json.token);
                    const userInfo = JSON.parse(window.atob(json.token.split('.')[1].replace(/_/g, '/').replace(/-/g, '+')));
                    setUser(userInfo);
                    setBtnMessage("Registeration Successful .. Redirecting !")
                    setTimeout(() => {
                        history.push('/home');
                    }, 3 * 1000);
                }
            })
            .catch(err => {
                console.log(err);
            });

    }

    return (
        <div className="container">
            <Form onSubmit={handleSubmit}>
                <br />
                <p><h5>Sign up</h5></p>
                <br />

                <FormGroup>
                    {error.firstName && <Error error={error.firstName} />}
                    <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleInput}
                        value={user.firstName}
                    />
                </FormGroup>

                <FormGroup>
                    {error.lastName && <Error error={error.lastName} />}
                    <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleInput}
                        value={user.lastName}
                    />
                </FormGroup>

                <FormGroup>
                    {error.email && <Error error={error.email} />}
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleInput}
                        value={user.email}
                    />
                </FormGroup>
                <FormGroup>
                    {error.password && <Error error={error.password} />}
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleInput}
                        value={user.password}
                    />
                </FormGroup>

                <FormGroup>
                    {error.confirmPassword && <Error error={error.confirmPassword} />}
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Password Confirmation"
                        onChange={handleInput}
                        value={user.confirmPassword}
                    />
                </FormGroup>



                <Form.Group controlId="formImage">
                    {error.userPhoto && <Error error={error.userPhoto} />}

                    <Form.Label>Image</Form.Label>
                    <Form.File
                        id="userPhoto"
                        label="Upload User Image"
                        name="userPhoto"
                        onChange={handleFileChange}
                        custom
                    />
                </Form.Group>

                <Button type="submit" disabled={btnMessage != "Sign Up"} block={true}>
                    {btnMessage}
                </Button>
            </Form>
        </div>
    );
}