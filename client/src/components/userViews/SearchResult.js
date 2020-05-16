import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Layout, Spin, Row, Col } from 'antd';
import WithUserHeaders from '../../HOC/WithUserHeaders';
import BookCard from './BookCard';
import EmptyPlaceholder from '../ui_components/EmptyPlaceholder';

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
            <Content style={{ height: "100vh" }}>

                {
                    loading ?
                        <Col>
                            <Spin size="large" />
                        </Col> :
                        <>
                            {
                                books.length ?
                                    <h1>Books</h1>
                                    :
                                    null
                            }
                            <Row align="middle" justify="space-around" style={{ marginTop: "2rem" }} >
                                {
                                    books.map((elem) =>
                                        <Col style={{ marginTop: "2rem" }} >
                                            <BookCard key={elem._id} book={elem} shelf={undefined} />
                                        </Col>
                                    )
                                }
                            </Row>
                        </>
                }
                {
                    foundResult ? null :
                        <EmptyPlaceholder />
                }

            </Content>
        </>
    )
}

export default WithUserHeaders(SearchResult)
