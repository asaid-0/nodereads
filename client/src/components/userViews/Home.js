import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Home.module.css';
import { Row, Col } from 'react-bootstrap';
import 'antd/dist/antd.css';
import { Layout, Spin } from 'antd';
import WithUserHeaders from '../../HOC/WithUserHeaders';
import BookCard from './BookCard';
import SideNav from './SideNav';
const { Sider, Header, Content } = Layout;



function Home() {
    const [books, setBooks] = useState([]);
    const [foundBooks, setFoundBooks] = useState(true);
    const [loading, setLoading] = useState(true);

    const filterShelf = (shelf) => {
        if (shelf != "all") {
            setLoading(true);
            axios.get(`http://localhost:5000/home/books?filter=${shelf}&limit=2&offset=1`)
                .then(res => {
                    console.log(res.data);
                    setBooks(res.data);
                    setLoading(false);
                })
                .catch(err => console.log(err));
        } else {
            axios.get(`http://localhost:5000/home/books?limit=4&offset=1`)
                .then(res => {
                    console.log(res.data);
                    setBooks(res.data);
                })
                .catch(err => console.log(err));
        }
    }
    useEffect(() => {
        axios.get(`http://localhost:5000/home/books?limit=4&offset=1`)
            .then(res => {
                console.log(res.data);
                if (res.data.length) {
                    setBooks(res.data);
                    setLoading(false);
                }
                else {
                    setFoundBooks(false);
                    setLoading(false);
                }
            })
            .catch(err => console.log(err));
    }, []);




    return (
        <>
            <Layout>
                <SideNav filterShelf={filterShelf} />
                <Content className={styles.content}>

                    <Row>

                        {
                            loading ? <Spin className={styles.loader} size="large" /> :
                                books.map((elem) =>
                                    <Col>
                                        <BookCard key={elem.book._id} item={elem} />
                                    </Col>
                                )}
                    </Row>
                    {
                        foundBooks ? null : "No Books Found"
                    }

                </Content>
            </Layout>




        </>
    )
}

export default WithUserHeaders(Home)
