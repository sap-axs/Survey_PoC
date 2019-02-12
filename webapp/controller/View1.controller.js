sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (Controller, JSONModel, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("QuickStartApplication.controller.View1", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf QuickStartApplication.view.mickey
		 */
		onInit: function () {

			var userModel = new JSONModel("/services/userapi/currentUser");
			this.getView().setModel(userModel, "userapi");
			
			

			var oSurveyModel = new JSONModel({
				"SurveyId": "TRIALPOC001",
				"Provider": "TrialPoCProvider",
				"Version": 1,
				"ResponseId": "1",
				"Id": userModel.getData().email,
				"IdOrigin": "EMAIL",
				"IsResponseAnonymous": false,
				"ResponseUrl": "www.my300168.s4hana.ondemand.com",
				"RespondedOn": "",
				"SurveyResponseSurveyResponseDetailSet": [{
					"QuestionId": "TRIALPOC001-Q2",
					"ResponseText": ""
				}, {
					"QuestionId": "TRIALPOC001-Q3",
					"ResponseText": ""
				}]
			});
			//model for question Q0
			this.getView().setModel(new JSONModel({
				"A1": false,
				"A2": false,
				"A3": false,
				"A4": false
			}), "q0");

			//model for question Q1
			this.getView().setModel(new JSONModel({
				"Response": true
			}), "q1");

			this.getView().setModel(oSurveyModel, "sm");

			this._oBackendModel = this.getOwnerComponent().getModel();

			// attachRequestCompleted is called in success and error case.
			this._oBackendModel.attachRequestCompleted(function (result) {
				var params = result.getParameters();
				if (params && params.success) {
					//MessageToast.show(" Your survey replies were successfully uploaded.\n Thank you for your participation!");
					this.getOwnerComponent().getRouter().navTo("End");
				} else {
					if (params.response) {
						MessageBox.error("Error occured when sending your survey replies.\n Please check your input or try again later.", {
							details: params.response
						});
					}
				}
			}, this);
		},

		getBackendModel: function () {
			return this._oBackendModel;
		},

		// build up survey payload and send
		sendSurvey: function () {
			var oSurveyModel = this.getView().getModel("sm");
			var oSurveyResponse = oSurveyModel.getData();
			oSurveyResponse.RespondedOn = new Date().toISOString().split(".")[0];
			oSurveyResponse.Id = this.getView().byId("E1").getValue() ? this.getView().byId("E1").getValue() : this.getView().getModel(
				"userapi").getData().email;

			var oQ1Model = this.getView().getModel("q1");
			var Q1Answer = {
				"QuestionId": "TRIALPOC001-Q1",
				"ResponseIdRow": (oQ1Model.getData().Response === true) ? "TRIALPOC001-Q1-A1" : "TRIALPOC001-Q1-A2"
			};
			oSurveyResponse.SurveyResponseSurveyResponseDetailSet.push(Q1Answer);
			var oQ0Values = this.getView().getModel("q0").getData();

			for (var answer in oQ0Values) {
				if (oQ0Values.hasOwnProperty(answer) && oQ0Values[answer]) {
					oSurveyResponse.SurveyResponseSurveyResponseDetailSet.push({
						"QuestionId": "TRIALPOC001-Q0",
						"ResponseIdRow": "TRIALPOC001-Q0-" + answer
					});
				}
			}

			// final sending
			var oDataModel = this.getBackendModel();
			var sPath = "/SurveyResponseSet";
			oDataModel.create(sPath, oSurveyResponse);

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf QuickStartApplication.view.mickey
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf QuickStartApplication.view.mickey
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf QuickStartApplication.view.mickey
		 */
		//	onExit: function() {
		//
		//	}

	});

});