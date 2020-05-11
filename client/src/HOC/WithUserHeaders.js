import React from 'react'
import NavBar from '../components/NavBar'


const WithUserHeaders = (Comp) => (props)=>{
    return (
        <>
            <NavBar/>
            <Comp {...props}/>
        </>
    )
}


export default WithUserHeaders