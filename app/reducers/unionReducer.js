/**
 * unionReducer.js
 */

import * as actions from "../actions/action-types";
import constants from '../resources/constants';
import {RefreshState} from "../components/RefreshListView";

export default function unionReducer(state, action = {}) {
  switch (action.type) {
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
          return state.withMutations(state => state
              .set('dataResponse', constants.GET_UNION_MEMBER_LIST_SUCCESS)
              .set('dataError', '')
              .set('cartId', action.cartId)
              .set('unionId', action.unionId));

      case actions.GET_UNION_CUSTOMER_SHOPPING_CAR_FAIL:
          return state.withMutations(state => state
              .set('dataResponse', constants.GET_UNION_MEMBER_LIST_FAIL)
              .set('dataError', action.error));

      case actions.GET_UNION_MEMBER_LIST_SUCCESS:
      return state.withMutations(state => state
          .set('dataResponse', constants.GET_UNION_MEMBER_LIST_SUCCESS)
          .set('dataError', '')
          .set('merchants', action.merchants)
          .set('edges', action.edges));
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
          .set('refreshState', RefreshState.HeaderRefreshing));
    case actions.PRICE_LIST_REFRESHING_NO_DATA:
      return state.withMutations(state => state
          .set('refreshState', RefreshState.EmptyData));
    case actions.PRICE_LIST_LOADING:
      return state.withMutations(state => state
          .set('refreshState', RefreshState.FooterRefreshing));
    case actions.PRICE_LIST_LOADING_NO_DATA:
      return state.withMutations(state => state
          .set('refreshState', RefreshState.NoMoreData));
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
          .set('union', action.union?action.union:state.get("union"))
          .set('merchant', action.merchant?action.merchant:state.get("merchant")));
    default:
      return state
  }
}
