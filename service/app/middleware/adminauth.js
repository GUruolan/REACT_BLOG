module.exports = options =>{
    /**
     * ctx：上下文
     */
    return async function adminauth(ctx,next){
        if(ctx.session.openId){
            await next() //如果验证session成功，就会用await netx() 向下执行。也就是说可以正常向下走流程，
        }else{
            ctx.body={data:'没有登录'} //如果验证失败，就直接返回“没有登录。
        }
    }
}