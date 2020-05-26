import React, { useState, useEffect } from 'react'
import WithUserHeaders from '../../HOC/WithUserHeaders'
import { Layout, Spin, Row, Col, Pagination } from 'antd';
import axios from '../../components/api/axios';
import BookCard from './BookCard';
import styles from './Home.module.css';
import EmptyPlaceholder from '../ui_components/EmptyPlaceholder';
const { Content } = Layout;


function Category(props) {
    const { match: { params: { categoryId } } } = props;

    const [books, setBooks] = useState([]);
    const [pagesCount, setPagesCount] = useState(0);
    const [BooksCount, setBooksCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);


    const getBooks = (page) => {
        return axios.get(`/categories/${categoryId}`);
    }


    useEffect(() => {
        setLoading(true);
        getBooks(page).then(res => {
            const { data: books, pages, count } = res.data;
            // console.log({ Books, BooksCount });
            if (books && books.length) {
                setBooks(books);
                setPagesCount(pages);
                setBooksCount(count);
                setLoading(false);
            }
            else {
                setBooks([]);
                setLoading(false);
            }
        })
            .catch(err => console.log(err));
    }, [page, books.length]);


    const handlePagination = (page) => {
        setPage(page);
    }



    return (
        <>
            <Layout>
                <Content className={styles.content}>
                    <Row align="middle" justify="center" style={{ marginTop: "2rem" }} >
                        {
                            <Col>
                                <Pagination
                                    current={page}
                                    onChange={handlePagination}
                                    defaultCurrent={1}
                                    total={BooksCount}
                                />
                            </Col>
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
                                            shelf={undefined}
                                            handleShelfChange={undefined} />
                                    </Col>
                                )
                        }
                        {
                            books.length || loading ? null :
                                <EmptyPlaceholder />
                        }
                    </Row>
                </Content>
            </Layout>
        </>
    )
}

export default WithUserHeaders(Category)