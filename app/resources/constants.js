/**
 * 应用需要访问的所有常量
 */

export default {
  EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  SUCCESS:'SUCCESS',
  FAIL:'FAIL',
  INITIAL: '',

  // URL
  SUPNUEVO_BASE_URL: 'http://www.supnuevo.com.ar:8080',
  SUPNUEVO_VENTAS_BASE_URL: 'http://Supnuevo-ventas.com.ar:8080',
  SPORTS_HOT_BASE_URL: 'http://114.215.99.2',

  // SUPNUEVO_TEST_BASE_URL: 'http://211.87.224.41:8080',
  // SUPNUEVO_TEST_BASE_URL:'http://142.4.194.0', //远程测试服务器
  //     SUPNUEVO_TEST_BASE_URL: 'http://192.168.1.101:8080', //legion111
  //   SUPNUEVO_TEST_BASE_URL: 'http://192.168.43.43:8080/supnuevo', //legion
  SUPNUEVO_TEST_BASE_URL: 'http://union.supnuevo.com.ar', //正式服务器
  //   SUPNUEVO_TEST_BASE_URL: 'http://192.168.101.11:8080/supnuevo', //家

    SUPNUEVO_VENTAS_TEST_BASE_URL: 'http://127.0.0.1:8080/supnuevo_ventas',
  SPORTS_HOT_TEST_BASE_URL: 'http://localhost:8080/badmintonhot',
  // SUPNUEVO_TEST_BASE_URL:'211.87.225.196',

  // STACK
  Title_UnionList: "逛店",

  // AI
  AI_COMMODITY: 1,
  AI_ANSWER: 2,
  TYPE_COMMODITY: '商品检索',
  TYPE_ANSWER: '智能问答',
  ANSWER_ROBOT: 'ROBOT',
  ROBOT_HELLO: "您好，我是您的问答机器人，请问您有什么问题？",

  deliverAddressList : ['中国','日本','美国'],
  pickMobileList : ['123','456','789'],
  pickNameList : ['Adam','Sam','Tony'],

  // AUTH
  NAME_TYPE: "name",
  ADDR_TYPE: "addr",
  PHONE_TYPE: "phone",
  ADD_RECEIVER_INFO_SUCCESS:"ADD_RECEIVER_INFO_SUCCESS",
  ADD_RECEIVER_INFO_FAIL:"ADD_RECEIVER_INFO_FAIL",

  // ORDER
  cartHeaderList:['商品名称','数量','价格','小计'],
  discountHeaderList:['商品名称','购买数量','减免小计'],

  // RULE
  rule:"北部第一网店\n\n本店最低购买量为实际购买金额不小于2000 peso\n\n折扣商品不大于总够买辆的50%\n\n不承诺一定送货上门\n\n非超市开门时间提货，一定要预约\n\n",

  // UNION
  GET_UNION_LIST_SUCCESS: "GET_UNION_LIST_SUCCESS",
  GET_UNION_LIST_FAIL: "GET_UNION_LIST_FAIL",
  GET_UNION_CUSTOMER_SHOPPING_CAR_FAIL:"GET_UNION_CUSTOMER_SHOPPING_CAR_FAIL",
  GET_UNION_CUSTOMER_SHOPPING_CAR_SUCCESS:"GET_UNION_CUSTOMER_SHOPPING_CAR_SUCCESS",
  GET_UNION_MEMBER_LIST_SUCCESS: "GET_UNION_MEMBER_LIST_SUCCESS",
  GET_UNION_MEMBER_LIST_FAIL: "GET_UNION_MEMBER_LIST_FAIL",
  GET_ADVERTISEMENT_LIST_SUCCESS: "GET_ADVERTISEMENT_LIST_SUCCESS",
  GET_ADVERTISEMENT_LIST_FAIL: "GET_ADVERTISEMENT_LIST_FAIL",
  GET_PRICE_LIST: "GET_PRICE_LIST",
  GET_PRICE_LIST_FAIL: "GET_PRICE_LIST_FAIL",
  GET_PRICE_LIST_SUCCESS: "GET_PRICE_LIST_SUCCESS",
  GET_PRICE_LIST_LUCENE: "GET_PRICE_LIST_LUCENE",
  GET_PRICE_LIST_LUCENE_SUCCESS: "GET_PRICE_LIST_LUCENE_SUCCESS",
  GET_PRICE_LIST_LUCENE_FAIL: "GET_PRICE_LIST_LUCENE_FAIL",
  GET_PRICE_LIST_TAX_SUCCESS: "GET_PRICE_LIST_TAX_SUCCESS",
  GET_PRICE_LIST_TAX_FAIL: "GET_PRICE_LIST_TAX_FAIL",
  GET_UNION_REGULATION_SUCCESS:"GET_UNION_REGULATION_SUCCESS",
  GET_UNION_REGULATION_FAIL:"GET_UNION_REGULATION_SUCCESS",
  DISCOUNT_PAGE: 5,
  PRICE_LIST_PAGE: 10,

  // SHOPPING
  SWIPE_DISTANCE: 30,
  ROW_SWIPE_DISTANCE:75,
  RE_ROW_SWIPE_DISTANCE:-75,
  RE_SWIPE_DISTANCE: -30,
  CART_ADD : 0,
  CART_DECLINE :1,
  CART_CREATE: 2,
  GET_CART_INFO: "GET_CART_INFO",
  GET_CART_INFO_SUCCESS: "GET_CART_INFO_SUCCESS",
  GET_CART_INFO_FAIL: "GET_CART_INFO_FAIL",
  GET_COMMODITY_CLASS_FAIL: "GET_COMMODITY_CLASS_FAIL",
  GET_COMMODITY_CLASS_SUCCESS: "GET_COMMODITY_CLASS_SUCCESS",

  UPDATE_CART_INFO:"UPDATE_CART_INFO",
  UPDATE_CART_INFO_SUCCESS:"UPDATE_CART_INFO_SUCCESS",
  UPDATE_PRICE_LIST_SUCCESS:"UPDATE_PRICE_LIST_SUCCESS",
  UPDATE_CART_INFO_FAIL:"UPDATE_CART_INFO_FAIL",
  ORDER_STATE_SUBMIT:0,
  ORDER_STATE_CONFIRM:1,
  ORDER_STATE_FINISHED:2,

  // ORDER
  GET_PREV_ORDER: "GET_PREV_ORDER",
  GET_PREV_ORDER_SUCCESS: "GET_PREV_ORDER_SUCCESS",
  GET_PREV_ORDER_FAIL: "GET_PREV_ORDER_FAIL",
  GET_ORDER_LSIT: "GET_ORDER_LSIT",
  GET_ORDER_LIST_SUCCESS: "GET_ORDER_LIST_SUCCESS",
  GET_ORDER_LIST_FAIL: "GET_ORDER_LIST_FAIL",
  SUBMIT_ORDER_INFO: "SUBMIT_ORDER_INFO",
  SUBMIT_ORDER_INFO_SUCCESS: "SUBMIT_ORDER_INFO_SUCCESS",
  SUBMIT_ORDER_INFO_FAIL: "SUBMIT_ORDER_INFO_FAIL",
  CANCEL_ORDER_SUCCESS:"CANCEL_ORDER_SUCCESS",
  RECALL_CAR_SUCCESS:'RECALL_CAR_SUCCESS',
  CANCEL_ORDER_FAIL:"CANCEL_ORDER_FAIL",
  RESET_ORDER_RESPONSE: "RESET_ORDER_RESPONSE",
  SELF_DELIVERY: "1",
  COMMON_DELIVERY: "0",
}
