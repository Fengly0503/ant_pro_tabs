import React, {Component} from 'react';
import {Tabs} from 'antd';
import {connect} from 'dva';
import router from 'umi/router';
// import Loadable from 'react-loadable';
import {getTabsComponent} from '@/utils/tabsConfig'

const {TabPane} = Tabs;
// @ts-ignore
type TargetKey = string | MouseEvent<HTMLElement, MouseEvent>


class SwitchTabs extends Component<any, any> {
  constructor(props: any) {
    super(props);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.props.history.listen((location: any, action: any) => {
      const localUrl = window.location;
      if (location.pathname === '/') {
        location.pathname = "/blog-list";
      }
      const {title} = getTabsComponent(location.pathname)
      const tabKey = location.pathname + localUrl.search;
      this.props.dispatch({
        type: 'tabs/ChangeTabsEffect',
        payload: {tabKey, title, params: location.query},
      })
    });
  }

  onChange = (activeKey: string) => {
    // const newKey = activeKey.replace('|', '?')
    router.push(activeKey);
  };

  remove = (targetKey: TargetKey) => {
    this.props.dispatch({
      type: 'tabs/ReduceTabEffect',
      payload: targetKey,
    });
  };

  render() {
    const {tabs} = this.props;
    return (
      <div>
        <Tabs
          hideAdd
          onEdit={this.remove}
          onChange={this.onChange}
          activeKey={tabs.currentKey}
          type={tabs.closeType}
          // type="editable-card"
        >
          {tabs.tabList.map((panel: any) => (
            <TabPane tab={panel.title} key={panel.tabKey}>
              {
                getTabsComponent(panel.tabKey).component
              }
            </TabPane>
          ))}
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {tabs: state.tabs};
}

export default connect(mapStateToProps)(SwitchTabs);
