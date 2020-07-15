
/* login */
import Login from '../views/login/';

/* error page */
const Err404 = () =>
  import('../views/error/404');
const AllBack = () =>
  import('../views/error/supplierAllBack');
export const constantRouterMap = [
//   {
//   path: '/login',
//   component: Login,
//   hidden: true
// },
{
  path: '',
  redirect: '/configManagement/jijin',
},
{
  path: '/configManagement',
  component: () => import('../views/configManagement/index/layout'),
  children: [
    {
      path: 'jijin',
      name: 'jijin',
      component: () => import ('../views/configManagement/jijin/index'),
      meta: {
        name: '基金动态',
        selected_id:"M-4"
      },
    },
    {
      path: 'jijinhistory',
      name: 'jijinhistory',
      component: () => import ('../views/configManagement/jijinhistory/index'),
      meta: {
        name: '基金业绩',
        selected_id:"M-6"
      },
    },
    {
      path: 'zixuan',
      name: 'zixuan',
      component: () => import ('../views/configManagement/zixuan/index'),
      meta: {
        name: '自选管理',
        selected_id:"M-5"
      },
    },
  ]
},
{
  path: '/404',
  component: Err404,
  hidden: true
},
{
  path: '/__back__',
  component: AllBack,
  hidden: true
}
];

export const asyncRouterMap = [
{
  path: '*',
  component: Err404,
  hidden: true
}
];