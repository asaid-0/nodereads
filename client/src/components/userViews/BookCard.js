import React from 'react';
import styles from './BookCard.module.css';
import { Link } from 'react-router-dom';
import { Rate, Menu, Dropdown, Button, Row } from 'antd';
import { DownOutlined } from '@ant-design/icons';


const BookCard = (props) => {

    const { book, shelf } = props;
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
        console.log('click', e.key);
    }


    // console.log(book);


    return (

        <div className={styles.card_container} >
            <span className={styles.pro}>
                <Rate disabled defaultValue={2} />
            </span>
            <img className={styles.round} src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
            <h3> <Link className={styles.title} > Ricky Park </Link> </h3>
            <span>by</span>
            <h6> <Link className={styles.author}>New York</Link> </h6>
            <div>
                {
                    shelf ?
                        <>
                            <Dropdown overlay={menu} trigger={['click']}    >
                                <Button className={styles.primary}>
                                    read
                            </Button>
                            </Dropdown>
                            <Button> Remove  </Button>
                        </>
                        :
                        <Button> Add to shelf </Button>
                }

            </div>
        </div>

    )
}
export default BookCard;
