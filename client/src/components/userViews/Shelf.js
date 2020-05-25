import React, { useState, useEffect, useContext}from 'react'
import axios from '../../components/api/axios';

const Shelf = ({book}) => {
    const options = ["add to shelf", "want to read", "read", "reading"]
    const [shelf, setShelf] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:5000/home/books/${book}`)
        .then(res => {
            console.log(res.data)
            setShelf(res.data.shelf)
        })
        .catch(err =>{
            setShelf(options[0])
            console.log("New Book to Shelf")
            console.log(err);
        })
    });

    const handleChange = (event) => {
        let action = event.target.value
        const payload = {
            "type": "shelf",
            "shelf": action
        }
    
        if(action == "add to shelf"){
            axios.delete(`http://localhost:5000/books/${book}`, { data: payload })
            .then(res => {
                setShelf(action)
                console.log("deleted from shelf", shelf)
            })
            .catch(err =>{
                console.log(err);
            })
        } else {
            axios.post(`http://localhost:5000/books/${book}`, payload)
            .then(res => {
                setShelf(action)
                console.log("added to shelf", shelf)
            })
            .catch(err =>{
                console.log(err);
            })
        }
    }

    return(
        <form>
            <select onChange={handleChange}>
            {
                options.map((option) =>{
                    if(option === shelf) return <option selected value={option}>{option}</option>
                    return <option value={option}>{option}</option>
                })
            }
            </select>
      </form>
    )
}

export default Shelf;