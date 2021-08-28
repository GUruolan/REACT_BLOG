let ipurl = 'http://127.0.0.1:7001/admin/';
let service_path = {
    checklogin : ipurl + 'checklogin',
    getTypeInfo : ipurl + 'getypeinfo',
    addArticle : ipurl + 'addArticle',  //  添加文章
    updateArticle:ipurl + 'updateArticle',
    getArticleList:ipurl + 'getArticleList' ,  //  文章列表
    delArticle:ipurl + 'delArticle/',
    getArticleById:ipurl + 'getArticleById/' ,  //  根据ID获得文章详情
}

export default service_path;