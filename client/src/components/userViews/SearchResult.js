import React, { useEffect, useState } from 'react'
import axios from '../../components/api/axios';
import { Layout, Spin, Row, Col } from 'antd';
import WithUserHeaders from '../../HOC/WithUserHeaders';
import BookCard from './BookCard';
import AuthorCard from './AuthorCard';
import EmptyPlaceholder from '../ui_components/EmptyPlaceholder';
import styles from './SearchResult.module.css';

const { Content } = Layout;




function SearchResult(props) {
    const { match: { params: { searchInput } } } = props;
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [foundResult, setFoundResult] = useState(false);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        setFoundResult(true);
        setLoading(true);
        axios.get(`/home?searchWord=${searchInput}`)
            .then(res => {
                setBooks(res.data[0]);
                setAuthors(res.data[1]);
                console.log(res.data[0], "/n", res.data[1]);
                setLoading(false);
                if (!(res.data[0].length || res.data[1].length)) {
                    setFoundResult(false);
                    console.log("found");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [searchInput])
    return (
        <>
            <Layout style={{ overflow: "auto" }}>
                <Content>

                    {
                        loading ?
                            <Col>
                                <Spin className={styles.loader} size="large" />
                            </Col> :
                            <>
                                {
                                    books.length ?
                                        <h1 className={styles.title} >Books</h1>
                                        :
                                        null
                                }
                                <Row align="middle" justify="space-around" style={{ marginTop: "1rem" }} >
                                    {
                                        books.map((elem) =>
                                            <Col style={{ marginTop: "2rem" }} >
                                                <BookCard key={elem._id} book={elem} shelf={undefined} />
                                            </Col>
                                        )
                                    }
                                </Row>
                                {
                                    authors.length ?
                                        <h1 className={styles.title} >Authors</h1>
                                        :
                                        null
                                }
                                <Row align="middle" justify="space-around" style={{ marginTop: "1rem", marginBottom: "8rem" }} >
                                    {

                                        authors.map((author) =>
                                            <Col style={{ marginTop: "2rem" }} >
                                                <AuthorCard author={author} />
                                            </Col>
                                        )
                                    }
                                </Row>
                            </>
                    }
                    {
                        foundResult ? null :
                            <EmptyPlaceholder msg="Nothing Found" />
                    }

                </Content>
            </Layout>

        </>
    )
}

export default WithUserHeaders(SearchResult)
