# vue-demo
> Vue 2.0+ 与 Vue Cli 4 （`@vue/cli 4.5.3`）项目模板

## 使用方法
检查是否安装 node、npm、vue，如若没有返回对应版本号，请去 node 官网安装，再次检查。然后安装Vue Cli。

```
node -v
npm -v
npm install -g @vue/cli
vue -V
```

## 目录结构
```
my_project_name/	
|- BuildScript           // 流水线部署文件目录
|- docs                  // 项目的细化文档目录（可选）
|- nginx                 // 部署在容器上前端项目 nginx 代理文件目录
|- node_modules          // 下载的依赖包
|- public                // 静态页面
    |- index.html            // 项目入口
|- src:
    |- api
    |- assets                // 静态资源目录，这里的资源会被wabpack构建
         |- icon             // 公共svg图标存放目录
         |- img              // 图片存放目录
         |- scss             // 公共样式文件目录
    |- components            // 组件
    |- plugins               // 插件
    |- router                // 路由
         |- routes           // 详细的路由拆分目录（可选）
         |- index.js
    |- store                 // 全局状态管理
    |- utils                 // 工具
    |- views                 // 页面
    |- App.vue               // 根组件
    |- main.js               // 入口文件
|- .browserslistrc
|- .eslintignore        // eslint 忽略规则
|- .eslintrc.js         // eslint 规则
|- .gitignore           // git 忽略规则
|- babel.config.js      // babel 规则
|- Dockerfile           // Docker 部署文件
|- package-lock.json
|- package.json         // 依赖 
|- README.md            // 项目 README
|- vue.config.js	    // webpack 配置
```