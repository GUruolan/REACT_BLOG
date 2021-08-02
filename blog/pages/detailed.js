import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'

import { Row, Col, Breadcrumb,Affix } from 'antd'
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons'
import MarkNav from 'markdown-navbar';

import Header from '../components/Header'
import Author from '../components/Author'
import Card from '../components/Card'

import homesty from '../styles/pages/Home.module.css'
import detailedsty from '../styles/pages/detailed.module.css'

import service_path from '../config/apiurl.js'
//import 'markdown-navbar/dist/navbar.css';


//import navabrsty from '../styles/components/navbar.module.css';
const Detailed = (props) => {
  let content = props.content;

  return (
    <div className={homesty.container}>
      <Head>
        <title>Detailed</title>
      </Head>
      <Header />
      <Row className={homesty.commain} type="flex" justify="center">
        <Col className={homesty.commleft} xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div className={detailedsty.bread_div}>
            <Breadcrumb>
              <Breadcrumb.Item><a href="/"> 首页</a> </Breadcrumb.Item>
              <Breadcrumb.Item><a href="/mylist"> 所有笔记</a> </Breadcrumb.Item>
              <Breadcrumb.Item> {props.title} </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <div className={detailedsty.detailed_title}> {props.title} </div>
            <div className={detailedsty.list_icon}>
              <span><CalendarOutlined />{props.addtime}</span>
              <span><FolderOutlined />{props.typename}</span>
              <span><FireOutlined />{props.viewcount}</span>
            </div>
          </div>
          <div className={detailedsty.detailed_content}>
            <ReactMarkdown children={content} />
          </div>
        </Col>

        <Col className={homesty.commright} xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <div className="commbox">
            <Affix offsetTop = {20}>
              <div className={detailedsty.nav_title}> 文章目录</div>
            <MarkNav
                className = {detailedsty.article_menu}
                source={content}
                ordered={false}
              />
            </Affix>
          </div>
          <Card />

        </Col>
      </Row>

    </div>
  )
}

Detailed.getInitialProps = async(context)=>{
  console.log(context.query.id);
  let id = context.query.id;
  const promise = new Promise((resolve)=>{
    axios(service_path.urlarticlebyid + id).then(
      (res)=>{
        console.log(res);
        resolve(res.data.data[0]);
      } )
     
  })
  return await promise;
}


export default Detailed