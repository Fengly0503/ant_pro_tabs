import React, {useState} from 'react';
import {
  Modal, Form, Input, message,
} from 'antd';
import commonFetch from '../../../../utils/commonFetch';

const {TextArea} = Input;

interface CollectionCreateFormProps {
  visible: boolean;
  // onCreate: (values: Values) => void;
  onCancel: () => void;
  postid: number;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({visible, postid, onCancel}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="添加评论"
      okText="提交"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form.validateFields()
          .then(values => {
            if (!window.userInfo) {
              message.error('请先登陆！');
              return;
            }
            const args = {
              "data": {
                "speak": values.speak,
                "post": {"connect": {"id": postid}},
                "speaker": {"connect": {"id": window.userInfo.id}}
              }
            };
            commonFetch.fetchtData('createOneComment', args).then((res: any) => {
              if (res) {
                message.info(`发表成功：${res.createOneComment.speak}`);
                onCancel();
              } else {
                message.error('添加失败');
              }
            });
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{modifier: 'public'}}
      >
        <Form.Item
          name="speak"
          rules={[{required: true, message: '请先填写您的评论'}]}
        >
          <TextArea rows={2} placeholder="填写您的评论！"/>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CollectionCreateForm;
