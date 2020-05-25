import React, { useState, useEffect }from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import WithUserHeaders from '../../HOC/WithUserHeaders'
import Category from './Category'

function Categories() {

    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        axios.get('/categories')
        .then(res => {
            setCategories(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    return (
        
        <div>
            <Container>   
                <h1>Categories</h1>
                <Row>
                {
                    categories.map((category) => 
                        <Col key={category._id} className="col-12 col-md-4" style={{margin:'10px', textAlign: 'center'}} >
                            <Category category={category}/>
                        </Col>
                    )
                }
                </Row>
            </Container>
        </div>
    )
}

export default WithUserHeaders(Categories)
