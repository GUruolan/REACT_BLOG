import { Avatar, Divider} from 'antd' //头像，分割线
import { QqOutlined, WeiboOutlined, GithubOutlined } from '@ant-design/icons';

import homesty from '../styles/pages/Home.module.css'
import authorsty from "../styles/components/author.module.css"
const Author = () => {
    return (
        <div className = "commbox">
            <div className = {authorsty.author_div}>
                <Avatar size = {100} src = "/img01.jpg"/>
                <div className = "short-introduction">锄禾日当午，汗滴禾下土。谁知盘中餐，粒粒皆辛苦。</div>
                <Divider> 社交账号 </Divider>
                <Avatar size = {28} icon = {<QqOutlined />} className = {authorsty.account}/>
                <Avatar size = {28} icon = {<WeiboOutlined />} className = {authorsty.account}/>
                <Avatar size = {28} icon = {<GithubOutlined />} className = {authorsty.account}/>
            </div>

        </div>
    )
}

export default Author;