/**
 * root-actions.js
 */

import * as actions from "../actions/action-types";

export function setLoading(isLoading) {
  return {
    type: actions.SET_LOADING,
    loading: isLoading
  }
}
