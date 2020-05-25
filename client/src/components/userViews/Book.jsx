import React, { useEffect, useState } from 'react';
import axios from '../../components/api/axios';
import ReviewForm from './ReviewForm';
import Review from './Review';
import WithUserHeaders from '../../HOC/WithUserHeaders';
import { Layout, Row, Col } from "antd";
import styles from './Book.module.css';
import BookDescription from './BookDescription';

const { Content } = Layout

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
        <Layout className={styles.layout} key={bookId}>
            <Content >
                <Row>
                    <BookDescription book={book} />
                </Row>

                <Row justify="center">
                    <Col span={14}>
                        <div>
                            <ReviewForm bookId={bookId} updateReviewList={updateReviewList} />
                        </div>
                    </Col>
                </Row>
                {
                    reviewList.length ? reviewList.map(review => {
                        return (
                            <Row justify="center" key={review._id}>
                                <Review bookId={bookId}
                                    updateReviewList={updateReviewList}
                                    review={review} 
                                />
                            </Row>
                        )
                    })
                        : <h3>No reviews</h3>
                }
            </Content>
        </Layout>
    )
}

export default WithUserHeaders(Book);
