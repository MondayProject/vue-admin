const routers = {
  common: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/register'),
      meta: {
        title: '注册'
      }
    }
  ],
  home: [
    {
      path: '/home/home',
      name: 'home',
      component: () => import('@/pages/home/home'),
      meta: {
        title: '概览'
      }
    }
  ],
  systemManage: [{
    path: '/systemManage/userManage',
    name: 'userManage',
    component: () => import('@/pages/systemManage/userManage'),
    meta: {
      title: '用户管理'
    }
  }]
}
function getRouters(params) {
  let router = []
  for (const i in routers) {
    for (let j = 0; j < routers[i].length; j++) {
      const element = routers[i][j];
      router.push(element)
    }
  }
  return router
}
export let menuGroup = {
  home: {
    name: "首页",
    icon: "home"
  },
  systemManage: {
    name: "系统管理",
    icon: "gear-a"
  }
};


let router = getRouters()
export let routerArray = function () {
  delete (routers.common)
  return routers
}
export default router