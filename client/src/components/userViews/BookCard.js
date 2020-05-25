import React from 'react';
import styles from './BookCard.module.css';
import { Link } from 'react-router-dom';
import { Rate, Menu, Dropdown, Button, Row } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import AverageRate from './AverageRate';


const BookCard = (props) => {

    const { book, shelf, handleShelfChange } = props;
    const menu = (
        <Menu onClick={handleMenuClick} >
            <Menu.Item key="reading">
                Reading
            </Menu.Item>
            <Menu.Item key="want to read">
                Want to read
            </Menu.Item>
            <Menu.Item key="read">
                read
            </Menu.Item>

        </Menu>
    );
    function handleMenuClick(e) {
        console.log('you clicked', e.key);
        if (e.key !== shelf) {
            // sending shelf if only it is changed
            // this is called lift state up through event handler and props function
            handleShelfChange(e.key);
        }
    }



    // console.log(book);


    return (

        <div className={styles.card_container} >
            <span className={styles.pro}>
                <AverageRate rates={book.rates} />
            </span>
            <img className={styles.round} src={book.photo ? `/${book.photo}` : "/images/open_book.png"} alt="user" />
            <h3> <Link className={styles.title} to={`/books/${book._id}`} > {book.name} </Link> </h3>
            <span>by</span>
            <h6> <Link className={styles.author}>{book.author.firstname}</Link> </h6>
            <div>
                {
                    shelf ?
                        <>
                            <Dropdown overlay={menu} trigger={['click']} >
                                <Button className={styles.primary}>
                                    read
                            </Button>
                            </Dropdown>
                            <Button> Remove  </Button>
                        </>
                        :
                        null
                }
            </div>
        </div>

    )
}
export default BookCard;
