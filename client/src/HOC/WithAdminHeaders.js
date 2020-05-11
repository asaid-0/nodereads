import React from 'react'
import AdminHeaders from './../components/adminViews/AdminHeaders'


const WithAdminHeaders = (Comp) => (props)=>{
    return (
        <>
            <AdminHeaders {...props}/>
            <Comp {...props}/>
        </>
    )
}

export default WithAdminHeaders
