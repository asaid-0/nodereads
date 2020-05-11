import React from 'react'
import WithUserHeaders from '../../HOC/WithUserHeaders'

function Authors() {
    return (
        <div>
            <h1>Authors</h1>
        </div>
    )
}

export default WithUserHeaders(Authors)
