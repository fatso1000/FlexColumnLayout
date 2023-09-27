sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "com/proy/project/util/Formatter",
    "sap/ui/core/UIComponent",
    "com/proy/project/util/Common",
    "sap/ui/model/json/JSONModel",
    "com/proy/project/util/Constants",
  ],
  function (Controller, Formatter, UIComponent, Common, JSONModel, Constants) {
    "use strict";

    return Controller.extend("com.proy.project.controller.Detail", {
      Formatter,
      /**
       * @override
       */
      onInit: function () {
        const oRouter = UIComponent.getRouterFor(this);
        oRouter
          .getRoute("detail")
          .attachPatternMatched(this._onRouteMatched, this);
        // this._fetchInitialData();
      },
      /**
       * Retrieve url params data
       * @param {*} oEvent data from button
       */
      _onRouteMatched: function (oEvent) {
        this._fetchInitialData();
      },
      _fetchInitialData: function () {
        const oModel = this.getOwnerComponent().getModel("order");
        const oData = oModel.getData();
        const wordToMatch = "Order_Details";
        const cutString = Common.cutStringAtWordStart(
          oData.Product.__deferred.uri,
          wordToMatch
        );
        const url =
          sap.ui.require.toUrl("com/proy/project") +
          "/northwind/northwind.svc/";
        this._model = new sap.ui.model.odata.v2.ODataModel(
          url,
          Constants.oDataModelOptions
        );
        console.log(oData)

        this._model.read(`/Order_Details${cutString}`, {
          async: true,
          success: jQuery.proxy((oData) => this._onSuccess(oData), this),
          error: jQuery.proxy(this._onError, this),
        });
      },
      _onSuccess: function (oData) {
        const oModel = new JSONModel(oData);
        console.log(oData);
        this.getOwnerComponent().setModel(
          oModel,
          Constants.models.orderProduct
        );
      },
      _onError: function (error) {
        console.error(error);
      },
    });
  }
);
