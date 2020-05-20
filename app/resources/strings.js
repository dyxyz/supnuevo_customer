/**
 * Strings.js
 */
import LocalizedStrings from "react-localization";

module.exports = new LocalizedStrings({
  CN: {

    // // common
    // confirm: "确定",
    // cancel: "取消",
    // choose: "选择",
    // back: "返回",
    // add: "添加",
    // commit: "提交",
    // out:"退出",

      // alert
      // empty_car:"您的购物车为空，请先选购商品",
      // no_shop:"自提货物需要先选择提货超市",
      // shopping_with_union:"请选择联盟再进行购物",
      // select_union:"请选择联盟",


      // // auth
    //   wait_login:"登录中，请稍候...",
    //   wait_register:"注册中，请稍候...",


      // help:"帮助",
    // skip_help:"跳过帮助",
    // getCustomerHelpFail:"获取用户帮助失败",
    // app_title: "Supnuevo Union",
    // login_btn: "登录",
    // username_input:"请输入用户名",
    // password_input:"请输入密码",
    // tel_input:"请输入手机号",
    // login_validate_msg: "请将登录信息填写完整",
    // login_success: "登录成功",
    // login_fail: "登录失败",
    // register_btn: "注册",
    // register_validate_msg: "请将注册信息填写完整",
    // register_success: "已注册等待审核中！",
    // register_fail: "注册失败",
    // login_wait: "登录中,请稍候...",
    // customer_invalid: "该客户不存在",
    // addCustomerReceiverInfoFail:"添加配送信息失败",
    // helpMessage:["欢迎您使用街区超市联盟系统，我们将为您的购物提供物美价廉方便安全的服务。您的采购将不再需要占用您大量的宝贵时间，也不需要预付任何款项，可以在离您最近的超市提货或者选择您最信得过的超市为您服务。",
    //     "在使用本系统之前，您需要首先注册一个账号，我们是采用一个手机一个账号的方式，除了手机号码，您不需要提供任何个人信息。注册后，需要等待人工确定后才可生效，这是为了防止无效注册，因此给您带来的不便，还请您给予谅解。",
    //     "如有任何疑问可以向我们的任何一家会员超市请求帮助，他们会耐心的为您解答，也可以直接拨打下面投诉电话，我们将出面为您协调。"
    // ],
    //
    // // rootPage
    // first_page:"首页",
    //   express:"说明",
    // select_shop:"逛店/选择我的超市",
    // window_shopping:"逛店",
    // store_name:"商户名",
    // store_addr:"商户地址",
    // discount:"折扣",
    // price_list:"价格表",
    // shopping:"购物",
    // my_order:"下订单/我的订单",
    // rule:"规则",
    // history:"历史",
    //   root_expression:"这里是您购物的初始界面，也是您\n" +
    //   "购物操作的中枢，一个完整的购物\n" +
    //   "步骤包括：\n" +
    //   "    1.指定为您服务的超市。\n" +
    //   "    2.选择您要购买的商品。\n" +
    //   "    3.提交您购物的订单。\n" +
    //   "完成以上三个步骤后，您将收到来\n" +
    //   "自您指定的服务点的电话，进一步\n" +
    //   "商定本订单买卖双方所关心的其他\n" +
    //   "细节。\n" +
    //   "以上三个步骤，都需要从这里出发\n" +
    //   "进入下一级界面，所以在完成每个\n" +
    //   "操作后，请按屏幕下方的首页图示\n" +
    //   "回到这里。\n" +
    //   "以上三个步骤中的第一步骤，如果\n" +
    //   "没有必要改变为您服务的超市，并\n" +
    //   "不需要在每次购买中另行指定，如\n" +
    //   "果本次购买中没有改变服务点，系\n" +
    //   "统将沿用您上次指定的超市为您服\n" +
    //   "务。\n" +
    //   "\n",
    //
    //
    //
    // // form
    // edit_btn: "修改",
    // delete_btn: "删除",
    // networking_error: "网络错误",
    // retry: "点击重试",
    // noData: "暂时没有相关数据",
    // loadError: "点击重新加载",
    // noMore: "已加载全部数据",
    // loading: "数据加载中...",
    // name: "名称",
    // brief: "简介",
    // price: "价格",
    // updatetime: "上传时间",
    // rubro: "类型",
    // presentacion: "描述",
    // marca: "品牌",
    // tamano: "含量",
    // codigo: "条形码",
    // imgurls_intro: "商品图片",
    // details_intro: "商品详情",
    // action_choose: "请选择",
    // ImagePicker_SelectTitle: "请选择图片",
    // ImagePicker_ChooseFromLibrary: "从相册中选取",
    // ImagePicker_TakePhoto: "拍照",
    // getDataSuccess: '获取数据成功',
    // getDataFail: '获取数据失败',
    // getDataDetailSuccess: '获取详情成功',
    // getDataDetailFail: '获取详情失败',
    // addDataSuccess: '添加数据成功',
    // addDataFail: '添加数据失败',
    // deleteDataSuccess: '删除数据成功',
    // deleteDataFail: '删除数据失败',
    // editDataSuccess: '修改数据成功',
    // editDataFail: '修改数据失败',
    // nameIsNotEmpty: '姓名不为空',
    // codigoIsNotEmpty: '条码不为空',
    // priceIsNotEmpty: '价格不为空',
    //
    // // AIServer
    // getResultFail:"搜索数据失败",
    //
    // //orderBasicInfo
    // order:"订单",
    // orderType:"订单类型",
    // customerMobilePhone:"客户手机电话",
    // now_union:"当前购物联盟",
    // deliverMobilePhone:"提货超市电话",
    // deliverAddress:"提货超市地址",
    // self_delivery:"自提",
    // common_delivery:"送货",
    // receiverAddr_input:"请输入送货地址",
    // receiverPhone_input:"请输入接货人电话",
    // receiverName_input:"请输入接货人姓名",
    // self_time:"请选择取货时间",
    // common_time:"请选择配送时间",
    // cartInfo: "购物车中的商品",
    // cartHeaderList:['商品名称','数量','价格','小计'],
    // discountInfo: "折扣信息",
    // discountHeaderList:['商品名称','购买数量','减免小计'],
    // orderDate:"订单日期",
    // orderInfo:"订单内容",
    // pickName:"接货人姓名",
    // pickMobilePhone:"接货人电话",
    // pickAddress:"送货地址",
    // expectDeliverTime:"期望送货时间",
    // expectFetchTime:"期望自提时间",
    //   store_rule:"本店规则",
    //   order_state:"订单状态",
    //   cancel_order:"取消订单",
    //   not_deal:"未接单",
    //   have_dealed_for:"已被商家",
    //   have_dealed_fore:"接单",
    //   have_finished:"已完成",
    //   order_submit:"已提交订单",
    //   order_confirm:"已确认订单",
      // order_finished:"已完成订单",

      //
    // // union
    //   union_expression:"本界面首先向您展示了所有加盟本组\n" +
    //   "的超市，上面是地图，下面是列表，\n" +
    //   "如果您需要送货或取货的地址在这一\n" +
    //   "区域，请在下面选择一个您中意的超\n" +
    //   "市作为为您服务的点。这些超市在这\n" +
    //   "里将按照统一的价格为您提供服务。\n" +
    //   "点击右下角的价格表，可以浏览商品\n" +
    //   "价格，点击左下角的图示可以浏览本\n" +
    //   "期的折扣广告，注意这里只能看不能\n" +
    //   "买，需要购物，请先按下面中间的图\n" +
    //   "示退回首页，再进入购物界面，进入\n" +
    //   "选择商品的步骤。\n",
    // getUnionListFail: "获取联盟列表失败",
    // getUnionMemberListFail: "获取超市列表失败",
    // getUnionAdvertisementListFail: "获取折扣广告失败",
    // getUnionPriceListFail: "获取价格表失败",
    // getUnionPriceListLuceneFail: "搜索失败",
    // getUnionRegulationFail:"获取规则失败",
    // placeholderText:"在价格表中查询商品",
    //   goods_detail:"商品详情",
    //   goods_codigo:"商品条码",
    //   goods_sim:"商品简称",
    //   goods_name:"商品全称",
    //   goods_price:"商品价格",
    //
    // //shopping
    //   shopping_expression:"这个界面是您选择需要购买的商品\n" +
    //   "的界面。\n" +
    //   "上半部分是已经选择的商品，在商\n" +
    //   "品图示上上划可以加一，下划可以\n" +
    //   "减一，点击可以展示商品详细信息。\n" +
    //   "下半部分是价格表，右划加一，左\n" +
    //   "划减一，点击展示商品详细信息。\n" +
    //   "中间是商品查询工具，可以根据您输\n" +
    //   "入的不完整商品名称，查找出您所需\n" +
    //   "商品。\n" +
    //   "注意这里只能选择您需要的商品，如\n" +
    //   "果想要提交订单，请先按下面中间的\n" +
    //   "图示退回首页，再进入提交订单的步\n" +
    //   "骤。\n",
    // getCartInfoFail: "获取购物车信息失败",
    // updateCartInfoFail: "修改购物车信息失败",
    //   car_forth:"您的购物车共有",
    //   car_fore:"件商品",
    //   searching:"搜索中,请稍候...",
      //
    // // order
    // getPrevOrderFail: "获取当前订单失败",
    // getOrderListFail: "获取订单列表失败",
    // submitOrderFail: "提交订单失败",
    // submitOrderSuccess: "提交订单成功",
    // discountFee: "折扣减免总计",
    // totalFeeFianl: "实际付款总计",
    // orderNum: "订单编号",
    // cancelOrderFail: "取消订单失败",
    //   order_history:"历史订单",

    // 西文
    //   common
      confirm: "determinar",
      cancel: "cancelación",
      choose: "seleccione",
      back: "regreso",
      add: "añadir",
      commit: "ENVIAR",
      out:"VOLVER",
      log_out:"Salir",

      // alert
      empty_car:"Su carrito de la compra está vacío, por favor seleccione primero los artículos",
      no_shop:"La autorecogida requiere la selección de UN supermercado de recogida primero",
      shopping_with_union:"Por favor, seleccione la alianza antes de hacer compras",
      select_union:"Por favor seleccione la alianza",

      // auth
      help:"AYUDA",
      wait_login:"UN momento, por favor...",
      wait_register:"UN momento, por favor...",
      skip_help:"Saltar Ayuda",
      getCustomerHelpFail:"Falla en obtener ayuda del usuario",
      app_title: "Supnuevo Union",
      login_btn: "INGRESAR",
      username_input:"Ingresar Usuario",
      password_input:"Ingresal Clave",
      tel_input:"Ingresal teléfono",
      login_validate_msg: "Por favor rellene los datos de inicio de sesión",
      login_success: "Inicio de sesión exitoso",
      login_fail: "El inicio de sesión falló",
      register_btn: "REGISTRARSE",
      register_validate_msg: "Complete los datos de registro",
      register_success: "Registrado en espera de revisión！",
      register_fail: "Fracaso del registro",
      login_wait: "UN momento, por favor...",
      customer_invalid: "El cliente no existe",
      addCustomerReceiverInfoFail:"Error en la adición de la información de distribución",
      helpMessage:["Bienvenido a SUPNUEVO alianza de supermercados en barrios.Le proporcionamous un servicio (barato o gratis).seguro y práctico para sus compras.Ya no Ocupará su valioso tiempo en el súper y notendrá que pagar nada por adel antado.Puede retirar Su pedido en su súper más cercano osolicitar el envío a su domicilio del local de su confianza",
          "Antea de usar este sistema,primero debe registrar una cuenta.Usamos un número de teléfono móvil y un método de cuenta, no necesita proporcionar ninguna Otra información personal ademásdel número de teléfono móvil.Después del registro,debe esperar laconfirmación manual antes de que surta efecto.Disculpe las molestias que esto pueda causarle.",

          "Si tiene alguna duda,solicite ayuda a nuestro supermercado miembro También puede llamar al teléfono..."
      ],



      // rootPage
      first_page:"Inicio",
      express:"nota",
      select_shop:"ELEGIR MI COMERCIO",
      window_shopping:"ELEGIR MI COMERCIO",
      store_name:"Nombre fantasia",
      store_addr:"Direccion",
      discount:"OFERTA",
      price_list:"LISTADO",
      shopping:"COMPRAR",
      order:"ENVIAR ",
      my_order:"ENVIAR ",
      rule:"NOTA",
      history:"HISTORIAL",
      root_expression1:"Esta es la APP para sus compras en el supermercado de su barrio o en aquel que usted prefiera.En estesitio también guardará el historial de sus pedidos. " ,
      root_expression2:"1.Seleccione el supermercado que prefiera teniendo siempre en cuenta la zona del mismo",
      root_expression3:"2.Elija los productos y cantidad que desea comprar",
      root_expression4:"3.Pulse \"ENVIAR\" para que su pedido sea dirigido al comercio",
      root_expression5:"Cuando haya enviado su pedido el comerciante lo llamará para coordinar detalles de la entrega.",
      root_expression6:"Para cambiar de función debe pulsar el botón home (la casita)ubicado al centro y abajo de la pantalla.",
      root_expression7:"El sistema siempre guardará el ultimo comercio en el cual usted compró. Si desea cambiar por otro, deberá seleccionar uno nuevo",


      // form
      edit_btn: "La modificación",
      delete_btn: "borrar",
      networking_error: "Errores de red",
      retry: "Haga clic en reintentar",
      noData: "Por el momento no hay datos disponibles",
      loadError: "Haga clic en volver a cargar",
      noMore: "Se han cargado todos los datos",
      loading: "Datos en carga...",
      name: "nombre",
      brief: "perfil",
      price: "precio",
      updatetime: "Hora de carga",
      rubro: "Tipos de",
      presentacion: "descripción",
      marca: "marca",
      tamano: "contenido",
      codigo: "Código",
      imgurls_intro: "Imagen de la mercancía",
      details_intro: "Detalles de las mercancías",
      action_choose: "Por favor seleccione",
      ImagePicker_SelectTitle: "seleccione la imagen",
      ImagePicker_ChooseFromLibrary: "Seleccione de los álbumes",
      ImagePicker_TakePhoto: "fotos",
      getDataSuccess: 'Éxito en la adquisición de datos',
      getDataFail: 'Falta de acceso a los datos',
      getDataDetailSuccess: 'Obtener detalles con éxito',
      getDataDetailFail: 'Falta de acceso a los detalles',
      addDataSuccess: 'Éxito en la adición de datos',
      addDataFail: 'Error en la adición de datos',
      deleteDataSuccess: 'Éxito en la eliminación de datos',
      deleteDataFail: 'Fallo en la eliminación de datos',
      editDataSuccess: 'Éxito en la modificación de los datos',
      editDataFail: 'Error en la modificación de los datos',
      nameIsNotEmpty: 'Los nombres no están en blanco',
      codigoIsNotEmpty: 'El código de barras no está vacío',
      priceIsNotEmpty: 'El precio no está vacío',

      // AIServer
      getResultFail:"Fallo en la búsqueda de datos",

      //orderBasicInfo
      orderType:"Tipo de pedido",
      now_union:"La actual alianza de compras",
      customerMobilePhone:"Celular USUARIO",
      deliverMobilePhone:"Teléfono del supermercado de recogida",
      deliverAddress:"Dirección del supermercado de recogida",
      self_delivery:"Retiro en el comercio",
      common_delivery:"Envío a domicilio",
      receiverAddr_input:"Dirección de envío",
      receiverPhone_input:"Teléfono del receptor",
      receiverName_input:"Nombre del receptor",
      self_time:"Tiempo de recogida",
      common_time:"Plazos de entrega",
      cartInfo: "Productos en el carrito",
      cartHeaderList:['producto','cantidad','precio','subtotal'],
      discountInfo: "Información de descuento",
      discountHeaderList:['producto','cantidad','subtotal'],
      orderDate:"Fecha del pedido",
      orderInfo:"Informacion del pedido",
      pickName:"Nombre del receptor",
      pickMobilePhone:"Teléfono del receptor",
      pickAddress:"Dirección de entrega",
      expectDeliverTime:"Plazo de entrega previsto",
      expectFetchTime:"Tiempo de espera",
      store_rule:"NOTAS",
      order_state:"Estado de la orden",
      cancel_order:"Cancelar pedido",
      reback_order:'Agregar al carrito',
      not_deal:"Pedidos no recibidos",
      have_dealed_for:"Ser",
      have_dealed_fore:"Uno solo",
      have_finished:"terminado",
      order_submit:"presentado",
      order_confirm:"confirmado",
      order_finished:"terminado",

      // union
      union_expression:"En esta pantalla verá todos los supermercados \n" +
      "que conforman el grupo.  Arriba verá su \n" +
      "ubicación por medio del mapa y abajo tendrá\n" +
      "los datos de cada uno de ellos.\n" +
      "Seleccione del listado el comercio que desea para\n" +
      "recibir o pasar a retirar su compra.\n" +
      "En la parte inferior, icono izquierdo podrá ver las \n" +
      "ofertas y en el icono derecho todos los precios.Este sección solo es de información, para comprar\n" +
      "deberá ir a la pantalla de inicio y entrar \n" +
      "“COMPARA”.\n" +
      "Si desea agregar algo, vaya a NOTAS en la esquina superior derecha.",
      getUnionListFail: "No pudo obtener la lista de afiliados",
      getUnionMemberListFail: "No pudo obtener la lista de supermercados",
      getUnionAdvertisementListFail: "Los anuncios de descuento fallaron",
      getUnionPriceListFail: "No se pudo obtener la lista de precios",
      getUnionPriceListLuceneFail: "Falta de búsqueda",
      getUnionRegulationFail:"Falta de reglas de acceso",
      placeholderText:"Introducción de las condiciones de consulta",
      goods_detail:"quienes",
      goods_codigo:"código",
      goods_sim:"abreviaturas",
      goods_name:"completos",
      goods_price:"precio",


      //shopping
      shopping_expression:"Es esta pantalla usted puede realizar su pedido.  \n" +
      "/ En la parte de superior se detallan los productos\n" +
      "y sus cantidades que ha incorporado al carrito  \n" +
      "/ A continuación verá el buscador de artículos por\n" +
      "palabra clave /   Luego, se muestran todos los \n" +
      "productos y sus precios. Desde aquí pulsando \n" +
      "sobre el producto y arrastrando hacia la\n" +
      "\"derecha sumará\" cantidad y hacia la\n" +
      " \"izquierda restará\".En esta sección solo podrá realizar el pedido, para \n" +
      "enviar el mismo deberá volver a HOME para ir a la\n" +
      "pagina principal.",
      getCartInfoFail: "No pudo obtener la información del carrito de la compra",
      updateCartInfoFail: "Error en la modificación de la información del carrito",
      clearCarFail:"No se pudo vaciar el carrito de la compra",
      car_forth:"Hay",
      car_fore:"productos en su carrito",
      searching:"En busca, espere UN poco...",
      clearCar:'vacíe',
      skip_to_order:"hacer pedido",

      // order
      skip_to_car:'a carrito',
      order_history:"MIS PEDIDOS",
      getPrevOrderFail: "No se pudo obtener el pedido actual",
      getOrderListFail: "No pudo obtener la lista de pedidos",
      submitOrderFail: "Fallo en la presentación del pedido",
      submitOrderSuccess: "Envío del pedido con éxito",
      recallCarFail: "Primero deberán vaciar el carrito",
      discountFee: "Total de descuentos",
      totalFeeFianl: "Total de los pagos reales",
      orderNum: "Número de orden",
      cancelOrderFail: "Fallo en la cancelación del pedido",
    //imagehead
    head:"https://supnuevo.s3.sa-east-1.amazonaws.com/",
  },

});
