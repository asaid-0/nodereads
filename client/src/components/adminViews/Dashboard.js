import React from 'react'
import WithAdminHeaders from '../../HOC/WithAdminHeaders'

function Dashboard() {
    return (
        <>
            <h1>Admin Dashboard</h1>
        </>
    )
}

export default WithAdminHeaders(Dashboard)
