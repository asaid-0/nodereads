import AdminHeaders from './../components/adminViews/AdminHeaders'
import React ,{useState} from 'react'
import styles from './WithAdminHeaders.module.css'
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;



const WithAdminHeaders = (Comp) => {
  const AdminHeaders=  (props)=>{
    
        const [collapsed, setCollapsed] = useState(false)
    
        const toggle = () => {
            setCollapsed(!collapsed)
          };
    
        return (
            <Layout style={{height:'100vh'}}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className={styles.logo} />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                    <span>Books</span>
                  <Link to="/admin/books"></Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    <span>Authors</span>
                <Link to="/admin/authors"></Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                  nav 3
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout className={styles.site_layout}>
              <Header className={styles.site_layout_background} style={{ padding: 0 }}>
                {collapsed?<MenuUnfoldOutlined className={styles.trigger} onClick={toggle}/>
                :<MenuFoldOutlined className={styles.trigger} onClick={toggle}/>}
                
              </Header>
              <Content
                className={styles.site_layout_background}
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                }}
              >
                <Comp {...props}/>
              </Content>
            </Layout>
          </Layout>
        )

}
    return AdminHeaders
}

export default WithAdminHeaders
