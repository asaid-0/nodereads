import React from 'react'
import Card from 'react-bootstrap/Card'

function Review(props) {
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>
                            Review
                    </Card.Title>
                    <Card.Text>
                        { props.reviewData.content }
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Review
