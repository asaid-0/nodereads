import AdminHeaders from './../components/adminViews/AdminHeaders'
import React, { useState } from 'react'
import styles from './WithAdminHeaders.module.css'
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  BookOutlined,
  UserOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;

const WithAdminHeaders = (Comp) => {
  const AdminHeaders = (props) => {

    const [collapsed, setCollapsed] = useState(false)
    const [selectedKeys, setSelectedKeys] = useState(['1'])

    const onCollapse = (collapsed) => {
      setCollapsed(collapsed);
    };

    return (
      <Layout className={styles.layout} style={{ minHeight: '100vh' }}>
        <Sider style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }} collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className={styles.logo} />
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
          </Menu>
        </Sider>
        <Layout className={collapsed? styles.site_layout_collapsed:styles.site_layout}>
          {/* <Header className={styles.site_layout_background} style={{ padding: 0 }} /> */}
          <Content style={{ margin: '0 16px' }}>
            <div className={styles.site_layout_background} style={{ padding: 24, minHeight: 360 }}>
              <Comp setSelectedKeys={setSelectedKeys} {...props} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
  return AdminHeaders
}

export default WithAdminHeaders
