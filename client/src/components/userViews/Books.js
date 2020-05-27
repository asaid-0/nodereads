import React, { useEffect, useState } from 'react'
import axios from '../../components/api/axios';
import WithUserHeaders from '../../HOC/WithUserHeaders'
import { Layout, Spin, Row, Col, Pagination } from 'antd';
import 'antd/dist/antd.css';
import styles from './Home.module.css';
import BookCard from './BookCard';
import EmptyPlaceholder from '../ui_components/EmptyPlaceholder';
const { Content } = Layout;



function Books(props) {

    const [books, setBooks] = useState([]);
    const [foundBooks, setFoundBooks] = useState(true);
    const [BooksCount, setBooksCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);


    const getBooks = (page, limit) => {
        // console.log({ limit, page });
        return axios.get(`http://localhost:5000/books?limit=${limit}&offset=${page}`);
    }


    useEffect(() => {
        // console.log({ page, pageSize });
        setLoading(true);
        setFoundBooks(true);
        getBooks(page, pageSize).then(res => {
            const { Books, BooksCount } = res.data;
            // console.log({ Books, BooksCount });
            if (Books.length) {
                setBooks(Books);
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
    }, [page, pageSize]);

    const handlePagination = (page, pageSize) => {
        // console.log({ page, pageSize });
        setPage(page);
    }
    const handlePageSizeChange = (current, size) => {
        // console.log({ current, size });
        setPageSize(size);
        setPage(1);
    }



    return (
        <>
            <Layout style={{ paddingBottom: "5rem" }} >
                <Content className={styles.content} >
                    <Row align="middle" justify="center" style={{ marginTop: "2rem" }} >
                        {
                            // foundBooks ?
                            <Col>
                                <Pagination
                                    current={page}
                                    onChange={handlePagination}
                                    defaultCurrent={1}
                                    total={BooksCount}
                                    showSizeChanger
                                    pageSize={pageSize}
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
                                        <BookCard key={elem._id}
                                            book={elem}
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

export default WithUserHeaders(Books)
