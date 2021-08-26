import React, { useState , useEffect} from 'react';
import marked from 'marked'
import hljs from "highlight.js";
import axios from 'axios';
import service_path from '../config/apiurl.js'
import '../static/addArticle.css'


import { Row, Col, Input, Select, Button, DatePicker } from 'antd'

const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {
    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState('选择文章类型') //选择的文章类别

    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        },
        gfm: true, // 允许 Git Hub标准的markdown.
        pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
        sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
        tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
        breaks: false, // 允许回车换行（该选项要求 gfm 为true）
        smartLists: true, // 使用比原生markdown更时髦的列表
        smartypants: false, // 使用更为时髦的标点
    });

    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    //从中台得到文章类别信息
    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: service_path.getTypeInfo,
            header: { 'Access-Control-Allow-Origin': '*' },
            withCredentials: true //支持跨域访问cookies
        }).then(
            res => {
                if (res.data.data == "没有登录") { //如果请求返回的数据是=>中间件拦截=>返回没有登录
                    localStorage.removeItem('openId')//删除本地存储
                    props.history.push('/login')  //跳转到首页
                } else {
                    setTypeInfo(res.data.data)
                }

            }
        )
    }
    useEffect(()=>{
        getTypeInfo() 
       },[])

    return (
        <div>
            <Row gutter={10}>
                <Col span={14}>
                    <Input
                        placeholder="博客标题"
                        size="large" />
                </Col>

                <Col span={3}>
                    <Select defaultValue={selectedType} size="large">
                        {
                            typeInfo.map((item,index)=>{
                                return (<Option key = {index} value={item.id}>{item.typename}</Option>)
                            })
                        }
                    </Select>
                </Col>
                <Col span={3}>
                    <div>
                        <DatePicker
                            placeholder="发布日期"
                            size="large"
                        />
                    </div>
                </Col>
                <Col span={4}>
                    <Button size="large">暂存文章</Button>&nbsp;
                <Button type="primary" size="large" >发布文章</Button>
                    <br />
                </Col>
            </Row>
            <br />
            <Row gutter={15} >
                <Col span={10}>
                    <TextArea
                        className="markdown-content"
                        value={introducemd}
                        onChange={changeIntroduce}
                        rows={3}
                        placeholder="编辑简介"
                    />
                </Col>
                <Col span={13}>
                    <div
                        className="show-html"
                        dangerouslySetInnerHTML={{ __html: `<strong>文章简介：</strong> ${introducehtml}` }} >
                    </div>
                </Col>
            </Row>
            <br></br>
            <Row gutter={15} >
                <Col span={10}>
                    <TextArea
                        className="markdown-content"
                        value={articleContent}
                        onChange={changeContent}
                        rows={35}
                        placeholder="文章内容"
                    />
                </Col>
                <Col span={13}>
                    <div
                        className="show-html"
                        dangerouslySetInnerHTML={{ __html: markdownContent }} >
                    </div>
                </Col>
            </Row>

        </div>
    )
}
export default AddArticle