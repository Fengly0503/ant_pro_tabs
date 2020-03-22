import * as React from 'react';
import {message, Button, Form, Input} from 'antd';
import {connect} from 'react-redux';
import router from 'umi/router';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};
const validateMessages = {
  required: '数据不能为空',
};

const AddBlog = () => {
  const onFinish = () => {
    if (!window.userInfo) {
      message.error('请先登陆！');
      router.push('register');
      return;
    }
    message.success('提交成功！');
    // TODO 提交请求
  };

  return (
    <Form {...layout} className="tab-item-container" name="nest-messages" onFinish={onFinish}
          validateMessages={validateMessages}>
      <Form.Item
        name={['post', 'title']}
        label="标题"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        name={['post', 'content']}
        label="内容"
        rules={[
          {
            required: true,
          },
        ]}>
        <Input/>
      </Form.Item>
      <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

function mapStateToProps(state: any) {
  const {tabs} = state;
  return {
    tabs,
  };
}

export default connect(mapStateToProps, null)(AddBlog);
