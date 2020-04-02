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
      // 静态网站无法运行mock数据,使用字面量变量
      // const response = yield call(blogList, payload);
      const response=[
        {
          "id": "ck7lwzx800010g51u6cx583v3",
          "title": "来一条吧",
          "content": "阿斯顿发大水，试试的"
        },
        {
          "id": "ck7lxru2z0013g51uuqvvkemq",
          "title": "再来哦",
          "content": "啦啦啦,试试数据怎么样"
        },
        {
          "id": "ck7lznaup0036g51umm27fbft",
          "title": "如何写react",
          "content": "多写写"
        },
        {
          "id": "ck7mpnyrt0059g51u4upd75ik",
          "title": "",
          "content": "默认，上一小节的找到的文件，会做一次校验，校验通过后，才会被添加到最终到 dva model 列表"
        },
        {
          "id": "ck7ms9omf0067g51utcoon7k2",
          "title": "Ant Design 实战教程（beta 版）",
          "content": "基于 umi 的 Ant Design 实战教程。（注意该课程由程序自动同步，请勿直接修改！）"
        },
        {
          "id": "ck7mthyua0069g51uq3lurik2",
          "title": "test",
          "content": "test"
        },
        {
          "id": "ck7n4tl120128g51u2ykhe3u8",
          "title": "标题",
          "content": "内容"
        },
        {
          "id": "ck7n6q71i0168g51uo8bp3ogu",
          "title": "222",
          "content": "222"
        },
        {
          "id": "ck7o6e8cg0009k51uarkayukp",
          "title": "ttttest",
          "content": "tttttest"
        },
        {
          "id": "ck7obs4ec0027s51uhxtbbuoh",
          "title": "测试添加功能",
          "content": "测试添加功能"
        },
        {
          "id": "ck7ockgon0046s51u1vbgowsb",
          "title": "umi-history：Manage session history with JavaScript",
          "content": "history is a JavaScript library that lets you easily manage session history anywhere JavaScript runs."
        },
        {
          "id": "ck7ockrn60047s51uxsu3u7se",
          "title": "umi-history：Manage session history with JavaScript",
          "content": "history is a JavaScript library that lets you easily manage session history anywhere JavaScript runs."
        },
        {
          "id": "ck7pja2yz0018n61uuolvo5te",
          "title": "今天下雨了",
          "content": "下雨天。。。。。。。"
        },
        {
          "id": "ck7pjd0do0023n61ut1pz9ldb",
          "title": "测试添加功能",
          "content": "2333333"
        },
        {
          "id": "ck7pk8vl30033n61ujsxfu7rm",
          "title": "测试博文4",
          "content": "测试博文内容4"
        },
        {
          "id": "ck7pkpq5q0047n61u1px8cv7w",
          "title": "dsadas",
          "content": "dasdas"
        },
        {
          "id": "ck7pktve50050n61u6o9zp408",
          "title": "111",
          "content": "2222"
        },
        {
          "id": "ck7plfiqi0057n61umak4zzaw",
          "title": "博文标题",
          "content": "博文内容"
        },
        {
          "id": "ck7pmaf740064n61uyi58niis",
          "title": "测试添加功能",
          "content": "疫情快结束了"
        },
        {
          "id": "ck7pmqj8a0071n61uo1zuaehx",
          "title": "测试",
          "content": "测试"
        },
        {
          "id": "ck7pmqk880072n61ucet5ecz5",
          "title": "测试",
          "content": "测试"
        },
        {
          "id": "ck7pwp5j10001cx1uojx2jppc",
          "title": "疫情即将过去",
          "content": "疫情快结束了"
        },
        {
          "id": "ck7pwrexy0002cx1ux333ui2o",
          "title": "疫情即将过去123",
          "content": "疫情快结束了123"
        },
        {
          "id": "ck7t1dusi0001hs1u0ugkwmhh",
          "title": "试试的",
          "content": "走一个看看效果"
        },
        {
          "id": "ck7u75jzw0000x01us7ioeamq",
          "title": "拉了了",
          "content": "鞋垫洞"
        },
        {
          "id": "ck7voehf80000181u85fozler",
          "title": "111",
          "content": "2la来咯"
        },
        {
          "id": "ck7x166lb0000gd32xhvi1kz0",
          "title": "硕大的",
          "content": "阿斯顿发斯蒂芬"
        }
      ];
      yield put({type: 'postsReducer', payload: response});
    },
    * upsertOneUserEffect({payload}: any, {put}: any) {
      yield put({type: 'upsertOneUserReducer', payload});
    },
  },
}
