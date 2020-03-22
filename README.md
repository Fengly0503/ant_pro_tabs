### 基于 Ant Design Pro 4 实现多标签页面，包括：路由联动，列表，多详情页共存，自动新增、关闭标签等功能，上图：

![demo-1](https://github.com/Fengly0503/ant_pro_tabs/blob/master/public/demo-images/demo-1.jpg)
![demo-1](https://github.com/Fengly0503/ant_pro_tabs/blob/master/public/demo-images/demo-2.jpg)
![demo-1](https://github.com/Fengly0503/ant_pro_tabs/blob/master/public/demo-images/demo-3.jpg)

#### 关键修改

BasicLayout.tsx 使用layout重写了原文件，使用时不依赖config中的路由配置，可酌情使用；
BasicLayoutBak.tsx 原布局基础上实现多标签，依赖config中路由配置；

#### 使用方式

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

### Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

#### Start project

```bash
npm start
```

#### Build project

```bash
npm run build
```

#### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

#### Test code

```bash
npm test
```

### More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).
