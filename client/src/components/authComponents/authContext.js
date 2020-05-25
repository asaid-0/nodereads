import { createContext } from "react";


export const UserContext = createContext({});


// import React, { useReducer } from "react";

// let reducer = (user, setUser) => {
//     return { ...user, ...setUser };
// };

// const initialState = {};

// const UserContext = React.createContext();

// function UserProvider(props) {
//     const [user, setUser] = useReducer(reducer, initialState);

//     return (
//         <UserContext.Provider value={{ user, setUser }}>
//             {props.children}
//         </UserContext.Provider>
//     );
// }

// export { UserContext, UserProvider };