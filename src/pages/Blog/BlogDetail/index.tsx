import React, {useEffect, useState} from 'react';
import {Button} from 'antd';
import BlogAddPop from './AddComment';
import {BlogDetail} from '@/models/blog';
import {getQueryString} from '@/utils/common';
import styles from './index.less';

const BlogDetailCom = () => {
  const [blogDetail, setBlogDetail] = useState<BlogDetail>({
      id: '',
      title: '',
      content: '',
      comments: [],
    }
  );
  const [visible, setVisible] = useState(false);
  const fetch = () => {
    const id = getQueryString('id');
    setBlogDetail({id, title: `${id}的标题`, content: `${id}的内容`});
    // TODO:访问接口api
  };
  useEffect(() => {
    fetch();
  }, []);

  const elements = [];
  if (blogDetail.comments && blogDetail.comments.length > 0) {
    blogDetail.comments.forEach((item, index) => {
      elements.push(
        <li className="comment-item">
          <p>{index + 1}楼：</p>
          <span>作者：{item.id}</span>
          <p>评论内容：{item.speak}</p>
        </li>,
      );
    });
  } else {
    elements.push(
      <p>该博客暂时没有评论哦</p>,
    );
  }
  return (
    <div className="tab-item-container">
      <div className={styles.detailPanel}>
        <p className="detail-title">
          标题：
          {blogDetail.title}
        </p>
        <p className="detail-content">
          内容：
          {blogDetail.content}
        </p>
      </div>
      <div>
        <p>评论列表</p>
        <ul>
          {elements}
        </ul>
      </div>
      <BlogAddPop
        // @ts-ignore
        postid={blogDetail.id}
        visible={visible}
        // onCreate={this.onCreate}
        onCancel={() => {
          fetch();
          setVisible(false);
        }}
      />
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        添加评论
      </Button>
    </div>
  );
};

export default BlogDetailCom;

// helpers
