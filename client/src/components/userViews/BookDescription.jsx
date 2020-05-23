import React from 'react'
import AverageRate from './AverageRate';
import { Col, Card, Descriptions } from "antd";
import Rate from './Rate'
import { Link } from 'react-router-dom';
import styles from './Book.module.css';

const { Meta } = Card;

function BookDescription({ book }) {

    return (
        <>
            <Col span={10}>
                <Card
                    hoverable
                    className={styles.card}
                    cover={<img src={book.photo ? `/${book.photo}` : ''} alt="Cover" />}
                >
                    <hr />
                    <Meta title="Rate this book" />
                    <Rate book={book} />
                </Card>,

        </Col >
            <Col className={styles.desc} span={7} offset={4}>
                <h2>{book.name}</h2>
                <Descriptions  >
                    <Descriptions.Item span={7} label="Author">{book.author ?
                        <Link to={`/authors/${book.author._id}`} className={styles.link}>{`${book.author.firstname} ${book.author.lastname}`}</Link> : null}</Descriptions.Item>
                    <Descriptions.Item span={7} label="Category">{book.categories ?
                        book.categories.map(category => {
                            return <Link key={category._id} to={`/categories/${category._id}`} className={styles.link}> {category.name} </Link>
                        })
                        : null}</Descriptions.Item>
                    <Descriptions.Item span={7} label="Average rate">{book.rates ? <AverageRate rates={book.rates} /> : null}</Descriptions.Item>
                    <Descriptions.Item span={7} label="Description">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        Corporis nam ut expedita, autem nemo modi dignissimos labore
                        totam quisquam temporibus hic natus quaerat deleniti reprehenderit
                        quidem fugiat fugit qui quod.
                                </Descriptions.Item>
                </Descriptions>
            </Col>
        </>
    )
}

export default BookDescription
