import React, { useState, useContext } from 'react'
import { UserContext } from '../components/authComponents/authContext'

import styles from './WithAdminHeaders.module.css'
import 'antd/dist/antd.css';
import { Layout, Menu, Avatar,  Divider } from 'antd';
import { Link } from 'react-router-dom';
import {
  BookOutlined,
  UserOutlined,
  AppstoreOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Row } from 'react-bootstrap';
const { Content, Footer, Sider } = Layout;

const WithAdminHeaders = (Comp) => {
  const AdminHeaders = (props) => {

    const [selectedKeys, setSelectedKeys] = useState(['1'])
    const { user } = useContext(UserContext);

    return (
      <Layout className={styles.layout} style={{ minHeight: '100vh' }}>
        <Sider style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}>
          <div className={styles.logo} >
            <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            size={64}
            />
            <br/>
            <strong>{user.email}</strong>
          </div>
          <Menu theme="dark" selectedKeys={selectedKeys} defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<BookOutlined />}>
              <span>Books</span>
              <Link to="/admin/books"></Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <span>Authors</span>
              <Link to="/admin/authors"></Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<AppstoreOutlined />}>
              <span>Categories</span>
              <Link to="/admin/categories"></Link>
            </Menu.Item>
            <Divider />
            <Menu.Item icon={<LogoutOutlined />}>
              <span>Logout</span>
              <Link to=""></Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className={styles.site_layout}>
          {/* <Header className={styles.header_layout_background} style={{ padding: 0 }}>
          </Header> */}
          <Content style={{ margin: '0 16px' }}>
            <div className={styles.site_layout_background} style={{ padding: 24, minHeight: 650 }}>
              <Comp setSelectedKeys={setSelectedKeys} {...props} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>NodeReads ©2020</Footer>
        </Layout>
      </Layout>
    );
  }
  return AdminHeaders
}

export default WithAdminHeaders
