import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
    EditFilled,
    DeleteFilled,
} from '@ant-design/icons';


function CategoryRow({ category, index, deleteCategory }) {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{category.name}</td>
            <td>
                <Button variant="info" as={Link} to={`/admin/categories/edit/${category._id}`} style={{marginRight:"0.2rem"}} ><EditFilled style={{ fontSize: '20px' }}/> </Button>
                <Button variant="danger" onClick={() => deleteCategory(category._id)}><DeleteFilled style={{ fontSize: '20px' }}/></Button>
            </td>
        </tr>
    )
}

export default CategoryRow
