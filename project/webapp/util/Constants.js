sap.ui.define([], function () {
  "use strict";
  return {
    sPathURL: "localService/Order_Details.json",
    i18n: {
      en: "com.proy.ejerciciointegrador.i18n.i18n",
      de: "com.proy.ejerciciointegrador.i18n.i18n_de",
    },

    models: {
      filterData: "filterData",
      orderDetails: "orderDetails",
      appView: "appView",
      order: "order",
    },
    oDataModelOptions: {
      json: true,
      headers: {
        DataServiceVersion: "2.0",
        "Cache-Control": "no-cache, no-store",
        Pragma: "no-cache",
      },
      useBatch: false,
    },
  };
});
