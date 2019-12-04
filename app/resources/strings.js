/**
 * Strings.js
 */
import LocalizedStrings from "react-localization";

module.exports = new LocalizedStrings({
  en: {

    // common
    confirm: "确定",
    cancel: "取消",
    choose: "选择",
    back: "返回",
    add: "添加",
    commit: "提交",

    // auth
    app_title: "Supnuevo Union",
    login_btn: "登录",
    login_validate_msg: "请将登录信息填写完整",
    login_success: "登录成功",
    login_fail: "登录失败",
    register_btn: "注册",
    register_validate_msg: "请将注册信息填写完整",
    register_success: "已注册等待审核中！",
    register_fail: "注册失败",
    login_wait: "登录中,请稍候...",
    customer_invalid: "该客户不存在",
    addCustomerReceiverInfoFail:"添加配送信息失败",

    // form
    edit_btn: "修改",
    delete_btn: "删除",
    networking_error: "网络错误",
    retry: "点击重试",
    noData: "暂时没有相关数据",
    loadError: "点击重新加载",
    noMore: "已加载全部数据",
    loading: "数据加载中...",
    name: "名称",
    brief: "简介",
    price: "价格",
    updatetime: "上传时间",
    rubro: "类型",
    presentacion: "描述",
    marca: "品牌",
    tamano: "含量",
    codigo: "条形码",
    imgurls_intro: "商品图片",
    details_intro: "商品详情",
    action_choose: "请选择",
    ImagePicker_SelectTitle: "请选择图片",
    ImagePicker_ChooseFromLibrary: "从相册中选取",
    ImagePicker_TakePhoto: "拍照",
    getDataSuccess: '获取数据成功',
    getDataFail: '获取数据失败',
    getDataDetailSuccess: '获取详情成功',
    getDataDetailFail: '获取详情失败',
    addDataSuccess: '添加数据成功',
    addDataFail: '添加数据失败',
    deleteDataSuccess: '删除数据成功',
    deleteDataFail: '删除数据失败',
    editDataSuccess: '修改数据成功',
    editDataFail: '修改数据失败',
    nameIsNotEmpty: '姓名不为空',
    codigoIsNotEmpty: '条码不为空',
    priceIsNotEmpty: '价格不为空',

    // AIServer
    getResultFail:"搜索数据失败",

    //orderBasicInfo
    orderType:"订单类型",
    customerMobilePhone:"客户手机电话",
    deliverMobilePhone:"提货超市电话",
    deliverAddress:"提货超市地址",
    self_delivery:"自提",
    common_delivery:"送货",
    receiverAddr_input:"请输入送货地址",
    receiverPhone_input:"请输入接货人电话",
    receiverName_input:"请输入接货人姓名",
    cartInfo: "购物车中的商品",
    discountInfo: "折扣信息",
    orderDate:"订单日期",
    orderInfo:"订单内容",
    pickName:"接货人姓名",
    pickMobilePhone:"接货人电话",
    pickAddress:"送货地址",

    // union
    getUnionListFail: "获取联盟列表失败",
    getUnionMemberListFail: "获取超市列表失败",
    getUnionAdvertisementListFail: "获取折扣广告失败",
    getUnionPriceListFail: "获取价格表失败",
    getUnionPriceListLuceneFail: "搜索失败",
    getUnionRegulationFail:"获取规则失败",

    //shopping
    getCartInfoFail: "获取购物车信息失败",
    updateCartInfoFail: "修改购物车信息失败",

    // order
    getPrevOrderFail: "获取当前订单失败",
    getOrderListFail: "获取订单列表失败",
    submitOrderFail: "提交订单失败",
    submitOrderSuccess: "提交订单成功",
    discountFee: "折扣减免总计",
    totalFeeFianl: "实际付款总计",
    orderNum: "订单编号",

    //imagehead
    head:"https://supnuevo.s3.sa-east-1.amazonaws.com/",
  },
});
