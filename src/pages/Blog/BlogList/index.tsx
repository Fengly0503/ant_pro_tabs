import React, {useEffect} from "react";

import {Table} from "antd";
import router from 'umi/router';
import {connect, useDispatch} from "react-redux";

const columns = [
  {
    title: '博客标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '博客内容',
    dataIndex: 'content',
    key: 'content',
  },
];

const BlogList = (props: any) => {
  const {blogList} = props
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'blog/blogsEffect',
      payload: {}   // 查询条件
    });
  }, []);

  return (
    <div className="tab-item-container">
      <Table
        columns={columns}
        rowKey="id"
        dataSource={blogList}
        onRow={(item: any) => ({
          onClick: () => {
            router.push({pathname: `/blog-detail`, query: {id: item.id}})
          },
        })}
      />
    </div>
  );
}

function mapStateToProps(state: any) {
  return {blogList: state.blog.blogList};
}

export default connect(mapStateToProps)(BlogList);
