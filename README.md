# Vue-admin

这是一个不简单的全栈后台管理系统。

### 想法

做一个全栈项目，可以发表文章，管理评论、用户、标签、文章、添加图片等类似于wordpress的项目，主要是学习mongoose操作mongodb数据库，学习一对多，多对多关系设计。

由于工作量很大，将后期陆续完成。

主要功能有：

1. 首页 (一些文章新增，用户动态)
2. 文章管理（文章列表+新增文章）
3. 菜单管理（分配菜单）
4. 角色管理（暂时只有两种用户：管理员+一般用户）
5. 页面管理（后期新增一些模板，可以新增菜单链接相应页面）
6. 文章标签管理
7. 文章分类管理
8. 用户管理

### 技术栈

- [ ] vue2
- [ ] vuex
- [ ] axios
- [ ] vue-router
- [ ] express
- [ ] mongoose
- [ ] iview
- [ ] vue-echarts

### 下载&安装

``` bash
git clone https://github.com/shawn2016/vue-admin.git
cd vue-admin
npm i
```

### 运行

```
npm start
```

### 后台服务

先启动**mongodb**服务：https://www.cnblogs.com/wzlblog/p/6364045.html)

```
npm run server
```

### 目录说明

```js
.

├── LICENSE
├── README.md
├── app.js
├── beizhu.md
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── logo.png
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── db.js
│   ├── dev.env.js
│   ├── index.js
│   ├── prod.env.js
│   └── test.env.js
├── index.html
├── package-lock.json
├── package.json
├── router
│   ├── article
│   │   └── index.js
│   ├── index.js
│   └── user
│       └── index.js
├── server
│   ├── DBhelper
│   │   └── dbHelper.js
│   ├── DBsql
│   │   ├── articleDao.js
│   │   ├── categoryDao.js
│   │   ├── category_articleDao.js
│   │   ├── homeDao.js
│   │   ├── menuDao.js
│   │   └── userDao.js
│   ├── controller
│   │   ├── articleManagementController.js
│   │   ├── categoryManagementController.js
│   │   ├── category_articleController.js
│   │   ├── homeManagementController.js
│   │   ├── menuManagementController.js
│   │   ├── pageManagementController.js
│   │   └── userManagementController.js
│   ├── models
│   │   ├── article.js
│   │   ├── category.js
│   │   ├── category_article.js
│   │   ├── home.js
│   │   ├── menu.js
│   │   ├── page.js
│   │   ├── role.js
│   │   └── user.js
│   └── utils
│       └── filterData.js
├── src
│   ├── App.vue
│   ├── assets
│   │   └── styles
│   ├── components
│   │   ├── breadcrumb.vue
│   │   ├── bus.js
│   │   ├── editor.vue
│   │   ├── layout.vue
│   │   └── navcontent.vue
│   ├── config
│   │   ├── env.js
│   │   └── mUtils.js
│   ├── favicon.ico
│   ├── filters
│   │   ├── commonFilter.js
│   │   ├── date.js
│   │   └── index.js
│   ├── langs
│   │   └── zh_CN.js
│   ├── libs
│   │   ├── baseUrl.js
│   │   ├── fetch.js
│   │   ├── tree
│   │   └── util.js
│   ├── main.js
│   ├── pages
│   │   ├── articleManage
│   │   ├── home
│   │   ├── login
│   │   ├── menuManage
│   │   └── userManage
│   ├── router
│   │   ├── index.js
│   │   └── menuGroup.js
│   ├── service
│   │   ├── getData.js
│   │   └── randomWord.js
│   ├── skins
│   │   └── lightgray
│   └── store
│       ├── action.js
│       ├── index.js
│       ├── mutation-types.js
│       └── mutations.js
├── static
└── test
    └── unit
        ├── jest.conf.js
        ├── setup.js
        └── specs

```

### tree 目录生成命令

```
tree -L 3 -I "node_modules"

brew install tree  ||  apt-get install tree

- tree -d 只显示文件夹；
- tree -L n 显示项目的层级。n表示层级数。比如想要显示项目三层结构，可以用tree -l 3；
- tree -I pattern 用于过滤不想要显示的文件或者文件夹。比如你想要过滤项目中的node_modules文件夹，可以使用tree -I "node_modules"；
- tree > tree.md 将项目结构输出到tree.md这个文件。

```

### License

Licensed under the MIT License.
