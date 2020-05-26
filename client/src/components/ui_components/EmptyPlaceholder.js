import React from 'react';
import { Empty } from 'antd';
import 'antd/dist/antd.css';



function EmptyPlaceholder({ msg }) {
    return (
        <>
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                    <span>{msg}</span>
                }
                imageStyle={{
                    marginTop: "10rem"
                }}
            />
        </>
    )
}

export default EmptyPlaceholder
