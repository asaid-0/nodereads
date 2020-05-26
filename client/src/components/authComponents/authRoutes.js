import { Route, Redirect } from 'react-router-dom';
import React, { useEffect, useContext } from 'react';
// import { checkAuth } from './authHelpers';
import { UserContext } from './authContext';


function UserRoute(props) {
    // console.log(useContext(UserContext));

    const { user } = useContext(UserContext);
    console.log("User route: ,,,... ", user);
    const token = sessionStorage.getItem("token");
    const { component: Component, ...rest } = props;
    const RenderComponent = (p) => {
        if (user && user._id) {
            return <Component {...p} />
        } else {
            return <Redirect to={{
                pathname: "/login",
                state: { from: p.location },
            }} />;
        }
    }

    return (
        <Route
            {...rest}
            component={RenderComponent}
        />
    );
}

function AdminRoute(props) {
    // console.log(useContext(UserContext));

    const { user, setUser } = useContext(UserContext);
    // console.log(user);
    const { component: Component, ...rest } = props;
    // console.log(Component);
    const RenderComponent = (p) => {
        if (user && user.isAdmin) {
            return <Component {...p} />
        } else {
            return <Redirect to={{
                pathname: "/login",
                state: { from: p.location },
            }} />;
        }
    }

    return (
        <Route
            {...rest}
            component={RenderComponent}
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