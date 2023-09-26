sap.ui.define(
  ["sap/ui/model/json/JSONModel", "sap/ui/core/UIComponent"],
  function (JSONModel, UIComponent) {
    "use strict";

    return {
      setModelData: function ({ oData, instance, modelName }) {
        const args = [];
        const oModel = new JSONModel(oData);
        args.push(oModel);
        if (modelName) args.push(modelName);
        instance.getView().setModel(...args);
      },
      navToAndUpdateView: function ({ layoutView, instance, navTo }) {
        const oModelSetter = new JSONModel({
          layout: layoutView,
        });
        instance.getOwnerComponent().setModel(oModelSetter, "appView");
        if (navTo.goBack) {
          this.navToPreviousPage();
        } else {
          this.navTo({
            instance,
            routeName: navTo.routeName,
            values: navTo.routeName,
          });
        }
      },
      updateView: function ({ layoutView, instance }) {
        const oModelSetter = new JSONModel({
          layout: layoutView,
        });
        instance.getOwnerComponent().setModel(oModelSetter, "appView");
      },
      navToPreviousPage: function () {
        window.history.go(-1);
      },
      navTo: function ({ instance, routeName, values }) {
        const oRouter = UIComponent.getRouterFor(instance);
        oRouter.navTo(routeName, values);
      },
    };
  }
);
