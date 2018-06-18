const routers = {
  common: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/login'),
      meta: {
        title: '登入'
      }
    },
    { path: '*', redirect: '/home/home' }
  ],
  home: [
    {
      path: '/home/home',
      name: 'home',
      component: () => import('@/pages/home/home'),
      meta: {
        title: '首頁'
      }
    }
  ],
  articleManage: [{
    path: '/articleManage/articleList',
    name: 'articleList',
    component: () => import('@/pages/articleManage/articleList'),
    meta: {
      title: '衛教文章列表'
    }
  }, {
    path: '/articleManage/editArticle',
    name: 'editArticle',
    component: () => import('@/pages/articleManage/editArticle'),
    meta: {
      title: '新增衛教文章'
    }
  }, {
    path: '/articleManage/articleDesc',
    name: 'articleDesc',
    show: 'false',
    component: () => import('@/pages/articleManage/articleDesc'),
    meta: {
      title: '文章內容'
    }
  }],
  menuManage: [{
    path: '/menuManage/menuList',
    name: 'menuList',
    component: () => import('@/pages/menuManage/menuList'),
    meta: {
      title: '病患列表'
    }
  }, {
    path: '/menuManage/addMenu',
    name: 'addMenu',
    component: () => import('@/pages/menuManage/addMenu'),
    meta: {
      title: '新增病患'
    }
  }, {
    path: '/menuManage/menuList/menuDesc',
    name: 'menuDesc',
    component: () => import('@/pages/menuManage/menuDesc'),
    show: 'false',
    meta: {
      title: '病患資訊'
    }
  }],
  userManage: [{
    path: '/userManage/userList',
    name: 'userList',
    component: () => import('@/pages/userManage/userList'),
    meta: {
      title: '個管師列表'
    }
  }, {
    path: '/userManage/addUser',
    name: 'addUser',
    component: () => import('@/pages/userManage/addUser'),
    meta: {
      title: '新增個管師'
    }
  }, {
    path: '/userManage/userList/userDesc',
    name: 'userDesc',
    component: () => import('@/pages/userManage/userDesc'),
    show: 'false',
    meta: {
      title: '個管師資料'
    }
  }]
}



function getRouters() {
  let router = []
  for (const i in routers) {
    for (let j = 0; j < routers[i].length; j++) {
      const element = routers[i][j];
      router.push(element)
    }
  }
  return router
}
export let routerArray = function () {
  delete (routers.common)
  return routers
}
export default getRouters()
