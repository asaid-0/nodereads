import React, { useState, useEffect, useContext } from 'react'
import axios from '../../components/api/axios';
import styles from './Shelf.module.css';


const Shelf = ({ book }) => {
    console.log("shelf book: ", book);
    const options = ["add to shelf", "want to read", "read", "reading"]
    const [shelf, setShelf] = useState("")
    const [openMenu, setOpenMenu] = React.useState(false);
    const [t, setT] = React.useState(0);
    function handleSelectClick(e) {
        setOpenMenu(true);
    }

    function handleItemClick(index) {
        handleChange(index);
        setT(index * -41);
        setTimeout(() => {
            setOpenMenu(false);
        }, 500);

    }

    function handleFocus() {

        if (openMenu) {
            setOpenMenu(false);
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/home/books/${book}`)
            .then(res => {
                setShelf(res.data.shelf)
                const index = options.findIndex((item) => item == res.data.shelf);
                setT(index * -41);
            })
            .catch(err => {
                setShelf(options[0])
                console.log(err);
            })
    });

    const handleChange = (index) => {
        const options = ["add to shelf", "want to read", "read", "reading"];
        const action = options[index];
        const payload = {
            "type": "shelf",
            "shelf": action
        }

        if (action == "add to shelf") {
            axios.delete(`http://localhost:5000/books/${book}`, { data: payload })
                .then(res => {
                    setShelf(action)
                    console.log("deleted from shelf", shelf)
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            axios.post(`http://localhost:5000/books/${book}`, payload)
                .then(res => {
                    setShelf(action)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <div className={styles.actions}>
            <div tabIndex="0" onBlur={handleFocus} onClick={handleSelectClick} className={`${styles.tilt_up} ${styles.select_menu} ${openMenu ? styles.open : ''}`} style={{ "--t": `${t}px` }}>
                <select data-menu></select>
                <div className={styles.button}>
                    <em></em>
                    <ul>
                        <li>Add to Shelf</li>
                        <li>Want to Read</li>
                        <li>Read</li>
                        <li>Reading</li>
                    </ul>
                </div>
                <ul>
                    <li onClick={() => handleItemClick(0)}>Add to Shelf</li>
                    <li onClick={() => handleItemClick(1)}>Want to Read</li>
                    <li onClick={() => handleItemClick(2)}>Read</li>
                    <li onClick={() => handleItemClick(3)}>Reading</li>
                </ul>
            </div>
        </div>
    )
}

export default Shelf;