import React, { useState, useEffect }from 'react'
import WithUserHeaders from '../../HOC/WithUserHeaders'
import { Container, Row, Col } from 'react-bootstrap';
import axios from '../../components/api/axios';

function Category(){
    return(
        <div>
            <h1>Category</h1>
        </div>
    )
}

export default WithUserHeaders(Category)