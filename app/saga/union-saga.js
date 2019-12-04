/**
 * union-saga.js
 */

import {call, put, take, takeEvery} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api/UnionApi";
import * as unionActions from "../actions/union-actions";
import strings from '../resources/strings';
import * as rootActions from "../actions/root-actions";
import * as authActions from "../actions/auth-actions";

// 获取联盟列表
function* getUnionList () {
  try {
    const response = yield call(Api.getUnionList);
    if (response.re == 1) {
      yield put(unionActions.getUnionListSuccess(response.data));
    } else {
      yield put(unionActions.getUnionListFail(strings.getUnionListFail));
    }
  } catch (error) {
    yield put(unionActions.getUnionListFail(error));
  }
}

//获取customer当前联盟下的购物车状态
function* getSupnuevoUnionCustomerShoppingCar (action) {
    const {unionId} = action;
    try {
        const response = yield call(Api.getSupnuevoUnionCustomerShoppingCar, unionId);
        if (response.re == 1) {
            const cartId = response.data;
            // const edges = response.data.edgeList;
            yield put(unionActions.getCustomerShoppingCarSuccess(cartId,unionId));
        } else {
            yield put(unionActions.getCustomerShoppingCarFail(strings.getUnionMemberListFail));
        }
    } catch (error) {
        yield put(unionActions.getCustomerShoppingCarFail(error));
    }
}

// 获取联盟成员（超市）列表
function* getUnionMemberList (action) {
  const {unionId,username,password} = action;
  try {
    const response = yield call(Api.getUnionMemberList, unionId);
    if (response.re == 1) {
      const merchants = response.data;
      const edges = response.data.edgeList;
      yield put(authActions.login(username,password));
      yield put(unionActions.getUnionMemberListSuccess(merchants, edges));
    } else {
      yield put(unionActions.getUnionMemberListFail(strings.getUnionMemberListFail));
    }
  } catch (error) {
    yield put(unionActions.getUnionMemberListFail(error));
  }
}

// 获取折扣广告（分页加载）
function* getUnionAdvertisementList( action ) {
  try {
    const {unionId, start, count} = action;

    if (start === 0) {
      yield put({ type: actions.ADVERTISEMENT_LIST_REFRESHING });
    } else {
      yield put({ type: actions.ADVERTISEMENT_LIST_LOADING });
    }
    const response = yield call(Api.getSupnuevoBuyerUnionAdvertisementList,unionId, start, count);
    if(response.re === 1) {
      const advertisementList = response.data;
      if (start === 0) {
        if (!advertisementList || advertisementList.length === 0) {
          yield put({type: actions.ADVERTISEMENT_LIST_REFRESHING_NO_DATA});
        } else {
          yield put({type: actions.GET_ADVERTISEMENT_LIST_SUCCESS, advertisements: advertisementList});
        }
      } else if (!advertisementList || advertisementList.length === 0) {
        yield put({type: actions.ADVERTISEMENT_LIST_LOADING_NO_DATA});
      } else {
        yield put({type: actions.GET_MORE_ADVERTISEMENT_LIST_SUCCESS, advertisements: advertisementList});
      }
    }else{
      if (start === 0) {
        yield put({ type: actions.GET_ADVERTISEMENT_LIST_FAIL });
      } else {
        yield put({ type: actions.GET_MORE_ADVERTISEMENT_LIST_FAIL });
      }
    }
  } catch (e) {
    if (start === 0) {
      yield put({ type: actions.GET_ADVERTISEMENT_LIST_FAIL });
    } else {
      yield put({ type: actions.GET_MORE_ADVERTISEMENT_LIST_FAIL });
    }
  }
}

// 获取价格表 （分页加载）
function* getUnionPriceList (action) {
  try {
    const {unionId, start, count,cartId} = action;

    if (start === 0) {
      yield put({ type: actions.PRICE_LIST_REFRESHING });
    } else {
      yield put({ type: actions.PRICE_LIST_LOADING });
    }
    const response = yield call(Api.getSupnuevoBuyerUnionPriceList,unionId, start, count,cartId);
    if(response.re === 1) {
      const priceList = response.data;
      if (start === 0) {
        if (!priceList || priceList.length === 0) {
          yield put({type: actions.PRICE_LIST_REFRESHING_NO_DATA});
        } else {
          yield put({type: actions.GET_PRICE_LIST_SUCCESS, priceList: priceList});
        }
      } else if (!priceList || priceList.length === 0) {
        yield put({type: actions.PRICE_LIST_LOADING_NO_DATA});
      } else {
        yield put({type: actions.GET_MORE_PRICE_LIST_SUCCESS, priceList: priceList});
      }
    }else{
      if (start === 0) {
        yield put({ type: actions.GET_PRICE_LIST_FAIL });
      } else {
        yield put({ type: actions.GET_MORE_PRICE_LIST_FAIL });
      }
    }
  } catch (e) {
    if (start === 0) {
      yield put({ type: actions.GET_PRICE_LIST_FAIL });
    } else {
      yield put({ type: actions.GET_MORE_PRICE_LIST_FAIL });
    }
  }
}

// 搜索引擎
function* getUnionPriceListLucene (action) {
  const {unionId, userInput} = action;
  try {
    yield put(rootActions.setLoading(true));
    const response = yield call(Api.getSupnuevoBuyerUnionPriceListLucene, unionId, userInput);
    if (response.re == 1) {
      const priceList = response.data;
      yield put(unionActions.getUnionPriceListLuceneSuccess(priceList));
    } else {
      yield put(unionActions.getUnionPriceListLuceneFail(strings.getUnionPriceListFail));
    }
  } catch (error) {
    yield put(unionActions.getUnionPriceListLuceneFail(error));
  } finally {
    yield put(rootActions.setLoading(false));
  }
}

// 获取联盟规则
function* getUnionRegulation (action) {
  const {unionId} = action;
  try {
    const response = yield call(Api.getSupnuevoBuyerUnionRegulationInfo, unionId );
    if (response.re == 1) {
      const regulation = response.data;
      yield put(unionActions.getUnionRegulationSuccess(regulation));
    } else {
      yield put(unionActions.getUnionRegulationFail(strings.getUnionRegulationFail));
    }
  } catch (error) {
    yield put(unionActions.getUnionRegulationFail(error));
  }
}

export default [
  takeEvery(actions.GET_UNION_LIST_ACTION, getUnionList),
  takeEvery(actions.GET_UNION_CUSTOMER_SHOPPING_CAR, getSupnuevoUnionCustomerShoppingCar),
  takeEvery(actions.GET_UNION_MEMBER_LIST_ACTION, getUnionMemberList),
  takeEvery(actions.GET_ADVERTISEMENT_LIST, getUnionAdvertisementList),
  takeEvery(actions.GET_PRICE_LIST, getUnionPriceList),
  takeEvery(actions.GET_PRICE_LIST_LUCENE, getUnionPriceListLucene),
  takeEvery(actions.GET_UNION_REGULATION, getUnionRegulation),
]
