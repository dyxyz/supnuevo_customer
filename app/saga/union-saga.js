/**
 * union-saga.js
 */

import {Alert} from 'react-native'
import {call, put, take, takeEvery} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api/UnionApi";
import * as unionActions from "../actions/union-actions";
import strings from '../resources/strings';
import * as rootActions from "../actions/root-actions";
import * as authActions from "../actions/auth-actions";

// 获取省列表
function* getProvinceList () {
    try {
        const response = yield call(Api.getProvinceList);
        if (response.re == 1) {
            console.log(response)
            yield put(unionActions.getProvinceListSuccess(response.data));
        } else {
            Alert.alert(strings.alertTitle,strings.time_out);
            yield put(unionActions.getProvinceListFail('fail'));
        }
    } catch (error) {
        yield put(unionActions.getProvinceListFail(error));
    }
}

// 获取市列表
function* getCityList (action) {
    const {provinceId} = action;
    try {
        const response = yield call(Api.getCityList,provinceId);
        if (response.re == 1) {
            console.log(response)
            yield put(unionActions.getCityListSuccess(response.data));
        } else {
            Alert.alert(strings.alertTitle,strings.time_out);
            yield put(unionActions.getCityListFail('fail'));
        }
    } catch (error) {
        yield put(unionActions.getCityListFail(error));
    }
}

// 通过城市获取联盟列表
function* getUnionListByCityId (action) {
    const {cityId,provinceId} = action;
    try {
        var response=null
        if(cityId==-1){
            response = yield call(Api.getUnionListByCityId,cityId,provinceId);
        }
        else {
            response = yield call(Api.getUnionListByCityId, cityId, null);
        }
        if (response.re == 1) {
            console.log(response)
            yield put(unionActions.getUnionListSuccess(response.data));
        } else {
            Alert.alert(strings.alertTitle,strings.time_out);
            yield put(unionActions.getUnionListFail('fail'));
        }

    } catch (error) {
        yield put(unionActions.getUnionListFail(error));
    }
}

// 获取联盟列表
function* getUnionList () {
  try {
    const response = yield call(Api.getUnionList);
    if (response.re == 1) {
      console.log(response)
      yield put(unionActions.getUnionListSuccess(response.data));
    } else {
      Alert.alert(strings.alertTitle,strings.time_out);
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
        console.log(response)
        if (response.re == 1) {
            const cartId = response.data.cartId;
            const merchantId = response.data.merchantId;
            const union = response.data.union;
            yield put(unionActions.getCustomerShoppingCarSuccess(cartId,unionId,merchantId,union));
            yield put(authActions.setCustomerDefaultMerchant(unionId,merchantId));
            yield put(authActions.setCustomerCart(cartId));
        } else {
            Alert.alert(strings.alertTitle,strings.time_out);
            yield put(unionActions.getCustomerShoppingCarFail(strings.getUnionMemberListFail));
        }
    } catch (error) {
        yield put(unionActions.getCustomerShoppingCarFail(error));
    }
}

// 获取联盟成员（超市）列表
function* getUnionMemberList (action) {
  const {unionId,username,password,union} = action;
  try {
    const response = yield call(Api.getUnionMemberList, unionId);
    if (response.re == 1) {
      const merchants = response.data;
      const edges = response.data.edgeList;
      console.log(response.data);
      if(merchants.length==1){
          yield put(authActions.setCustomerDefaultMerchant(unionId, merchants[0].merchantId));
          yield put(unionActions.setDefaultUnionAndMerchant(merchants[0],union));
      }
      // yield put(authActions.login(username,password));
      yield put(unionActions.getUnionMemberListSuccess(merchants));
    } else {
        Alert.alert(strings.alertTitle,strings.time_out);
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
    console.log(response)
    if(response.re === 1) {
      const advertisementList = response.data;
      if (start === 0) {
        if (!advertisementList || advertisementList.length === 0) {
          yield put({type: actions.ADVERTISEMENT_LIST_REFRESHING_NO_DATA});
            yield put({type: actions.GET_ADVERTISEMENT_LIST_SUCCESS, advertisements: null});
        } else {
          yield put({type: actions.GET_ADVERTISEMENT_LIST_SUCCESS, advertisements: advertisementList});
        }
      } else if (!advertisementList || advertisementList.length === 0) {
        yield put({type: actions.ADVERTISEMENT_LIST_LOADING_NO_DATA});
      } else {
        yield put({type: actions.GET_MORE_ADVERTISEMENT_LIST_SUCCESS, advertisements: advertisementList});
      }
    }else{
        Alert.alert(strings.alertTitle,strings.time_out);
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
    var response=null

    if (start === 0) {
      yield put({ type: actions.PRICE_LIST_REFRESHING });
       response = yield call(Api.getSupnuevoBuyerUnionPriceList,unionId, start, count,cartId);
    } else {
      yield put({ type: actions.PRICE_LIST_LOADING });
      response = yield call(Api.getSupnuevoBuyerUnionPriceList,unionId, start, count,cartId);
    }
    console.log(response)
    if(response.re === 1) {
        yield put({type: actions.SET_TAX_NULL});
      const priceList = response.data;
      if (start === 0) {
        if (!priceList || priceList.length === 0) {
          yield put({type: actions.PRICE_LIST_REFRESHING_NO_DATA});
            yield put({type: actions.GET_PRICE_LIST_SUCCESS, priceList: priceList});
        } else {
          yield put({type: actions.GET_PRICE_LIST_SUCCESS, priceList: priceList});
        }
      } else if (!priceList || priceList.length === 0) {
        yield put({type: actions.PRICE_LIST_LOADING_NO_DATA});
      } else {
        yield put({type: actions.GET_MORE_PRICE_LIST_SUCCESS, priceList: priceList});
      }
    }else{
        Alert.alert(strings.alertTitle,strings.time_out);
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
  const {unionId, userInput,cartId} = action;
  try {
    yield put(rootActions.setLoading(true));
    const response = yield call(Api.getSupnuevoBuyerUnionPriceListLucene, unionId, userInput,cartId);
    if (response.re == 1) {
      const priceList = response.data;
      console.log(priceList)
      yield put(unionActions.getUnionPriceListLuceneSuccess(priceList));
        yield put({type: actions.PRICE_LIST_LOADING_NO_DATA});
        yield put({type: actions.SET_TAX_NULL});
    } else {
        Alert.alert(strings.alertTitle,strings.time_out);
      yield put(unionActions.getUnionPriceListLuceneFail(strings.getUnionPriceListFail));
    }
  } catch (error) {
    yield put(unionActions.getUnionPriceListLuceneFail(error));
  }
  finally {
    yield put(rootActions.setLoading(false));
  }
}

//通过种类获取商品
function* getPriceListByTax (action) {
    const {taxId,unionId,cartId} = action;
    try {
        yield put(rootActions.setLoading(true));
        const response = yield call(Api.getPriceListByTax,taxId,unionId,cartId);
        if (response.re == 1) {
            const priceList = response.data;
            console.log(response)
            yield put(unionActions.getPriceListByTaxSuccess(priceList,taxId));
            // yield put({type: actions.SET_BACK_TOP});
            yield put({type: actions.PRICE_LIST_LOADING_NO_DATA});
        } else {
            Alert.alert(strings.alertTitle,strings.time_out);
            yield put(unionActions.getPriceListByTaxFail(strings.getClassPriceListFail));
        }
    } catch (error) {
        yield put(unionActions.getPriceListByTaxFail(error));
    }
    finally {
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
        Alert.alert(strings.alertTitle,strings.time_out);
      yield put(unionActions.getUnionRegulationFail(strings.getUnionRegulationFail));
    }
  } catch (error) {
    yield put(unionActions.getUnionRegulationFail(error));
  }
}

export default [
  takeEvery(actions.GET_PROVINCE_LIST, getProvinceList),
  takeEvery(actions.GET_CITY_LIST, getCityList),
  takeEvery(actions.GET_UNION_LIST_CITY, getUnionListByCityId),
  takeEvery(actions.GET_UNION_LIST_ACTION, getUnionList),
  takeEvery(actions.GET_UNION_CUSTOMER_SHOPPING_CAR, getSupnuevoUnionCustomerShoppingCar),
  takeEvery(actions.GET_UNION_MEMBER_LIST_ACTION, getUnionMemberList),
  takeEvery(actions.GET_ADVERTISEMENT_LIST, getUnionAdvertisementList),
  takeEvery(actions.GET_PRICE_LIST, getUnionPriceList),
  takeEvery(actions.GET_PRICE_LIST_LUCENE, getUnionPriceListLucene),
  takeEvery(actions.GET_PRICE_LIST_TAX, getPriceListByTax),
  takeEvery(actions.GET_UNION_REGULATION, getUnionRegulation),
]
