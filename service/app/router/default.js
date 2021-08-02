/**
 * @param {Egg.Application} app - egg application
 */
 module.exports = app => {
    const { router, controller } = app;
    router.get('/default/index', controller.default.home.index);
    router.get('/default/getarticlelist', controller.default.home.getArticleList);
    router.get('/default/getarticlebyid/:id', controller.default.home.getArticleById);
    router.get('/default/getypeinfo', controller.default.home.getTypeInfo);
  };
  