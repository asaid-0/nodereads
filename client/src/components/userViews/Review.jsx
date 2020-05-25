import React, { useState, useContext } from 'react'
import ReviewForm from './ReviewForm'
import axios from '../../components/api/axios';
import styles from './Review.module.css';
import { UserContext } from '../authComponents/authContext';
import { Comment, Avatar, Button, Col, Modal } from "antd";
import {
    EditFilled,
    DeleteFilled,
    ExclamationCircleOutlined,
} from '@ant-design/icons';

const { confirm } = Modal;

function Review(props) {

    const { user } = useContext(UserContext);
    const [review, setReview] = useState({ ...props.review, isInEditMode: false })

    const changeMode = () => {
        setReview({ ...review, isInEditMode: !review.isInEditMode });
    }

    const updateReview = (newReview) => {
        setReview({ ...newReview, isInEditMode: !review.isInEditMode });
    }

    const deletReview = (reviewID) => {
        const payload = {
            "type": "review",
            "reviewID": reviewID
        }
        confirm({
            title: 'Are you sure you want to delete the Review?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                return axios.delete(`/books/${props.bookId}`, { data: payload })
                    .then(res => {
                        props.updateReviewList(res.data);
                    })
                    .catch(err => console.log(err))
            },
            onCancel() { },
        });
    }

    return (
        review.isInEditMode ?
            <Col span={14}>
                <ReviewForm
                    updateReview={updateReview}
                    bookId={props.bookId} review={review}
                    changeMode={changeMode}
                />
            </Col>
            :
            <Comment
                key={review._id}
                className={styles.comment}
                author={<a>{`${review.user.firstname} ${review.user.lastname}`}</a>}
                avatar={
                    <Avatar
                        src={`/${review.user.photo}`}
                        alt="Gumball"
                    />

                }
                content={
                    <>
                        {review.content}
                        <br />
                        {review.user._id === user._id ?
                            <>
                                <Button className={styles.button} type="primary" onClick={changeMode} variant="info">
                                    <EditFilled className={styles.icon} />
                                </Button>

                                <Button type="primary" danger onClick={() => deletReview(review._id)}>
                                    <DeleteFilled className={styles.button} className={styles.icon} />
                                </Button>
                            </>
                            : null}

                    </>
                }
            />
    )
}

export default Review
