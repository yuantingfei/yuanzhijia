/**
 * @author luo
 * created on 2018/12/12
 * @topic router config
 */

export default {
  // 免登录白名单
  avoidLoginList: ['/login', '/authredirect', '/reset', '/sendpwd',"/401"],
  // 不取消请求白名单
  noCancelList: ['/login']
}