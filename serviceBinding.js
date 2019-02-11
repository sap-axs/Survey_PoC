function initModel() {
	var sUrl = "/MY300168_SURVEY/sap/opu/odata/SAP/CUAN_SURVEY_IMPORT_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}