import React, { useState, useEffect } from 'react'
import { Container, Row, Table ,Button } from 'react-bootstrap';
import axios from 'axios'
import CategoryRow from './CategoryRow';
import { Link } from 'react-router-dom';
import WithAdminHeaders from '../../HOC/WithAdminHeaders'
import './table.module.css'

function AdminCategories({setSelectedKeys}) {
    const [categories, setCategories] = useState([]);

    ////// add sppinner
    useEffect(() => {
        setSelectedKeys(['3'])
        axios.get('/admin/categories')
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    const deleteCategory = (id)=>{
        axios.delete(`/admin/categories/${id}`)
        .then(res=>{
            setCategories(categories.filter(category=>category._id!==id))
            console.log(
                res.data.name + "deleted"
            );
        })
        .catch(err=>console.log(err))
    }

    return (
        <Container fluid>
             <Row className="justify-content-md-center"><h2>Categories List</h2></Row>
                <Row><Button style={{marginBottom:'10px'}} variant="success" as={Link} to="/admin/categories/add" >+ Add Category</Button> </Row>
            <Row>
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Category Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ?
                            categories.map((category, index) => {
                                return <CategoryRow category={category} index={index} key={index} deleteCategory={deleteCategory} />
                            }) :
                            <tr>
                                <td colSpan={6}>No Categories</td>
                            </tr>
                        }
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}

export default WithAdminHeaders(AdminCategories)
