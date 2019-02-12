sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("QuickStartApplication.controller.SurveyFinished", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf QuickStartApplication.view.SurveyFinished
		 */
		onInit: function () {

			// HTML string bound to the formatted text control
			var oModel = new sap.ui.model.json.JSONModel({
				HTML: "<h3>We have received your feedack. Thanks a lot for your time.</h3>" +
					"<br/><p></p>" +
					"<h5>Find more information about SAP Marketing Cloud at</h5>" +
					"<p><a href=\"//help.sap.com/mkt\" >Official SAP Marketing Cloud help page</a></p>" +
					"<p><a href=\"//api.sap.com\">SAP API Business Hub</a></p>" +
					"<p><a href=\"//blogs.sap.com/2018/06/03/extending-and-adapting-integration-flows-for-file-based-upload-into-sap-marketing-cloud\">" + 
					"Extending and Adapting Integration Flows </a></p>" 

			});
			this.getView().setModel(oModel);

		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf QuickStartApplication.view.SurveyFinished
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf QuickStartApplication.view.SurveyFinished
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf QuickStartApplication.view.SurveyFinished
		 */
		//	onExit: function() {
		//
		//	}

	});

});