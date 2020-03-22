/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
  DefaultFooter,
} from '@ant-design/pro-layout';
import {formatMessage} from 'umi-plugin-react/locale';
import * as React from 'react';
import {Link} from 'umi';
import {Dispatch} from 'redux';
import {connect} from 'dva';
import {Result, Button, Layout, Menu} from 'antd';
import Authorized from '@/utils/Authorized';

import {ConnectState} from '@/models/connect';
import {isAntDesignPro, getAuthorityFromRouter} from '@/utils/utils';


import {
  AppstoreOutlined,
  BuildOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import styles from './BasicLayout.less';
import logo from '../assets/logo.svg';

const {
  Header, Content,
} = Layout;
const {SubMenu} = Menu;
const headerStyle = {background: '#fff', padding: 0};

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
}

// export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
//   breadcrumbNameMap: {
//     [path: string]: MenuDataItem;
//   };
// };
/**
 * use Authorized check all menu item
 */

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map(item => {
    const localItem = {...item, children: item.children ? menuDataRender(item.children) : []};
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

const defaultFooterDom = (
  <DefaultFooter
    copyright="Ant Design Pro Tabs"
    links={[
      {
        key: 'yunplus',
        title: 'ant design pro v4 多标签',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
    ]}
  />
);

const footerRender: BasicLayoutProps['footerRender'] = () => {
  if (!isAntDesignPro()) {
    return defaultFooterDom;
  }

  return (
    <>
      {defaultFooterDom}
      <div
        style={{
          padding: '0px 24px 24px',
          textAlign: 'center',
        }}
      >
        <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
            width="82px"
            alt="netlify logo"
          />
        </a>
      </div>
    </>
  );
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  /**
   * constructor
   */
  // 禁用原框架用户获取
  // useEffect(() => {
  //   if (dispatch) {
  //     dispatch({
  //       type: 'user/fetchCurrent',
  //     });
  //   }
  // }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };
  return (
    <Layout>
      <Header className={styles.header} style={headerStyle}>
        <Menu
          // onClick={this.handleClick}
          // selectedKeys={[this.state.current]}
          mode="horizontal">
          <SubMenu
            title={(
              <span className="submenu-title-wrapper">
                  <AppstoreOutlined/>
                  行政办公
                </span>
            )}
          >
            <Menu.Item key="setting:1">企业信息</Menu.Item>
            <Menu.Item key="setting:2">证照</Menu.Item>
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
          </SubMenu>
          <SubMenu
            title={(
              <span className="submenu-title-wrapper">
                  <SettingOutlined/>
                  供应链
                </span>
            )}
          >
            <Menu.Item key="setting:14">采购管理</Menu.Item>
            <Menu.Item key="setting:15">库存管理</Menu.Item>
          </SubMenu>
          <Menu.Item key="alipay">
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
              <TeamOutlined/>
              客户关系
            </a>
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <ProLayout
          logo={logo}
          formatMessage={formatMessage}
          menuHeaderRender={(logoDom, titleDom) => (
            <Link to="/">
              {logoDom}
              {titleDom}
            </Link>
          )}
          onCollapse={handleMenuCollapse}
          menuItemRender={(menuItemProps, defaultDom) => {
            if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
              return defaultDom;
            }

            return <Link to={menuItemProps.path}>{defaultDom}</Link>;
          }}
          breadcrumbRender={(routers = []) => [
            {
              path: '/',
              breadcrumbName: '首页',
            },
            ...routers,
          ]}
          itemRender={(route, params, routes, paths) => {
            const first = routes.indexOf(route) === 0;
            return first ? (
              <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
            ) : (
              <span>{route.breadcrumbName}</span>
            );
          }}
          footerRender={footerRender}
          menuDataRender={menuDataRender}
          // rightContentRender={() => <RightContent/>}
          {...props}
          {...settings}
        >
          <Authorized authority={authorized!.authority} noMatch={noMatch}>
            {children}
          </Authorized>
        </ProLayout>
      </Content>
    </Layout>
  );
};

export default connect(({global, settings}: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
