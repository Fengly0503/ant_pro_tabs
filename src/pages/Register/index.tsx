import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Button, message} from 'antd';
import {connect, useDispatch} from "react-redux";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};
const validateMessages = {
  required: '数据不能为空！',
  number: {
    // eslint-disable-next-line no-template-curly-in-string
    range: '年龄范围 ${min} 到 ${max}',
  },
};

const FromRegister = (props: any) => {
  const dispatch = useDispatch();
  const {isLogin, currentKey} = props;

  useEffect(() => {
    if (isLogin) {
      message.info('登陆成功');
      dispatch({
        type: 'tabs/ReduceTabEffect',
        payload: currentKey,
      });
    }
    dispatch({
      type: 'blog/loginReducer',
      payload: false
    });
  }, [isLogin]);
  const onFinish = (values: any) => {
    dispatch({
      type: 'blog/upsertOneUserEffect',
      payload: {
        "where": {
          "email": values.user.email
        }, "create": {
          "mobile": values.user.mobile,
          "email": values.user.email,
          "name": values.user.name,
          "profile": {
            "create": {
              "password": values.user.password
            }
          }
        }, "update": {
          "mobile": values.user.mobile,
          "email": values.user.email,
          "name": values.user.name
        }
      },
    })
  };

  return (
    <div>
      <p>*提交成功自动关闭</p>
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item
          name={['user', 'name']}
          label="姓名"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item name={['user', 'mobile']} label="手机">
          <Input/>
        </Form.Item>
        <Form.Item
          name={['user', 'email']}
          label="邮箱"
          rules={[
            {
              type: 'email',
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name={['user', 'age']}
          label="年龄"
          rules={[
            {
              type: 'number',
              min: 0,
              max: 99,
            },
          ]}
        >
          <InputNumber/>
        </Form.Item>
        <Form.Item name={['user', 'password']} label="密码">
          <Input/>
        </Form.Item>
        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form></div>
  );
};

function mapStateToProps(state: any) {
  return {isLogin: state.blog.isLogin, currentKey: state.tabs.currentKey};
}

export default connect(mapStateToProps)(FromRegister);
