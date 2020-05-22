import { Route, Redirect } from 'react-router-dom';
import React, { useEffect, useContext } from 'react';
// import { checkAuth } from './authHelpers';
import { UserContext } from './authContext';

function UserRoute(props) {
    // console.log(useContext(UserContext));

    const {user, setUser} = useContext(UserContext);
    // if(!user) {
    //     const token = sessionStorage.getItem('token')
    //     if(token) {
    //         const userInfo = token.split('.')[1].replace(/_/g, '/').replace(/-/g, '+');
    //         setUser(JSON.parse(window.atob(userInfo)));
    //     }
    // }

    const { component: Component, ...rest } = props;
    const RenderComponent = () => {
        if (user && user._id) {
            return <Component {...props} />
        } else {
            return <Redirect to={{
                pathname: "/login",
                state: { from: props.location },
            }} />;
        }
    }

    return (
        <Route
            {...rest}
            render={ RenderComponent }
        />
    );
}


function AdminRoute(props) {
    const { component: Component, ...rest } = props;
    const RenderComponent = () => {
        if (true) {
            return <Component {...props} />
        } else {
            return <Redirect to={{
                pathname: "/login",
                state: { from: props.location },
            }} />;
        }
    }

    return (
        <Route
            {...rest}
            render={ RenderComponent }
        />
    );
}

// const logOut = () => {
//     Cookies.remove('__session')
// }

export {
    UserRoute,
    AdminRoute
}