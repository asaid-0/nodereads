import React, { useState, useEffect } from 'react'
import { Container, Row, Button } from 'react-bootstrap';
import axios from '../../components/api/axios';
import { Link, useHistory } from 'react-router-dom';
import WithAdminHeaders from '../../HOC/WithAdminHeaders'
import './table.module.css'
import MaterialTable, { MTableToolbar } from 'material-table'
import { Tag ,Modal  } from 'antd';
import {
    ExclamationCircleOutlined,
} from '@ant-design/icons'
const { confirm } = Modal;

function AdminCategories({ setSelectedKeys }) {
    const [categories, setCategories] = useState([]);
    const history = useHistory()

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


    const deleteCategory = (id) => {
        confirm({
            title: `Are you sure you want to delete this Category?`,
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                return axios.delete(`/admin/categories/${id}`)
                .then(res => {
                    setCategories(categories.filter(category => category._id !== id))
                })
                .catch(err => console.log(err))
            },
            onCancel() { },
        });
    }

    return (
        <Container fluid>
            <Row className="justify-content-md-center"><h2>Categories List</h2></Row>
            <MaterialTable
                title="Categories"
                columns={[
                    { title: 'Category Name', field: 'name', customSort: (a, b) => a.name.localeCompare(b.name), grouping: false },
                ]}
                data={categories}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Category',
                        onClick: (event, rowData) => history.push(`/admin/categories/edit/${rowData._id}`)
                    },
                    rowData => ({
                        icon: 'delete',
                        tooltip: 'Delete Category',
                        onClick: (event, rowData) => deleteCategory(rowData._id)
                    })
                ]}
                options={{
                    actionsColumnIndex: -1,
                }}
                components={{
                    Toolbar: props => (
                        <>
                            <MTableToolbar {...props} />
                            <div style={{ padding: '0px 10px' }}>
                                <Button variant="success" as={Link} to="/admin/categories/add" >+ Add Category</Button>
                            </div>
                        </>
                    ),
                }}
            />
        </Container>
    )
}

export default WithAdminHeaders(AdminCategories)
