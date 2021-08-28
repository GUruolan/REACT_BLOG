import React, { useState } from 'react';
import { Route } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
import '../static/adminIndex.css'
import ArticleList from './ArticleList.js'
import AddArticle from './AddArticle.js'


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function AdminIndex(props) {

    /* const [collapsed, setCollapsed] = useState(false) */
    const [typeInfo, setTypeInfo] = useState([])

    /*     const onCollapse = collapsed => {
            setCollapsed(collapsed)
        }; */

    const handleClickArticle = e => {
        console.log(e.item.props)
        if (e.key == 'addArticle') {
            props.history.push('/index/add/')
        } else {
            props.history.push('/index/list/')
        }

    }
    return (

        <Layout style={{ minHeight: '100vh', margin: '0 16px' }}>

            <Sider /* collapsible collapsed={collapsed} onCollapse={onCollapse} collapsedWidth='20px' */>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <span>工作台</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <span>添加文章</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        onClick={handleClickArticle}
                        title={
                            <span>
                                <span>文章管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="addArticle">添加文章</Menu.Item>
                        <Menu.Item key="articleList">文章列表</Menu.Item>

                    </SubMenu>

                    <Menu.Item key="9">
                        <span>留言管理</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                {/*  <Header style={{ background: '#fff', padding: 0, margin: '0 16px' }} /> */}
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <Route exact path="/index" component={ArticleList} />
                        <Route exact path="/index/list/" component={ArticleList} />

                        <Route exact path="/index/add/" component={AddArticle} />
                        <Route path="/index/add/:id" component={AddArticle} />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>REACT_BLOG Admin</Footer>
            </Layout>


        </Layout>
    )

}

export default AdminIndex