sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "com/proy/project/util/Constants",
    "sap/ui/model/json/JSONModel",
    "com/proy/project/util/Common",
    "com/proy/project/util/Formatter",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Constants, JSONModel, Common, Formatter) {
    "use strict";

    return Controller.extend("com.proy.project.controller.List", {
      Formatter,
      onInit: function () {
        const { i18n, sPathURL } = Constants;

        // Set i18n configuration
        var onResourceModel = this.getOwnerComponent().getModel("i18n");
        onResourceModel.enhance({ bundleName: i18n.de });

        sap.ui.getCore().getConfiguration().setLanguage("de");

        // Load data from json
        const oModel = new JSONModel();
        oModel.loadData(sPathURL);

        // Set filters model
        this.getView().setModel(oModel, Constants.models.filterData);
        Common.setModelData({
          oData: {
            selectedKeycomboBoxProductID: "",
            selectedKeycomboBoxOrderID: "",
          },
          instance: this,
        });
      },
      onComboBoxSelectionChange: function (oEvent) {
        const oModel = this.getView().getModel();
        const oComboBox = oEvent.getSource();
        const sSelectedKey = oComboBox.getSelectedKey();
        const stringList = ["comboBoxOrderID", "comboBoxProductID"];
        const findList = stringList.filter((substring) =>
          oEvent.getParameter("id").includes(substring)
        );

        if (findList.length > 0)
          oModel.setProperty("/selectedKey" + findList[0], sSelectedKey);
      },
      /**
       * Get item data from table and navigate to
       * Detail view
       * @param {*} oEvent
       */ onListItemPress: function (oEvent) {
        var oSelectedItem = oEvent.getParameter("listItem");
        var oContext = oSelectedItem.getBindingContext("orderDetails");
        const values = this.getView()
          .getModel(Constants.models.orderDetails)
          .getProperty(oContext.getPath());

        Common.updateView({
          layoutView: "TwoColumnsMidExpanded",
          instance: this,
        });

        const oOrderModel = new JSONModel(values);
        this.getOwnerComponent().setModel(oOrderModel, "order");

        Common.navTo({
          instance: this,
          routeName: "detail",
          values: { order: values.OrderID },
        });
      },
      /**
       * Clear filters for the table
       */
      clearFilters: function () {
        const oTable = this.byId("idTableItems");
        const oModel = this.getView().getModel();

        oModel.setProperty("/selectedKeycomboBoxOrderID", "");
        oModel.setProperty("/selectedKeycomboBoxProductID", "");

        const oBinding = oTable.getBinding("items");
        oBinding.filter([]);
      },
      /**
       * Retrieve values from inputs and filter the data
       */ handleSearch: function () {
        const filters = [];
        const oTable = this.byId("idTableItems");
        const oModel = this.getView().getModel();

        const orderidboxvalue = oModel.getProperty(
            "/selectedKeycomboBoxOrderID"
          ),
          productidboxvalue = oModel.getProperty(
            "/selectedKeycomboBoxProductID"
          );

        if (orderidboxvalue !== undefined && orderidboxvalue !== "")
          filters.push(
            new sap.ui.model.Filter(
              "OrderID",
              sap.ui.model.FilterOperator.EQ,
              orderidboxvalue
            )
          );
        if (productidboxvalue !== undefined && productidboxvalue !== "")
          filters.push(
            new sap.ui.model.Filter(
              "ProductID",
              sap.ui.model.FilterOperator.EQ,
              productidboxvalue
            )
          );

        const oBinding = oTable.getBinding("items");
        oBinding.filter([...filters]);
      },
    });
  }
);
