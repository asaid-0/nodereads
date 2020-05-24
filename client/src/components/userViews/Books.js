import React, { useEffect, useState } from 'react'
import axios from '../../components/api/axios';
import WithUserHeaders from '../../HOC/WithUserHeaders'
import { Layout, Spin, Row, Col, Pagination } from 'antd';
import 'antd/dist/antd.css';
import styles from './Home.module.css';
import BookCard from './BookCard';
import EmptyPlaceholder from '../ui_components/EmptyPlaceholder';
const { Sider, Header, Content, Footer } = Layout;



function Books(props) {

    const [books, setBooks] = useState([]);
    const [foundBooks, setFoundBooks] = useState(true);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        // console.log(props.name);
        setLoading(true);
        setFoundBooks(true);
        axios.get('http://localhost:5000/books').then(res => {
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

    const handlePagination = (page, pageSize) => {
        console.log({ page, pageSize });
        setPage(page);
    }


    return (
        <>
            <Layout>
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
                            foundBooks ? null :
                                <EmptyPlaceholder />
                        }
                    </Row>
                </Content>
            </Layout>
        </>
    )
}

export default WithUserHeaders(Books)
