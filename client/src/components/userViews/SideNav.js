import React from 'react';
import styles from './SideNav.module.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Row } from 'antd';
import { BookFilled } from '@ant-design/icons';
const { Sider, Header, Content } = Layout;



function SideNav(props) {
    const { filterShelf } = props;
    const handleClick = e => {
        console.log(e.key);
        filterShelf(e.key);
    }
    return (
        <>
            <Sider trigger={null} theme="light" className={styles.side_nav} >
                <div className="logo" />
                <Menu theme="light"
                    mode="inline"
                    defaultSelectedKeys={['All']}
                    onClick={handleClick}
                    className={styles.menu}
                >
                    <Menu.Item key="all" >
                        <Row align="middle">
                            <BookFilled /> All
                        </Row>
                    </Menu.Item>
                    <Menu.Item key="reading">
                        <Row align="middle">
                            <BookFilled /> Reading
                        </Row>
                    </Menu.Item>
                    <Menu.Item key="want to read">
                        <Row align="middle">
                            <BookFilled /> Want to read
                        </Row>
                    </Menu.Item>
                    <Menu.Item key="read">
                        <Row align="middle">
                            <BookFilled /> Read
                        </Row>
                    </Menu.Item>
                </Menu>
            </Sider>
        </>
    )
}

export default SideNav;
