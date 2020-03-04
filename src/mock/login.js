import { param2Obj } from 'utils';

const userMap = {
  admin: {
    role: 'admin',
    token: 'admin',
    introduction: '我是管理员admin',
    avatar: './static/pictures/pic-profile.png',
    name: '管理员 admin',
    uid: '001'
  },
  cetc_user: {
    role: 'cetc_user',
    token: 'cetc_user',
    introduction: '中国电科用户',
    avatar: './static/pictures/pic-profile.png',
    name: '中国电科用户 cetc_user',
    uid: '002'

  },
  developer: {
    role: 'developer',
    token: 'developer',
    introduction: '我是开发',
    avatar: './static/pictures/pic-profile.png',
    name: '工程师小唐',
    uid: '003'
  }
}

export default {
login: config => {
    const { username } = JSON.parse(config.body);
    var message=userMap[username] ? userMap[username]:'用户名不存在，请重新输入';
    return  message;
  },
  getInfo: config => {
    const { token } = param2Obj(config.url);
    if (userMap[token]) {
      return userMap[token];
    } else {
       res.send(201, {accessToken: token});
      return Promise.reject('a');
    }
  },
   restPassword: config => {
   const password = JSON.parse(config.body);
   console.log(password)
    return  'success';
   },
  logout: () => 'success'
};
