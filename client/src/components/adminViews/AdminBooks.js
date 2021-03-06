import React, {useState, useEffect} from 'react'
import { Container, Row , Button} from 'react-bootstrap';
import axios from '../../components/api/axios';
import { Link , useHistory } from 'react-router-dom';
import WithAdminHeaders from '../../HOC/WithAdminHeaders'
import './table.module.css'
import MaterialTable, {MTableToolbar} from 'material-table'
import { Tag ,Modal  } from 'antd';
import {
    ExclamationCircleOutlined,
} from '@ant-design/icons'
const { confirm } = Modal;


function AdminBooks({setSelectedKeys}) {
        const [books, setBooks] = useState([]);
        const history = useHistory()
        ////// add sppinner
        useEffect(() => {
            setSelectedKeys(['1'])
            axios.get('/admin/books')
                .then(res => {
                    setBooks(res.data)
                })
                .catch(err => {
                    console.log(err);
                })
        }, [])
    
    
        const deleteBook = (id)=>{
            confirm({
                title: `Are you sure you want to delete this Book?`,
                icon: <ExclamationCircleOutlined />,
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk() {
                    return axios.delete(`/admin/books/${id}`)
                    .then(res=>{
                        setBooks(books.filter(book=>book._id!==id))
                    })
                    .catch(err=>console.log(err))
                },
                onCancel() { },
            });
            
        }
    
        return (
                <Container fluid>
                <Row className="justify-content-md-center"><h2>Books List</h2></Row>
                <MaterialTable
                    title="Books"
                    columns={[
                        { title: 'Cover', field: 'photo', render: rowData => <img src={`/${rowData.photo}`} style={{width: 40 }}/> , sorting: false, grouping: false },
                        { title: 'Title', field: 'name', customSort: (a, b) => a.name.localeCompare(b.name), grouping: false },
                        { title: 'Author', field: 'author.firstname' },
                        { title: 'Category', field: 'categories', render: rowData => rowData.categories.map((cat,index)=><Tag color="geekblue" key={index}>{cat.name}</Tag> ), sorting: false ,grouping: false }
                    ]}
                    data={books}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit Book',
                            onClick: (event, rowData) => history.push(`/admin/books/edit/${rowData._id}`)
                        },
                        rowData => ({
                            icon: 'delete',
                            tooltip: 'Delete Book',
                            onClick: (event, rowData) => deleteBook(rowData._id)
                        })
                    ]}
                    options={{
                        actionsColumnIndex: -1,
                        grouping: true,
                    }}
                    components={{
                        Toolbar: props => (
                            <>
                            <MTableToolbar {...props} />
                            <div style={{padding: '0px 10px'}}>
                            <Button variant="success" as={Link} to="/admin/books/add" >+ Add Book</Button>
                            </div>
                            </>
                        ),
                      }}
                />
                </Container>
        )
}

export default WithAdminHeaders(AdminBooks)
