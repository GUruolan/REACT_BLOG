module.exports = app =>{
    const {router,controller} = app;
    var adminauth = app.middleware.adminauth(); //中间件
    router.get('/admin/index',adminauth,controller.admin.main.index);
    router.post('/admin/checklogin',controller.admin.main.checkLogin);
    router.get('/admin/getypeinfo', controller.admin.main.getTypeInfo); //在addartical中调用，中间件拦截未登录的用户
    router.post('/admin/addArticle',controller.admin.main.addArticle)
    router.post('/admin/updateArticle', controller.admin.main.updateArticle)
}