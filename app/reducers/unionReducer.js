/**
 * unionReducer.js
 */

import * as actions from "../actions/action-types";
import constants from '../resources/constants';
import {RefreshState} from "../components/RefreshListView";
import {updatePriceList} from "../utils/tools";
const count = constants.PRICE_LIST_PAGE;

export default function unionReducer(state, action = {}) {
  switch (action.type) {
      case actions.GET_PROVINCE_LIST_SUCCESS:
          return state.withMutations(state => state
              .set('dataError', '')
              .set('province',action.province));
      case actions.GET_PROVINCE_LIST_FAIL:
          return state.withMutations(state => state
              .set('dataError', action.error));
      case actions.GET_CITY_LIST_SUCCESS:
          action.city.splice(0,0,{cityName:'Todo',cityId:-1});
          console.log(action.city)
          return state.withMutations(state => state
              .set('dataError', '')
              .set('city',action.city));
      case actions.GET_CITY_LIST_FAIL:
          return state.withMutations(state => state
              .set('dataError', action.error));
    case actions.GET_UNION_LIST_SUCCESS:
      return state.withMutations(state => state
          .set('dataResponse', constants.GET_UNION_LIST_SUCCESS)
          .set('dataError', '')
          .set('unions',action.unions));
    case actions.GET_UNION_LIST_FAIL:
      return state.withMutations(state => state
          .set('dataResponse', constants.GET_UNION_LIST_FAIL)
          .set('dataError', action.error));

      case actions.GET_UNION_CUSTOMER_SHOPPING_CAR_SUCCESS:
        console.log(action.union)
          return state.withMutations(state => state
              .set('dataResponse', constants.GET_UNION_MEMBER_LIST_SUCCESS)
              .set('dataError', '')
              .set('cartId', action.cartId)
              .set('unionId', action.unionId)
              .set('union', action.union)
              .set('merchantId', action.merchantId));

      case actions.GET_UNION_CUSTOMER_SHOPPING_CAR_FAIL:
          return state.withMutations(state => state
              .set('dataResponse', constants.GET_UNION_MEMBER_LIST_FAIL)
              .set('dataError', action.error));

      case actions.GET_UNION_MEMBER_LIST_SUCCESS:
      return state.withMutations(state => state
          .set('dataResponse', constants.GET_UNION_MEMBER_LIST_SUCCESS)
          .set('dataError', '')
          .set('merchants', action.merchants));
    case actions.GET_UNION_MEMBER_LIST_FAIL:
      return state.withMutations(state => state
          .set('dataResponse', constants.GET_UNION_MEMBER_LIST_FAIL)
          .set('dataError', action.error));

    case actions.ADVERTISEMENT_LIST_REFRESHING:
      return state.withMutations(state => state
          .set('refreshState', RefreshState.HeaderRefreshing));
    case actions.ADVERTISEMENT_LIST_REFRESHING_NO_DATA:
      return state.withMutations(state => state
          .set('refreshState', RefreshState.EmptyData));
    case actions.ADVERTISEMENT_LIST_LOADING:
      return state.withMutations(state => state
          .set('refreshState', RefreshState.FooterRefreshing));
    case actions.ADVERTISEMENT_LIST_LOADING_NO_DATA:
      return state.withMutations(state => state
          .set('refreshState', RefreshState.NoMoreData));
    case actions.GET_MORE_ADVERTISEMENT_LIST_SUCCESS:
      return state.withMutations(state => state
          .set('refreshState',RefreshState.Idle)
          .set('advertisements',state.get('advertisements').concat(action.advertisements)));
    case actions.GET_MORE_ADVERTISEMENT_LIST_FAIL:
      return state.withMutations(state => state
          .set('refreshState',RefreshState.Failure));
    case actions.GET_ADVERTISEMENT_LIST_SUCCESS:
      return state.withMutations(state => state
          .set('refreshState',RefreshState.Idle)
          .set('dataError', '')
          .set('advertisements', action.advertisements));
    case actions.GET_ADVERTISEMENT_LIST_FAIL:
      return state.withMutations(state => state
          .set('refreshState',RefreshState.Failure)
          .set('advertisements',[])
          .set('dataError', action.error));

    case actions.PRICE_LIST_REFRESHING:
      return state.withMutations(state => state
          .set('start',10)
          .set('refreshState', RefreshState.HeaderRefreshing));
    case actions.PRICE_LIST_REFRESHING_NO_DATA:
      return state.withMutations(state => state
          .set('refreshState', RefreshState.EmptyData));
    case actions.PRICE_LIST_LOADING:
      // var start=state.get('union').get('start')+1
      //   console.log(start)
      return state.withMutations(state => state
          .set('start', state.get('start')+count)
          .set('refreshState', RefreshState.FooterRefreshing));
    case actions.PRICE_LIST_LOADING_NO_DATA:
      return state.withMutations(state => state
          .set('refreshState', RefreshState.NoMoreData));
      case actions.SET_TAX_NULL:
          return state.withMutations(state => state
              .set('taxId',null));
      case actions.SET_BACK_TOP:
          return state.withMutations(state => state
              .set('backTop',1));
    case actions.GET_MORE_PRICE_LIST_SUCCESS:
      return state.withMutations(state => state
          .set('refreshState',RefreshState.Idle)
          .set('priceList',state.get('priceList').concat(action.priceList)));
    case actions.GET_MORE_PRICE_LIST_FAIL:
      return state.withMutations(state => state
          .set('refreshState',RefreshState.Failure));
    case actions.GET_PRICE_LIST_SUCCESS:
      return state.withMutations(state => state
          .set('refreshState',RefreshState.Idle)
          .set('dataError', '')
          .set('priceList', action.priceList));
    case actions.GET_PRICE_LIST_FAIL:
      return state.withMutations(state => state
          .set('refreshState',RefreshState.Failure)
          .set('priceList',[])
          .set('dataError', action.error));

    case actions.GET_PRICE_LIST_LUCENE_SUCCESS:
      return state.withMutations(state => state
          .set('dataResponse', constants.GET_PRICE_LIST_LUCENE_SUCCESS)
          .set('dataError', '')
          .set('priceList', action.priceList));
    case actions.GET_PRICE_LIST_LUCENE_FAIL:
      return state.withMutations(state => state
          .set('dataResponse', constants.GET_PRICE_LIST_LUCENE_FAIL)
          .set('dataError', action.error));
      case actions.GET_PRICE_LIST_TAX_SUCCESS:
          return state.withMutations(state => state
              .set('dataResponse', constants.GET_PRICE_LIST_TAX_SUCCESS)
              .set('dataError', '')
              .set('taxId', action.taxId)
              .set('priceList', action.priceList));
      case actions.GET_PRICE_LIST_TAX_FAIL:
          return state.withMutations(state => state
              .set('dataResponse', constants.GET_PRICE_LIST_TAX_FAIL)
              .set('dataError', action.error));

    case actions.GET_UNION_REGULATION_SUCCESS:
      return state.withMutations(state => state
          .set('dataResponse', constants.GET_UNION_REGULATION_SUCCESS)
          .set('dataError', '')
          .set('regulation', action.regulation));
    case actions.GET_UNION_REGULATION_FAIL:
      return state.withMutations(state => state
          .set('dataResponse', constants.GET_UNION_REGULATION_FAIL)
          .set('dataError', action.error));

    case actions.RESET_UNION_RESPONSE:
      return state.withMutations(state => state
          .set('dataResponse', constants.INITIAL)
          .set('dataError', ''));
    case actions.SET_DEFAULT_UNION_AND_MERCHANT:
      return state.withMutations(state => state

          .set('edges', action.union.edgeList?action.union.edgeList:state.get("edges"))
          .set('union', action.union?action.union:state.get("union"))
          .set('merchant', action.merchant?action.merchant:state.get("merchant")));
    case actions.UPDATE_PRICE_LIST_SUCCESS:
        console.log(state.get('priceList'))
          const newPriceList = updatePriceList(state.get('priceList'),action.priceListItem);

          return state.withMutations(state => state
              .set('dataResponse', constants.UPDATE_PRICE_LIST_SUCCESS)
              .set('dataError', '')
              .set('priceList', newPriceList));
    default:
      return state
  }
}
