#### 基于 Ant Design Pro 4 实现多标签页面，包括：路由联动，列表，多详情页共存，自动新增、关闭标签等功能，上图：

![demo-1](https://github.com/Fengly0503/ant_pro_tabs/blob/master/public/demo-images/demo-1.jpg)
![demo-1](https://github.com/Fengly0503/ant_pro_tabs/blob/master/public/demo-images/demo-2.jpg)
![demo-1](https://github.com/Fengly0503/ant_pro_tabs/blob/master/public/demo-images/demo-3.jpg)

#### 关键修改

* BasicLayout.tsx 使用layout重写了原文件，使用时不依赖config中的路由配置，可酌情使用；
* BasicLayoutBak.tsx 原布局基础上实现多标签，依赖config中路由配置；

#### 原理

* 传统单页面路由切换时替换`<content></content>`内组件，在原来的基础上嵌套一层tabs,类似`<tab><content></content></tab>`；
* tab内的标签状态储存到redux全局store中，在layout组件中拦截路由变化，变更store内tab数据；
* 要实现类型打开多个详情页面，则在tab key中加入主键参数，实现一个详情组件同时开多个详情页功能；

#### 使用

```bash
git clone https://github.com/Fengly0503/ant_pro_tabs.git
```
Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

#### 启动

```bash
npm start
```

#### 打包

```bash
npm run build
```

#### 参考文档

And Design Pro： [官网](https://pro.ant.design). git 地址：[github](https://github.com/ant-design/ant-design-pro).
