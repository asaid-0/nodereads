import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Spin, Row, Col, Pagination } from 'antd';
import 'antd/dist/antd.css';
import WithUserHeaders from '../../HOC/WithUserHeaders';
import styles from './Home.module.css';
import BookCard from './BookCard';
import SideNav from './SideNav';
import EmptyPlaceholder from '../ui_components/EmptyPlaceholder';

const { Sider, Header, Content, Footer } = Layout;




function Home(props) {
    const [books, setBooks] = useState([]);
    const [foundBooks, setFoundBooks] = useState(true);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [shelf, setShelf] = useState("all");

    const getBooks = (shelf, page) => {
        if (shelf === "all") {
            return axios.get(`http://localhost:5000/home/books?limit=2&offset=${page}`);
        }
        else {
            return axios.get(`http://localhost:5000/home/books?filter=${shelf}&limit=2&offset=${page}`);
        }
    }


    useEffect(() => {
        // console.log(props.name);
        setLoading(true);
        setFoundBooks(true);
        getBooks(shelf, page).then(res => {
            if (res.data.length) {
                setBooks(res.data);
                setLoading(false);
                setFoundBooks(true);
            }
            else {
                setBooks([]);
                setFoundBooks(false);
                setLoading(false);
            }
        })
            .catch(err => console.log(err));
    }, [page, shelf]);


    const filterShelf = (shelf) => {
        // setLoading(true);
        // setFoundBooks(true);
        // let res = [];
        // console.log(shelf);
        // if (shelf === "all") {
        //     res = await getBooks(0, page)
        //     console.log(foundBooks);
        // } else {
        //     res = await getBooks(shelf, page);
        // }
        // if (res.data.length) {
        //     setBooks(res.data);
        //     setLoading(false);
        //     setPage(1);
        //     setShelf(shelf);
        // }
        // else {
        //     setFoundBooks(false);
        //     setLoading(false);
        //     setPage(1);
        //     setShelf(shelf);
        // }
        setShelf(shelf);
        setPage(1);
    }

    const handlePagination = (page, pageSize) => {
        console.log({ page, pageSize });
        setPage(page);
    }





    return (
        <>
            <Layout>
                <SideNav filterShelf={filterShelf} />
                <Content className={styles.content}>
                    <Row align="middle" justify="center" style={{ marginTop: "2rem" }} >
                        {
                            // foundBooks ?
                            <Col>
                                <Pagination
                                    onChange={handlePagination}
                                    defaultCurrent={1} total={30} pageSize={2}
                                />
                            </Col>
                            // : null
                        }

                    </Row>
                    <Row justify="space-around" style={{ height: "100vh" }}>
                        {
                            loading ?
                                <Col>
                                    <Spin className={styles.loader} size="large" />
                                </Col>
                                :
                                books.map((elem) =>

                                    <Col style={{ marginTop: "2rem" }} >
                                        <BookCard key={elem.book._id} book={elem.book} shelf={elem.shelf} />
                                    </Col>
                                )
                        }
                        {
                            foundBooks ? null :
                                <EmptyPlaceholder />
                        }
                    </Row>
                </Content>
            </Layout>
        </>
    )
}

export default WithUserHeaders(Home)
