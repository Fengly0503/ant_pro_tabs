import React, {Component} from 'react';
import {Link} from 'umi';
import {connect} from 'dva';

// import { connect } from 'react-redux';
// import { ChangeTabs, ReduceTab } from '@redux/actions/switchTabs.act';

import {
  // AndroidOutlined,
  // AppleOutlined,
  AppstoreOutlined,
  // BellOutlined,
  BuildOutlined,
  // DashboardFilled,
  // SearchOutlined,
  // MailOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  LoginOutlined,
  SettingOutlined,
  FileAddOutlined,
  TeamOutlined,
  MenuFoldOutlined as LegacyIcon,
} from '@ant-design/icons';

import {
  Layout, Menu, Tabs,
} from 'antd';
import {getTabsComponent} from "@/utils/tabsConfig";
import router from "umi/router";
import styles from "./BasicLayout.less";

const {
  Header, Sider, Content, Footer,
} = Layout;
const {SubMenu} = Menu;
const headerStyle = {background: '#fff', padding: 0};
const {TabPane} = Tabs;

type ActionType = "add" | "remove"
// @ts-ignore
type TargetKey = string | MouseEvent<HTMLElement, MouseEvent>

interface HomePageState {
  collapsed: boolean;
  current: string;
}

class HomePage extends Component<any, HomePageState> {
  constructor(props: any) {
    super(props);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.props.history.listen((location: any, action: any) => {
      const localUrl = window.location;
      if (location.pathname === '/') {
        location.pathname = "/welcome";
      }
      const {title} = getTabsComponent(location.pathname)
      const tabKey = location.pathname + localUrl.search;
      this.props.dispatch({
        type: 'tabs/ChangeTabsEffect',
        payload: {tabKey, title, params: location.query},
      })
    });
  }

  state = {
    collapsed: false,
    current: 'mail',
  };

  onChange = (activeKey: string) => {
    router.push(activeKey);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove = (targetKey: TargetKey, action: ActionType) => {
    this.props.dispatch({
      type: 'tabs/ReduceTabEffect',
      payload: targetKey,
    });
  };

  toggle = () => {
    const {collapsed} = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  };

  handleClick = (e: { key: any; }) => {
    // eslint-disable-next-line no-console
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    const {tabs} = this.props;
    const {
      collapsed,
    } = this.state;
    const {tabList, currentKey, closeType} = tabs;
    return (
      <Layout className={styles.antLayout}>
        <Header className={styles.header} style={headerStyle}>
          <LegacyIcon
            className={styles.trigger}
            // type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
          <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
            <SubMenu
              title={(
                <span className="submenu-title-wrapper">
                  <AppstoreOutlined/>
                  行政办公
                </span>
              )}
            >
              <Menu.Item key="setting:1">
                <Link to="/not-found">
                  企业信息
                </Link>
              </Menu.Item>
              <Menu.Item key="setting:2">
                <Link to="/not-found">
                  证照
                </Link>
              </Menu.Item>
              <Menu.Item key="setting:3">办公用品</Menu.Item>
              <Menu.ItemGroup title="车辆管理">
                <Menu.Item key="setting:5">车辆年检</Menu.Item>
                <Menu.Item key="setting:6">保养记录</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="固定资产">
                <Menu.Item key="setting:8">资产采购</Menu.Item>
                <Menu.Item key="setting:9">资产盘点</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <SubMenu
              title={(
                <span className="submenu-title-wrapper">
                  <BuildOutlined/>
                  人力资源
                </span>
              )}
            >
              <Menu.Item key="setting:10">招聘</Menu.Item>
              <Menu.Item key="setting:11">考勤</Menu.Item>
              <Menu.Item key="setting:12">出差</Menu.Item>
              <Menu.Item key="setting:13">社保</Menu.Item>
              <Menu.Item key="setting:14">
                <Link to="/not-found">
                  404页面
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              title={(
                <span className="submenu-title-wrapper">
                  <SettingOutlined/>
                  供应链
                </span>
              )}
            >
              <Menu.Item key="setting:15">采购管理</Menu.Item>
              <Menu.Item key="setting:16">库存管理</Menu.Item>
            </SubMenu>
            <Menu.Item key="alipay">
              <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                <TeamOutlined/>
                客户关系
              </a>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            <div className={styles.logo}>
              <img className={styles.MenuLogo} src="/pc/logo.jpeg" alt=""/>
              {collapsed ? '' : '博客系统'}
            </div>
            <Menu
              className="sider-menu"
              theme="dark"
              mode="inline"
              defaultOpenKeys={['sub1']}
            >
              <Menu.Item key="4">
                <Link to="/welcome">
                  <HomeOutlined/>
                  <span>首页</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="1">
                <Link to="/blog-list">
                  <UnorderedListOutlined/>
                  <span>博客列表</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/add-blog">
                  <FileAddOutlined/>
                  <span>新增博客</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/register">
                  <LoginOutlined/>
                  <span>用户注册</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content className={styles.mainContent}>
            <Tabs className={styles.tabPanel}
                  hideAdd
                  onEdit={this.remove}
                  onChange={this.onChange}
                  activeKey={currentKey}
                  type={closeType}
            >
              {tabList.map((panel: any) => (
                <TabPane tab={panel.title} key={panel.tabKey}>
                  {
                    getTabsComponent(panel.tabKey).component
                  }
                </TabPane>
              ))}
            </Tabs>
          </Content>
        </Layout>
        <Footer className={styles.layoutFooter}>
          <div className="help">
            <span>帮助</span>
            <span>隐私</span>
            <span>条款</span>
          </div>
          <div>
            @Copyright © 2020 Ant Design inc.
          </div>
        </Footer>
      </Layout>
    );
  }
}

function mapStateToProps(state: any) {
  return {tabs: state.tabs};
}

export default connect(mapStateToProps)(HomePage);
