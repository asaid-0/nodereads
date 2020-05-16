import React from 'react';
import styles from './SideNav.module.css';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { BookOutlined } from '@ant-design/icons';
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
                    <Menu.Item key="all" icon={<BookOutlined />}>
                        All
                        </Menu.Item>
                    <Menu.Item key="reading" icon={<BookOutlined />}>
                        Reading
                        </Menu.Item>
                    <Menu.Item key="want to read" icon={<BookOutlined />}>
                        Want to read
                        </Menu.Item>
                    <Menu.Item key="read" icon={<BookOutlined />}>
                        Read
                        </Menu.Item>
                </Menu>
            </Sider>
        </>
    )
}

export default SideNav;
