import React, { useState, useEffect } from 'react';
import axios from '../../components/api/axios';
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
    const [BooksCount, setBooksCount] = useState(0);
    const [foundBooks, setFoundBooks] = useState(true);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [shelf, setShelf] = useState("all");

    const getUserBooks = (shelf, page, limit) => {
        if (shelf === "all") {
            return axios.get(`http://localhost:5000/home/books?limit=${limit}&offset=${page}`);
        }
        else {
            return axios.get(`http://localhost:5000/home/books?filter=${shelf}&limit=${limit}&offset=${page}`);
        }
    }


    useEffect(() => {
        setLoading(true);
        setFoundBooks(true);
        getUserBooks(shelf, page, pageSize).then(res => {
            const { userBooks, BooksCount } = res.data;
            if (userBooks.length) {
                setBooks(userBooks);
                setBooksCount(BooksCount);
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
        setShelf(shelf);
        setPage(1);
    }

    const handlePagination = (page, pageSize) => {
        console.log({ page, pageSize });
        setPage(page);
    }
    const handlePageSizeChange = (current, size) => {
        // console.log({ current, size });
        setPageSize(size);
        setPage(1);
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
                                    current={page}
                                    onChange={handlePagination}
                                    defaultCurrent={1}
                                    total={BooksCount}
                                    pageSize={pageSize}
                                    showSizeChanger
                                    pageSizeOptions={['6', '9', '12']}
                                    onShowSizeChange={handlePageSizeChange}
                                />
                            </Col>
                            // : null
                        }

                    </Row>
                    <Row justify="space-around" style={{ height: "100%" }} >
                        {
                            loading ?
                                <Col>
                                    <Spin className={styles.loader} size="large" />
                                </Col>
                                :
                                books.map((elem) =>

                                    <Col style={{ marginTop: "2rem" }} >
                                        <BookCard key={elem.book._id}
                                            book={elem.book}
                                        />
                                    </Col>
                                )
                        }
                        {
                            foundBooks ? null :
                                <EmptyPlaceholder msg="No Books Found" />
                        }
                    </Row>
                </Content>
            </Layout>
        </>
    )
}

export default WithUserHeaders(Home)
