/**
 * 导航栏组件
 */

import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Row, Col, Menu, Dropdown } from 'antd'
import { HomeOutlined, CrownOutlined, DesktopOutlined, DownOutlined } from '@ant-design/icons'
import headersty from '../styles/components/header.module.css'
import service_path from '../config/apiurl.js'

const Header = function () {
    const handClick = (e)=>{
        if(e.key === "home"){
            Router.push("/");
        }else if(e.key === "note"){
            Router.push("/mylist");
        }else if(e.key === "pic"){
            Router.push("/picture");
        }
    }

 return (
        <div className={headersty.header}>
            <Row type='flex' justify='center'>
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className={headersty.headerlogo}> 好好学习，天天向上</span>
                    <span className={headersty.headertxt}> 赚钱植发 </span>
                </Col>
                <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" className={headersty.antmeu} onClick = {handClick}>
                        <Menu.Item key="home" className={headersty.antmenuitem}>
                            <HomeOutlined className={headersty.headericon} />
                                首页
                        </Menu.Item>
                        <Menu.Item key="note" className={headersty.antmenuitem}>
                             <DesktopOutlined className={headersty.headericon} /> 
                                所有笔记
                        </Menu.Item>
                        <Menu.Item key="pic" className={headersty.antmenuitem}>
                            <CrownOutlined className={headersty.headericon} />
                            涂鸦
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header;