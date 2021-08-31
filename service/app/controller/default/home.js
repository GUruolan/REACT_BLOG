'use strict';

const Controller = require('egg').Controller

class HomeController extends Controller {
    async index() {
        //获取测试表的数据
         const { ctx } = this;
        let result = await this.app.mysql.get('test', {})
        console.log(result)
        this.ctx.body = result 
      // ctx.body = 'hi, egg';
    }
    async getArticleList(){
        let sql = 'SELECT article.id as id,' + 
                    'article.title as title,' +
                    'article.introduce as introduce,'+ 
                    "DATE_FORMAT(article.addtime,'%Y-%m-%d %H:%i:%s') as addtime," +
                    'article.viewcount as viewcount,' +
                    '.article_type.typename as typename ' +
                    'FROM article LEFT JOIN article_type ON article.type_id = article_type.id ';
        const results = await this.app.mysql.query(sql);
        this.ctx.body = {data:results};
    }
    
    async getArticleById(){ //通过ID获取文章内容
        let id = this.ctx.params.id;

        let sql = 'SELECT article.id as id,' + 
        'article.title as title,' +
        'article.content as content,' + 
        "DATE_FORMAT(article.addtime,'%Y-%m-%d %H:%i:%s') as addtime," +
        'article.viewcount as viewcount,' +
        '.article_type.typename as typename ' +
        'FROM article LEFT JOIN article_type ON article.type_id = article_type.id '
         + "WHERE article.id = " + id; 

        const result = await this.app.mysql.query(sql);
        this.ctx.body = {data:result};
    }

    async getTypeInfo(){
        const result = await this.app.mysql.select('type');
        this.ctx.body = {data:result}
    }
    
    
}

module.exports = HomeController
