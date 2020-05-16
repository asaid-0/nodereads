import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Spin, Row, Col, Pagination, Empty } from 'antd';
import 'antd/dist/antd.css';
import WithUserHeaders from '../../HOC/WithUserHeaders';
import styles from './Home.module.css';
import BookCard from './BookCard';
import SideNav from './SideNav';

const { Sider, Header, Content, Footer } = Layout;




function Home() {
    const [books, setBooks] = useState([]);
    const [foundBooks, setFoundBooks] = useState(true);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const getBooks = (shelf, page) => {
        return shelf ?
            axios.get(`http://localhost:5000/home/books?filter=${shelf}&limit=2&offset=${page}`) :
            axios.get(`http://localhost:5000/home/books?limit=2&offset=${page}`);
    }


    useEffect(() => {
        getBooks(0, page).then(res => {
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
    }, [page]);


    const filterShelf = async (shelf) => {
        setLoading(true);
        setPage(1);
        let res = [];
        console.log(shelf);
        if (shelf != "all") {
            res = await getBooks(shelf, page);
            console.log(res);
        } else {
            res = await getBooks(0, page)
        }
        if (res.data.length) {
            setBooks(res.data);
            setLoading(false);
        }
        else {
            setFoundBooks(false);
            setLoading(false);
        }
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
                                        <BookCard key={elem.book._id} item={elem} />
                                    </Col>
                                )
                        }
                        {
                            foundBooks ? null :
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description={
                                        <span> No Books Found </span>
                                    }
                                    imageStyle={{
                                        marginTop: "10rem"
                                    }}
                                />
                        }
                    </Row>
                </Content>
            </Layout>
        </>
    )
}

export default WithUserHeaders(Home)
