import React, { useState, useEffect, useContext     }from 'react'
import { UserContext } from '../authComponents/authContext';
import axios from '../../components/api/axios';

const Shelf = ({book}) => {
    
    const { user } = useContext(UserContext);
    const options = ["add to shelf", "want to read", "read", "reading", "drop"]
    console.log(user)
    const bookShelf = user.books ? user.books.find(exist).shelf || "add to shelf" : "add to shelf";
    const [shelf, setShelf] = useState(bookShelf)

    function exist(selectedBook){
        return selectedBook.book == book;
    }

    const handleChange = (event) => {
        //send request here and if success change shelf else return error
        let action = event.target.value
        const payload = {
            "type": "shelf",
            "shelf": action
        }
        console.log(action)
        if(action == "drop"){
            console.log("do someting")
            axios.delete(`/books/${book}`, { data: payload })
            .then(res => {
                setShelf(action)
                console.log(res)
                console.log("deleted from shelf", shelf)
            })
            .catch(err =>{
                console.log(err);
            })
            console.log("do someting2")
        } else {
            
            axios.post(`/books/${book}`, payload)
            .then(res => {
                setShelf(action)
                console.log(res)
                console.log("added to shelf", shelf)
            })
            .catch(err =>{
                console.log(err);
            })
        }
        
    }
    
    console.log(book)

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