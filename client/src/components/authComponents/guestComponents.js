import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup } from "react-bootstrap";
import useError from './utils/useError';
import Error from '../ui_components/Error';
import { validateLoginForm } from './authHelpers';
import { UserContext } from './authContext';
import { useEffect } from 'react';

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

                // console.log("MyProps: ", props.location.state.from.pathname);
                history.push(props.location.state.from.pathname);
            }
        }


    }, [user])

    const handleSubmit = () => {
        if (validateLoginForm(userEmail, userPassword, showError)) {
            setLoading(true);
            fetch('/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ email: userEmail, password: userPassword })
            })
                .then(response => response.json())
                .then(json => {
                    if (json.status === "success") {
                        sessionStorage.setItem('token', json.token);
                        const userInfo = JSON.parse(window.atob(json.token.split('.')[1].replace(/_/g, '/').replace(/-/g, '+')));
                        setUser(userInfo);
                        history.push(props.location.state.from.pathname);
                    } else {
                        handleError(json.message)
                        // console.log(json);
                    }
                })
                .catch(err => {
                    // console.log(err);
                    handleError(err.message)
                });
        }
        // console.log(user);
    }

    return (
        <Form
            onSubmit={e => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <Error error={error} />
            <h5>Sign in</h5>
            <br />
            <FormGroup>
                <Form.Control
                    type="email"
                    name="email"
                    value={userEmail}
                    placeholder="Email"
                    onChange={e => setUserEmail(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Form.Control
                    type="password"
                    name="password"
                    value={userPassword}
                    placeholder="Password"
                    onChange={e => setUserPassword(e.target.value)}
                />
            </FormGroup>
            <Button type="submit" disabled={loading} block={true}>
                {loading ? "Loading..." : "Sign In"}
            </Button>
        </Form>
    );
}

function Register() {

}

export {
    Login,
    Register
}