/*******************Start measuring button***************/
	var container = L.DomUtil.create('div', 'essai leaflet-draw-toolbar leaflet-bar leaflet-draw-section');
	
	var measuringTool;
	var optionsMeasureLabel = {
        minWidth: 50,
        autoPan: false,
        closeButton: false,
        className: 'measuring-label'
    };

	$('#measuring-tool').click(function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			if (measuringTool) {
				measuringTool.disable();
			}
		} else {
			$(this).addClass('active');
			if (!measuringTool) {
				measuringTool = new L.MeasuringTool(map);
			}
			measuringTool.enable();
		}
	});
