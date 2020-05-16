import React from 'react'
import styles from './error.module.css'
import {WarningFilled }from '@ant-design/icons'
import { Row } from 'antd';
function Error(props) {
    return (
    <Row align="middle" className={styles.error}><WarningFilled style={{marginRight:"10px"}}/>{props.error}</Row>
    )
}

export default Error
