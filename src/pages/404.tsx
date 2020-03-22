import {Button, Result} from 'antd';
import React from 'react';
// import {router} from 'umi';
import {connect, useDispatch} from "react-redux";

const NoFoundPage: React.FC<{}> = (props: any) => {
  const {currentKey} = props;
  const dispatch = useDispatch();
  const goToHome = () => {
    dispatch({
      type: 'tabs/ReduceTabEffect',
      payload: currentKey,
    });
  };
  return (
    <Result
      status={404}
      title="404"
      subTitle="抱歉，您访问的页面不存在，请检查后重试."
      extra={
        <Button type="primary" onClick={goToHome}>
          知道了
        </Button>
      }
    />
  )
};

function mapStateToProps(state: any) {
  return {currentKey: state.tabs.currentKey};
}

export default connect(mapStateToProps)(NoFoundPage);
