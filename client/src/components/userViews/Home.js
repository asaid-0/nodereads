import React from 'react'
import WithUserHeaders from '../../HOC/WithUserHeaders'

function Home() {
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default WithUserHeaders(Home)
