/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "com/proy/project/model/models",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/UriParameters",
    "sap/f/FlexibleColumnLayoutSemanticHelper",
    "sap/f/library",
    "com/proy/project/util/Common",
    "com/proy/project/util/Constants",
  ],
  function (
    UIComponent,
    Device,
    models,
    JSONModel,
    UriParameters,
    FlexibleColumnLayoutSemanticHelper,
    library,
    Common,
    Constants
  ) {
    "use strict";

    const LayoutType = library.LayoutType;

    return UIComponent.extend("com.proy.project.Component", {
      metadata: {
        manifest: "json",
      },

      /**
       * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
       * @public
       * @override
       */
      init: function () {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);

        const oModelSetter = new JSONModel({
          layout: "OneColumn",
        });
        this.setModel(oModelSetter, "appView");

        // enable routing
        this.getRouter().initialize();

        this._getInitialData();

        // set the device model
        this.setModel(models.createDeviceModel(), "device");
      },
      _getInitialData: function () {
        const url =
          sap.ui.require.toUrl("com/proy/project") + "/northwind/northwind.svc";
        this._model = new sap.ui.model.odata.v2.ODataModel(
          url,
          Constants.oDataModelOptions
        );

        this._model.read("/Order_Details", {
          async: true,
          success: jQuery.proxy((oData) => this._onSuccess(oData), this),
          error: jQuery.proxy(this._onError, this),
        });
      },
      _onSuccess: function (oData) {
        const oModel = new JSONModel(oData);
        this.setModel(oModel, Constants.models.orderDetails);
      },
      _onError: function (error) {
        console.error(error);
      },
    });
  }
);
