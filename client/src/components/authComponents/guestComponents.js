import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup } from "react-bootstrap";
import useError from './utils/useError';
import Error from '../ui_components/Error';
import { validateLoginForm } from './authHelpers';
import { UserContext } from './authContext';
import { useEffect } from 'react';
import styles from './guestComponents.module.css';

function Login(props) {
    const history = useHistory();
    const { user, setUser } = useContext(UserContext);
    const { error, showError } = useError(null);
    const [userEmail, setUserEmail] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleError = (message) => {
        setLoading(false);
        showError(message);
    }
    useEffect(() => {
        if (!user) {
            const token = sessionStorage.getItem('token')
            if (token) {
                const userInfo = JSON.parse(window.atob(token.split('.')[1].replace(/_/g, '/').replace(/-/g, '+')));
                setUser(userInfo);
                let location = "/home";
                if (userInfo.isAdmin) location = "/admin"
                if (props.location.state && props.location.state.from) location = props.location.state.from.pathname;
                window.location.pathname = location;
            }
        }


    }, [user])

    const handleSubmit = () => {
        if (validateLoginForm(userEmail, userPassword, showError)) {
            setLoading(true);
            const req = new Request('/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userEmail, password: userPassword })

            });
            fetch(req)
                .then(response => response.json())
                .then(json => {
                    if (json.status === "success") {
                        sessionStorage.setItem('token', json.token);
                        const userInfo = JSON.parse(window.atob(json.token.split('.')[1].replace(/_/g, '/').replace(/-/g, '+')));
                        setUser(userInfo);
                        let location = "/home";
                        if (props.location.state && props.location.state.from) location = props.location.state.from.pathname;
                        if (!userInfo.isAdmin && location.includes("/admin")) location = "/home";
                        if (userInfo.isAdmin) location = "/admin"
                        window.location.pathname = location;
                    } else {
                        handleError(json.message)
                    }
                })
                .catch(err => {
                    handleError(err.message)
                });
        }
    }



    function currentView() {
        switch ("signIn") {
            case "signUp":
                return (
                    <form>
                        <h2>Sign Up!</h2>
                        <fieldset>
                            <legend>Create Account</legend>
                            <ul>
                                <li>
                                    <label for="username">Username:</label>
                                    <input type="text" id="username" required />
                                </li>
                                <li>
                                    <label for="email">Email:</label>
                                    <input type="email" id="email" required />
                                </li>
                                <li>
                                    <label for="password">Password:</label>
                                    <input type="password" id="password" required />
                                </li>
                            </ul>
                        </fieldset>
                        <button>Submit</button>
                        <button type="button" onClick={() => this.changeView("logIn")}>Have an Account?</button>
                    </form>
                )
                break
            case "logIn":
                return (
                    <Form className={styles.form}
                        onSubmit={e => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <h2 className={styles.h2}>Welcome Back!</h2>
                        <fieldset className={styles.fieldset}>
                            <legend className={styles.legend}>Log In</legend>
                            <ul className={styles.ul}>
                                <li className={styles.li}>
                                    <label className={styles.label} for="username">Username:</label>
                                    <Form.Control
                                        className={styles.input}
                                        type="email"
                                        name="email"
                                        value={userEmail}
                                        placeholder="Email"
                                        onChange={e => setUserEmail(e.target.value)}
                                    />
                                </li>
                                <li className={styles.li}>
                                    <label className={styles.label} for="password">Password:</label>
                                    <Form.Control
                                        className={styles.input}
                                        type="password"
                                        name="password"
                                        value={userPassword}
                                        placeholder="Password"
                                        onChange={e => setUserPassword(e.target.value)}
                                    />

                                </li>
                              
                            </ul>
                        </fieldset>
                        <Button className={styles.button} type="submit" disabled={loading} block={true}>
                            {loading ? "Loading..." : "Sign In"}
                        </Button>
                        <button className={styles.button} type="button" onClick={() => history.push("/register")}>Create an Account</button>
                    </Form>
                )
                break
            default:
                break
        }
    }



    return (

        <section className={styles.entry_page} id="entry-page">
            <Form className={styles.form}
                onSubmit={e => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <h2 className={styles.h2}>Welcome Back!</h2>
                <fieldset style={{paddingLeft: "1rem"}} className={styles.fieldset}>
                    <legend className={styles.legend}>Log In</legend>
                    {error && <Error error={error} />}
                    <ul className={styles.ul}>
                        <li className={styles.li}>
                            <label className={styles.label} for="username">Username:</label>
                            <Form.Control
                                className={styles.input}
                                type="email"
                                name="email"
                                value={userEmail}
                                placeholder="Email"
                                onChange={e => setUserEmail(e.target.value)}
                            />
                        </li>
                        <li className={styles.li}>
                            <label className={styles.label} for="password">Password:</label>
                            <Form.Control
                                className={styles.input}
                                type="password"
                                name="password"
                                value={userPassword}
                                placeholder="Password"
                                onChange={e => setUserPassword(e.target.value)}
                            />

                        </li>
                    </ul>
                </fieldset>
                <Button className={styles.button} type="submit" disabled={loading} block={true}>
                    {loading ? "Loading..." : "Sign In"}
                </Button>
                <button className={styles.button} type="button" onClick={() => history.push("/register")}>Create an Account</button>
            </Form>
        </section>


    );

}

export {
    Login,
}