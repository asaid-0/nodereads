import React, { useState, useEffect }from 'react'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap';
import WithUserHeaders from '../../HOC/WithUserHeaders'
import CategoryCard from './CategoryCard'

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
                    categories ? categories.map((category) => 
                        <Col key={category._id} className="col-12 col-md-4" style={{margin:'10px', textAlign: 'center'}} >
                            <CategoryCard category={category}/>
                        </Col>
                    ) : 
                    <h2>No categories</h2>
                }
                </Row>
            </Container>
        </div>
    )
}

export default WithUserHeaders(Categories)
