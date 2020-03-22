import {Effect} from 'dva';
import {Reducer} from 'redux';
import {ConnectState} from "@/models/connect";
import router from "umi/router";

export enum CloseType {
  line = "line",
  card = "card",
  EditableCard = "editable-card",
}

export interface TabModel {
  title: string,
  tabKey: string,
  params: any,
}

export interface TabModelState {
  currentKey: string;
  tabList: TabModel[];
  closeType: CloseType;
}

export interface TabModelType {
  namespace: 'tabs';
  state: TabModelState;
  effects: {
    ChangeTabsEffect: Effect;
    ReduceTabEffect: Effect;
  };
  reducers: {
    SWitchToTableReducer: Reducer<TabModelState>;
    AddOneTabReducer: Reducer<TabModelState>;
    ReduceTabReducer: Reducer<TabModelState>;
    ChangeCloseTypeReducer: Reducer<TabModelState>;
  };
}

// @ts-ignore
// @ts-ignore
// @ts-ignore
const UserModel: TabModelType = {
  namespace: 'tabs',
  state: {
    currentKey: '',
    tabList: [],
    closeType: CloseType.card,
  },
  // state:{},
  reducers: {
    // @ts-ignore
    SWitchToTableReducer(state: TabModelState, action) {
      return {
        ...state,
        currentKey: action.payload,
      };
    },
    // @ts-ignore
    AddOneTabReducer(state: TabModelState, action) {
      return {
        ...state,
        tabList: action.payload,
      };
    },
    // @ts-ignore
    ReduceTabReducer(state: TabModelState, action) {
      return {
        ...state,
        tabList: action.payload.newTabs,
      };
    },
    // @ts-ignore
    ChangeCloseTypeReducer(state: TabModelState, action) {
      return {
        ...state,
        closeType: action.payload,
      };
    },
  },
  effects: {
    * ChangeTabsEffect({payload}: any, {put, select}) {
      const tabList: TabModel[] = yield select((state: ConnectState) => state.tabs.tabList
      );
      let findKey = false;
      tabList.forEach((pane: any) => {
        if (pane.tabKey === payload.tabKey) {
          findKey = true;
        }
      });
      if (!findKey) {
        yield put({
          type: 'AddOneTabReducer',
          payload: [
            ...tabList,
            {...payload},
          ],
        });
        yield put({
          type: 'SWitchToTableReducer',
          payload: payload.tabKey,
        });

        if (tabList.length >= 1) {
          yield put({
            type: 'ChangeCloseTypeReducer',
            payload: CloseType.EditableCard,
          });
        }
      } else {
        yield put({
          type: 'SWitchToTableReducer',
          payload: payload.tabKey,
        });
      }
    },
    * ReduceTabEffect({payload}: any, {put, select}: any) {
      const {tabList, currentKey} = yield select((state: ConnectState) => state.tabs);
      if (tabList.length === 1) {
        console.log('最后一个tab不能关闭');
        // 如果是删除最后一个，默认跳转首页
        yield put({
          type: "ReduceTabReducer",
          payload: {newTabs:[], newActiveKey:""},
        });
        router.push('/');
        return;
      }
      if (tabList.length <= 2) {
        yield put({
          type: 'ChangeCloseTypeReducer',
          payload: CloseType.card,
        });
      }
      let removeIndex = 0;
      let newActiveKey = currentKey;
      tabList.forEach((pane: any, i: number) => {
        if (pane.tabKey === payload) {
          removeIndex = i;
        }
      });
      // 删除最后一个
      if (removeIndex === tabList.length - 1) {
        if (payload === tabList[removeIndex].tabKey) {
          newActiveKey = tabList[tabList.length - 2].tabKey;
        }
      } else {
        newActiveKey = tabList[removeIndex + 1].tabKey;
      }
      const newTabs = tabList.filter((pane: any) => pane.tabKey !== payload);
      yield put({
        type: "ReduceTabReducer",
        payload: {newTabs, newActiveKey}
      });
      router.push(newActiveKey);
    },
  },

};

export default UserModel;
