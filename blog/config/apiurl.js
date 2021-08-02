let ipurl = 'http://127.0.0.1:7001/default/';
let service_path = {
    urlarticlelist : ipurl + 'getarticlelist/', //首页接口
    urlarticlebyid : ipurl + 'getarticlebyid/', //详细页面接口
    urltypeinfo : ipurl + 'getypeinfo/' //获得类型接口
}

export default service_path;