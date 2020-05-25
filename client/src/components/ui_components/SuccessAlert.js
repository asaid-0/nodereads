import React from 'react'
import { Alert } from 'antd';

function SuccessAlert({message}) {
    return (
             <Alert
             message={message}
             type="success"
             showIcon
             closable
             />
    )
}

export default SuccessAlert
