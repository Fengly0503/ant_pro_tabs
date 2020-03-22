import Loadable from "react-loadable";
import React from "react";

const Loading = () => (<span>Loading...</span>);
const Welcome = Loadable({loader: () => import('../pages/index'), loading: Loading, delay: 150});
const BlogList = Loadable({loader: () => import('../pages/Blog/BlogList'), loading: Loading, delay: 150});
const Register = Loadable({loader: () => import('../pages/Register'), loading: Loading, delay: 150});
const BlogAdd = Loadable({loader: () => import('../pages/Blog/AddBlog'), loading: Loading, delay: 150});
const BlogDetail = Loadable({loader: () => import('../pages/Blog/BlogDetail'), loading: Loading, delay: 150});
const NotFound = Loadable({loader: () => import('../pages/404'), loading: Loading, delay: 150});

export interface TabModel {
  title: string,
  tabKey?: string,
  component: any,
}

export const getTabsComponent = (key: string) => {
  let newKey = key
  if (key.includes('?')) {
    // eslint-disable-next-line prefer-destructuring
    newKey = key.split('?')[0];
  }
  const tab: TabModel = {
    title: '没有找到',
    component: <NotFound/>,
  }
  switch (newKey) {
    case '/welcome':
      tab.title = '首页'
      tab.component = <Welcome/>
      break;
    case '/blog-list':
      tab.title = '博客列表'
      tab.component = <BlogList/>
      break;
    case '/add-blog':
      tab.title = '添加博客'
      tab.component = <BlogAdd/>
      break;
    case '/register':
      tab.title = '用户注册'
      tab.component = <Register/>
      break;
    case '/blog-detail':
      tab.title = '博客详情'
      tab.component = <BlogDetail/>
      break;
    case '/not-found':
      tab.title = '404'
      tab.component = <NotFound/>
      break;
    default :
      break;
  }
  return tab;
}
