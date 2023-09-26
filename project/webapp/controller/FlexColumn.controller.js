sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "com/proy/project/util/Common",
  ],
  function (Controller, JSONModel, Common) {
    "use strict";

    return Controller.extend("com.proy.project.controller.FlexColumn", {
      onInit: function () {},
      handleBackButtonPressed: function () {
        Common.navToAndUpdateView({
          layoutView: "OneColumn",
          instance: this,
          navTo: {
            goBack: true,
          },
        });
      },
    });
  }
);
