import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import marked from 'marked'
import hljs from "highlight.js";
import axios from 'axios';
import service_path from '../config/apiurl.js'
import '../static/addArticle.css'




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

    //从中台得到文章类别信息(加中间件拦截)
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
    const selectTypeHandler = (value) => { //选择类别信息
        setSelectType(value)
    }
    /**
     * function: 保存文章
     * @returns 
     */
    const saveArticle = () => {

        if (selectedType == "选择文章类型") {
            message.error('必须选择文章类别')
            return false
        } else if (!articleTitle) {
            message.error('文章名称不能为空')
            return false
        } else if (!articleContent) {
            message.error('文章内容不能为空')
            return false
        } else if (!introducemd) {
            message.error('简介不能为空')
            return false
        } else if (!showDate) {
            message.error('发布日期不能为空')
            return false
        }

        let dataProps = {}   //传递到接口的参数
        dataProps.type_id = selectedType
        dataProps.title = articleTitle
        dataProps.content = articleContent
        dataProps.introduce = introducemd
        let datetext = showDate.replace('-', '/') //把字符串转换成时间戳
        dataProps.addtime = new Date(datetext) // 1000

        //首次点击=>添加文章或 再次点击=>修改文章
        if (articleId == 0) {
            console.log('articleId=:' + articleId)
            dataProps.viewcount = Math.ceil(Math.random() * 100) + 1000
            axios({
                method: 'post',
                url: service_path.addArticle,
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    setArticleId(res.data.insertId) //成功上传数据后，间insertId设置未articleID
                    if (res.data.isScuccess) {
                        message.success('文章保存成功')
                        console.log(res.data)
                    } else {
                        message.error('文章保存失败');
                    }

                }
            )
        } else {

            dataProps.id = articleId
            axios({
                method: 'post',
                url: service_path.updateArticle,
                header: { 'Access-Control-Allow-Origin': '*' },
                data: dataProps,
                withCredentials: true
            }).then(
                res => {

                    if (res.data.isScuccess) {
                        message.success('文章保存成功')
                    } else {
                        message.error('保存失败');
                    }


                }
            )
        }


    }
    const getArticleById = (id) => {
        axios(service_path.getArticleById + id, {
            withCredentials: true,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
                let articleInfo= res.data.data[0]
                console.log(articleInfo)
                setArticleTitle(res.data.data[0].title)
                setArticleContent(res.data.data[0].content)
                let html = marked(res.data.data[0].content)
                setMarkdownContent(html)
                setIntroducemd(res.data.data[0].introduce)
                let tmpInt = marked(res.data.data[0].introduce)
                setIntroducehtml(tmpInt)
                setShowDate(res.data.data[0].addtime)
                setSelectType(res.data.data[0].typeId)

            }
        )
    }

    useEffect(() => {
        //在初始加载页面时，获取一次类别信息
        getTypeInfo()
        let tmpId = props.match.params.id
        if (tmpId) {
            setArticleId(tmpId)
            getArticleById(tmpId)
        }
    }, [])

    return (
        <div>
            <Row gutter={20}>
                <Col span={12}>
                    <Input
                        placeholder="博客标题"
                        onChange={e => {
                            setArticleTitle(e.target.value)
                        }}
                        size="large" />
                </Col>

                <Col span={3}>
                    <Select defaultValue={selectedType} onChange={selectTypeHandler} >
                        {
                            typeInfo.map((item, index) => {
                                return (<Option key={index} value={item.id}>{item.typename}</Option>)
                            })
                        }
                    </Select>
                </Col>
                <Col span={3}>
                    <div>
                        <DatePicker
                            placeholder="发布日期"
                            onChange={(date, dateString) => setShowDate(dateString)}

                        />
                    </div>
                </Col>
                <Col span={6}>
                    <Button size="large">暂存文章</Button>&nbsp;
                    <Button type="primary" size="large" onClick={saveArticle} >发布文章</Button>
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