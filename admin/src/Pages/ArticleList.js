import React, { useState, useEffect } from 'react';
import { List, Row, Col, Modal, message, Button, Switch } from 'antd';
import axios from 'axios'
import service_path from '../config/apiurl'
import '../static/ArticleList.css'
const { confirm } = Modal;
function ArticleList(props) {
    const [list, setList] = useState([])
    const getList = () => {
        axios({
            method: 'get',
            url: service_path.getArticleList,
            withCredentials: true,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
                setList(res.data.list)
            }
        )
    }

    useEffect(() => {
        getList()
    }, [])

    //删除文章的方法
    const delArticle = (id) => {
        confirm({
            title: '确定要删除这篇博客文章吗?',
            content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
            onOk() {
                axios(service_path.delArticle + id, { withCredentials: true }).then(
                    res => {
                        message.success('文章删除成功')
                        getList()
                    }
                )
            },
            onCancel() {
                message.success('没有任何改变')
            },
        });

    }
    //修改文章
    const updateArticle = (id)=>{

        props.history.push('/index/add/'+id)

    }

    return (
        <div>
            <List
                header={
                    <Row justify="center">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={3}>
                            <b>类别</b>
                        </Col>
                        <Col span={3}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={5}>
                            <b>简介</b>
                        </Col>
                        <Col span={2}>
                            <b>浏览量</b>
                        </Col>

                        <Col span={3}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <Row gutter={10} justify="center">
                        <Col span={8}>
                            {item.title}
                        </Col>
                        <Col span={3}>
                            {item.typename}
                        </Col>
                        <Col span={3}>
                            {item.addtime.slice(0, 10)}
                        </Col>
                        <Col span={5}>
                            {item.introduce.slice(0, 40)}
                        </Col>
                        <Col span={2}>
                            {item.viewcount}
                        </Col>


                        <Col span={3}>
                            <Button type="primary" onClick={() => { updateArticle(item.id) }}>修改</Button>&nbsp;
                              <Button onClick={() => { delArticle(item.id) }} >删除 </Button>

                        </Col>
                    </Row>


                )}
            />
        </div>
    )

}

export default ArticleList