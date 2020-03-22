import {blogList} from '@/services/blog'

export interface BlogDetail {
  id: string;
  title?: string;
  content?: string;
  comments?: BlogComment[]
}

export interface BlogComment {
  id: string;
  speak: string;
}

export default {
  namespace: 'blog', // 默认与文件名相同
  state: {
    isLogin: false,
  },
  reducers: {
    upsertOneUserReducer(state: any, action: any) {
      // @ts-ignore
      window.userInfo = action.payload;
      return {
        ...state,
        isLogin: true,
        userInfo: action.payload,
      };
    },
    createOnePostReducer(state: any, action: any) {
      return {
        ...state,
        addedPost: action.payload,
      };
    },
    loginReducer(state: any, action: any) {
      return {
        ...state,
        isLogin: action.payload,
      };
    },
    postsReducer(state: any, action: any) {
      return {
        ...state,
        blogList: action.payload,
      };
    },
  },
  effects: {
    * blogsEffect({payload}: any, {put, call}: any) {
      const response = yield call(blogList, payload);
      yield put({type: 'postsReducer', payload: response});
    },
    * upsertOneUserEffect({payload}: any, {put}: any) {
      yield put({type: 'upsertOneUserReducer', payload});
    },
  },
}
