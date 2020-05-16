import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';
import Review from './Review';
import WithUserHeaders from '../../HOC/WithUserHeaders';
import Rate from './Rate'
import { Layout, Row, Col, Card, Descriptions } from "antd";
import AverageRate from './AverageRate';

const { Content } = Layout
const { Meta } = Card;

function Book(props) {

    const [book, setBook] = useState({});
    const [reviewList, setReviewList] = useState([])

    const { match: { params: { bookId } } } = props;

    const updateReviewList = (newReviewList) => {
        setReviewList(newReviewList);
    }

    useEffect(() => {
        axios.get(`/books/${bookId}`)
            .then(res => {
                setBook(res.data);
                setReviewList(res.data.reviews);
            })
            .catch(err => console.log(err))
    }, [bookId])

    return (

        <>
            <Layout style={{backgroundColor: '#d2e0fa'}}>
                <Content>
                    <Row>
                        <Col span={10}>
                            <Card
                                hoverable
                                style={{ margin: 20 }}
                                cover={<img src={book.photo ? `/${book.photo}` : ''} alt="Cover" />}
                            >
                                <hr />
                                <Meta title="Rate this book" />
                                <Rate book={book} />
                            </Card>,

                        </Col>
                        <Col span={7} offset={4}>
                            <Descriptions style={{ marginTop: 100 }} title={book.name}>
                                <Descriptions.Item span={7} label="Author">{book.author ? `${book.author.firstname} ${book.author.lastname}` : ""}</Descriptions.Item>
                                <Descriptions.Item span={7} label="Category">{book.categories ?
                                    book.categories.map(category => category.name)
                                    : ""}</Descriptions.Item>
                                <Descriptions.Item span={7} label="Average rate">{book.rates?<AverageRate rates={book.rates} />:"Not rated"}</Descriptions.Item>
                                <Descriptions.Item span={7} label="Description">
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>

                    <Row justify="center">
                        <Col span={14}>
                            <div>
                                <ReviewForm bookId={bookId} updateReviewList={updateReviewList} />
                            </div>
                        </Col>
                    </Row>
                    <Row justify="center">
                        {
                            reviewList.length ? reviewList.map(review => {
                                return <Review bookId={bookId}
                                    updateReviewList={updateReviewList}
                                    review={review} key={review._id}
                                />
                            })
                                : <h3>No reviews</h3>
                        }
                    </Row>
                </Content>
            </Layout>
        </>
    )
}

export default WithUserHeaders(Book);
