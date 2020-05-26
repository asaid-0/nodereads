import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup } from "react-bootstrap";
import useError from './utils/useError';
import Error from '../ui_components/Error';
import { validateLoginForm } from './authHelpers';
import { UserContext } from './authContext';
import { useEffect } from 'react';
import userSchema from '../../schemas/userSchema';
import styles from './guestComponents.module.css';

export default function Register(props) {

    const history = useHistory();
    const { setUser: setUserSession } = useContext(UserContext);
    const [user, setUser] = useState({});
    const { error, showError } = useError({});
    const [btnMessage, setBtnMessage] = useState("Sign Up");

    const handleError = (error) => {
        console.log(error.details);
        setBtnMessage("Sign Up");
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
        const cleanedData = newUserSchema.clean({ ...user, userPhoto: user.userPhoto ? user.userPhoto.name : null });
        try {
            newUserSchema.validate(cleanedData);

        } catch (err) {
            return handleError(err);
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
                console.log("json: ... ", json);
                if (json.status === "success") {
                    sessionStorage.setItem('token', json.token);
                    const userInfo = JSON.parse(window.atob(json.token.split('.')[1].replace(/_/g, '/').replace(/-/g, '+')));
                    setUserSession(userInfo);
                    setBtnMessage("Registeration Successful .. Redirecting !")
                    setTimeout(() => {
                        window.location.pathname = '/home';
                    }, 3 * 1000);
                } else {
                    setBtnMessage("Sign Up");
                    showError({ ...error, email: "Email is already registered!" });
                }
            })
            .catch(err => {
                // alert(err);
                console.log(err);
            });

    }

    return (


        <section className={styles.entry_page} id="entry-page">

                <Form className={styles.form} onSubmit={handleSubmit}>
                    <h2 className={styles.h2}>Sign Up!</h2>
                    {error.response && <Error error={error.response} />}
                    <fieldset style={{paddingLeft: "1rem"}} className={styles.fieldset}>
                        <legend className={styles.legend}>Create Account</legend>

                        <ul className={styles.ul}>
                        
                        {error.firstName && <Error error={error.firstName} />}
                            <li className={styles.li}>
                                <label className={styles.label} for="firstname">Firstname:</label>
                                <FormGroup>
                                    <Form.Control
                                        className={styles.input}
                                        type="text"
                                        name="firstName"
                                        id="firstname"
                                        placeholder="First Name"
                                        onChange={handleInput}
                                        value={user.firstName}
                                    />
                                </FormGroup>
                            </li>

                            {error.lastName && <Error error={error.lastName} />}
                            <li className={styles.li}>
                                <label className={styles.label} for="lastname">Lastname:</label>
                                <FormGroup>
                                    <Form.Control
                                        className={styles.input}
                                        type="text"
                                        name="lastName"
                                        id="lastname"
                                        placeholder="Last Name"
                                        onChange={handleInput}
                                        value={user.lastName}
                                    />
                                </FormGroup>
                            </li>

                            {error.email && <Error error={error.email} />}
                            <li className={styles.li}>
                                <label className={styles.label} for="email">Email:</label>
                                <FormGroup>
                                    <Form.Control
                                        className={styles.input}
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Email"
                                        onChange={handleInput}
                                        value={user.email}
                                    />
                                </FormGroup>
                            </li>

                            {error.password && <Error error={error.password} />}
                            <li className={styles.li}>
                                <label className={styles.label} for="password">Password:</label>
                                <FormGroup>
                                    <Form.Control
                                        className={styles.input}
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        onChange={handleInput}
                                        value={user.password}
                                    />
                                </FormGroup>
                            </li>

                            {error.confirmPassword && <Error error={error.confirmPassword} />}
                            <li className={styles.li}>
                                <label className={styles.label} for="confirmPassword">Password Confirmation:</label>
                                <FormGroup>
                                    <Form.Control
                                        className={styles.input}
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        placeholder="Password Confirmation"
                                        onChange={handleInput}
                                        value={user.confirmPassword}
                                    />
                                </FormGroup>

                            </li>

                            {error.userPhoto && <Error error={error.userPhoto} />}
                            <li className={styles.li}>
                                <label className={styles.label} for="userPhoto">User Image:</label>
                                <Form.Group controlId="formImage">
                                    <Form.File
                                        id="userPhoto"
                                        label="Upload User Image"
                                        name="userPhoto"
                                        onChange={handleFileChange}
                                        custom
                                    />
                                </Form.Group>
                            </li>
                        </ul>
                    </fieldset>

                    <Button type="submit" disabled={btnMessage != "Sign Up"} block={true}>
                        {btnMessage}
                    </Button>
                    <button className={styles.button} type="button" onClick={() => history.push('/login')}>Have an Account?</button>
                </Form>
        </section>
    );
}