import React, { useState, useEffect } from 'react'
import { Container, Row, Table, Button } from 'react-bootstrap';
import axios from 'axios'
import { Link , useHistory } from 'react-router-dom';
import WithAdminHeaders from '../../HOC/WithAdminHeaders'
import './table.module.css'
import MaterialTable, {MTableToolbar} from 'material-table'

function AdminAuthors({ setSelectedKeys }) {
    const [authors, setAuthors] = useState([]);
    const history = useHistory()
    ////// add sppinner
    useEffect(() => {
        setSelectedKeys(['2'])
        axios.get('/admin/authors')
            .then(res => {
                setAuthors(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    const deleteAuthor = (event, rowData) => {
        const id= rowData._id
        axios.delete(`/admin/authors/${id}`)
            .then(res => {
                setAuthors(authors.filter(auther => auther._id !== id))
                console.log(
                    res.data.firstname + "deleted"
                );
            })
            .catch(err => console.log(err))
    }


    return (
        <Container fluid>
            <Row className="justify-content-md-center"><h2>Authors List</h2></Row>
                <MaterialTable
                    title="Authors"
                    columns={[
                        { title: 'Photo', field: 'photo', render: rowData => <img src={`/${rowData.photo}`} style={{width: 40 }}/> , sorting: false },
                        { title: 'First Name', field: 'firstname', customSort: (a, b) => a.firstname.localeCompare(b.firstname) },
                        { title: 'last name', field: 'lastname', customSort: (a, b) => a.firstname.localeCompare(b.firstname) },
                        { title: 'Date of Birth', field: 'dob', type: "date" },
                    ]}
                    data={authors}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit Author',
                            onClick: (event, rowData) => history.push(`/admin/authors/edit/${rowData._id}`)
                        },
                        rowData => ({
                            icon: 'delete',
                            tooltip: 'Delete Author',
                            onClick: deleteAuthor,
                        })
                    ]}
                    options={{
                        actionsColumnIndex: -1,
                    }}
                    components={{
                        Toolbar: props => (
                            <>
                            <MTableToolbar {...props} />
                            <div style={{padding: '0px 10px'}}>
                            <Button variant="success" as={Link} to="/admin/authors/add" >+ Add Author</Button>
                            </div>
                            </>
                        ),
                      }}
                />
        </Container>


    )
}

export default WithAdminHeaders(AdminAuthors)
