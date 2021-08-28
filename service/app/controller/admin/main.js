'use strict';

const Controller = require('egg').Controller

class MainController extends Controller { //提供ctx（上下文）等属性和方法

    async index() {
        //测试
        this.ctx.body = 'hi api'
    }

    async checkLogin() {
        //this.ctx.body='hi api'
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
            "' AND password = '" + password + "'"
        const res = await this.app.mysql.query(sql)
        if (res.length > 0) {
            //登录成功,进行session缓存
            let openId = new Date().getTime()
            this.ctx.session.openId = { 'openId': openId }
            this.ctx.body = { 'data': '登录成功', 'openId': openId }

        } else {
            this.ctx.body = { 'data': '登录失败' }
        }
    }
    //获取后台文章分类信息
    async getTypeInfo() {
        const resType = await this.app.mysql.select('article_type') //请求article_type表中的所有数据
        this.ctx.body = { data: resType }
    }

    //添加文章
    async addArticle() {

        let tmpArticle = this.ctx.request.body
        // tmpArticle.
        const result = await this.app.mysql.insert('article', tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId

        this.ctx.body = {
            isScuccess: insertSuccess,
            insertId: insertId
        }
    }

    //修改文章
    async updateArticle() {
        let tmpArticle = this.ctx.request.body
        //使用mysql update命令
        const result = await this.app.mysql.update('article', tmpArticle);
        const updateSuccess = result.affectedRows === 1;
        console.log(updateSuccess)
        this.ctx.body = {
            isScuccess: updateSuccess
        }
    }
    async getArticleList() {

        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            "article.addtime as addtime," +
            "article.viewcount as viewcount," +
            'article_type.typename as typename ' +
            'FROM article LEFT JOIN article_type ON article.type_id = article_type.id ' +
            'ORDER BY article.id DESC '

        const resList = await this.app.mysql.query(sql)
        this.ctx.body = { list: resList }

    }

    //删除文章
    async delArticle() {
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article', { 'id': id })
        this.ctx.body = { data: res }
    }

    async getArticleById(){
        let id = this.ctx.params.id
    
        let sql = 'SELECT article.id as id,'+
        'article.title as title,'+
        'article.introduce as introduce,'+
        'article.content as content,'+
        "article.addtime as addtime,"+
        'article.viewcount as viewcount ,'+
        'article_type.typename as typename ,'+
        'article_type.id as type_id '+
        'FROM article LEFT JOIN article_type ON article.type_id = article_type.id '+
        'WHERE article.id='+id
        const result = await this.app.mysql.query(sql)
        this.ctx.body={data:result}
    }
}

module.exports = MainController