var map, mapquest, nysdop;


mapquest = new L.TileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: "Data CC-By-SA by <a href='http://openstreetmap.org/' target='_blank'>OpenStreetMap</a>, Tiles Courtesy of <a href='http://open.mapquest.com' target='_blank'>MapQuest</a>",
    subdomains: ['1', '2', '3', '4'],
    opacity: 1
});

nysdop = new L.TileLayer("http://www.orthos.dhses.ny.gov/ArcGIS/rest/services/2007/MapServer/tile/{z}/{y}/{x}.jpg", {
    maxZoom: 20,
    attribution: "Imagery courtesy of <a href='http://www.vcgi.org/' target='_blank'>VCGI</a>",
    scheme: "xyz",
    opacity: 0
});

var LeafIcon = L.Icon.extend({
    iconUrl: 'http://labs.google.com/ridefinder/images/mm_20_green.png',
    shadowUrl: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png',
    iconSize: new L.Point(12, 20),
    shadowSize: new L.Point(22, 20),
    iconAnchor: new L.Point(0, 0),
    popupAnchor: new L.Point(0, 0)
});

var greenIcon = new LeafIcon('http://labs.google.com/ridefinder/images/mm_20_green.png'),
    redIcon = new LeafIcon('http://labs.google.com/ridefinder/images/mm_20_red.png'),
    orangeIcon = new LeafIcon('http://labs.google.com/ridefinder/images/mm_20_orange.png');
	


function onLoad() {
    map = new L.Map('map', {
        center: new L.LatLng(42.805224943488675, -73.86795043945312),
        zoom: 12,
		fullscreenControl: true, // add fullscreen control to the map
        layers: [nysdop, mapquest],
				zoomControl : false

    });
	// detect fullscreen toggling
		map.on('enterFullscreen', function(){
			if(window.console) window.console.log('enterFullscreen');
		});
		map.on('exitFullscreen', function(){
			if(window.console) window.console.log('exitFullscreen');
		});
		
    map.on('zoomend', function (e) {
        $("#zoomslider").slider("value", map.getZoom());
    });
		map.addControl(new L.Control.Scale({ position: 'bottomleft'})); //Echelle en bas à gauche
		L.control.locate().addTo(map); //mode localisation GPS
		L.control.zoom().addTo(map);
		var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		var osmAttrib='Map data &copy; OpenStreetMap contributors';
		var osm = new L.TileLayer(osmUrl, {minZoom: 5, maxZoom: 18, attribution: osmAttrib});
		var osm2 = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 13, attribution: osmAttrib});
		var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true }).addTo(map); 
}




$(document).ready(function () {
    $("#basemapslider").slider({
        animate: true,
        value: 1,
        min: 0,
        max: 1,
        step: 0.1,
        slide: function (event, ui) {
            mapquest.setOpacity(ui.value);
            nysdop.setOpacity(1 - ui.value);
        }
    });
    $("#zoomslider").slider({
        animate: true,
        orientation: "vertical",
        value: 12,
        min: 0,
        max: 20,
        step: 1,
        slide: function (event, ui) {
            map.setZoom(ui.value);
        }
    });
    $(function () {
        $("button", ".layers").button();
        $("button", ".layers").click(function () {
            $("#layersdialog").dialog("open");
            return false;
        });
    });
    $.fx.speeds._default = 1000;
    
	/*creation of 2 var that countains the size fo the window*/
				
				var viewportwidth;
				var viewportheight;
				if (typeof window.innerWidth != 'undefined')
			 {
				  viewportwidth = window.innerWidth,
				  viewportheight = window.innerHeight
			 }
			  
			// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
			 
			 else if (typeof document.documentElement != 'undefined'
				 && typeof document.documentElement.clientWidth !=
				 'undefined' && document.documentElement.clientWidth != 0)
			 {
				   viewportwidth = document.documentElement.clientWidth,
				   viewportheight = document.documentElement.clientHeight
			 }
			  
			 // older versions of IE
			  
			 else
			 {
				   viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
				   viewportheight = document.getElementsByTagName('body')[0].clientHeight
			 }
			  
	/*function that changes the size of the menu if the window is resized*/	
	var timer;
		window.onresize = function(){
		clearInterval( timer );
		timer = setTimeout( function(){
        			 if (typeof window.innerWidth != 'undefined')
			 {
				  viewportwidth = window.innerWidth,
				  viewportheight = window.innerHeight
			 }
			  
			// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
			 
			 else if (typeof document.documentElement != 'undefined'
				 && typeof document.documentElement.clientWidth !=
				 'undefined' && document.documentElement.clientWidth != 0)
			 {
				   viewportwidth = document.documentElement.clientWidth,
				   viewportheight = document.documentElement.clientHeight
			 }
			  
			 // older versions of IE
			  
			 else
			 {
				   viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
				   viewportheight = document.getElementsByTagName('body')[0].clientHeight
			 }
			 $("#layersdialog").dialog({height: viewportheight})

    }, 400 );
	}
	
	$(function () {
        $("#layersdialog").dialog({
            autoOpen: false,
			closeOnEscape: true,
			draggable: false ,
            position: [0, 0],
            width: 200,
			height: viewportheight,
			show: {effect: 'slide', speed: 1000, direction: "left"},
            hide: {effect: 'slide', speed: 1000, direction: "left"},
			resizable: false,
			
			buttons: [ {id:"close_button", click: function() { 
												$( this ).dialog( "close" ); 
												$( "#layersopener" ).show( {effect: 'slide', speed: 10000, direction: "left"} ); 
												} 
						} ,
											
						],
						
						
						
			
			open: function(){
				$(this).parent().children().children(".ui-dialog-titlebar-close").hide();
				$(this).parent().children().children(".ui-dialog-titlebar").hide();
                $("#accordion").accordion({
					autoHeight: false,
					collapsible: true,
					active: false
				});
				
            }

        });
    });	
	
	$(function(){
                $("#sous_accordion1").accordion({
					autoHeight: false,
					collapsible: true,
					active: false
				});
				
            });
			
	$(function(){
                $("#sous_accordion2").accordion({
					autoHeight: false,
					collapsible: true,
					active: false
				});
				
            });
	$(function(){
                $("#sous_accordion3").accordion({
					autoHeight: false,
					collapsible: true,
					active: false
				});
				
            });
	$(function(){
                $("#sous_accordion4").accordion({
					autoHeight: false,
					collapsible: true,
					active: false
				});
				
            });
	$(function(){
                $("#sous_accordion5").accordion({
					autoHeight: false,
					collapsible: true,
					active: false
				});
				
            });
			
});
