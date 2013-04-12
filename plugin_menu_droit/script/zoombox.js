/*Zoom by Max*/
	function modifBBox(coin1, coin2){ 
//prend en argument les deux nouveaux coins de la BBox, de type LatLng

//Création des variables (de type <Number>) latmin latmax lngmin lngmax
var latmin = Math.min(coin1.lat, coin2.lat),
latmax = Math.max(coin1.lat, coin2.lat) ,
lngmin = Math.min(coin1.lng, coin2.lng) ,
lngmax = Math.max(coin1.lng, coin2.lng) ;

//Création des points pour définir la BBox puis création de la BBox 
var southWest = new L.LatLng(latmin, lngmin),
    northEast = new L.LatLng(latmax, lngmax),
    BBox = new L.LatLngBounds(southWest, northEast);

/*modifier la carte pour afficher la BBox en argument (avec le zoom minimal. Donc si le rectangle sélectionné est plus haut que large, on verra exactement ce qui a été sélectionné en hauteur et un peu plus en largeur)*/
map.fitBounds(BBox);

}
$('#zoom').click(function() {

var coin1,coin2;

              //on ajoute l’EventListener suivant qui permettra de lancer la fonction si le bouton est enfoncé
              map.addEventListener('mouseup', function(e) { 
                         // e est l’objet (de type MouseEvent) renvoyé par l’évènement mouseup
						 //Modification du position du cadre
						 $(document).mousemove(function(e){
      					 $( "#Cadre" ).css( "left", "e.pageX" );
						 $( "#Cadre" ).css( "top", "e.pageY" );
   }); 

                         coin1=e.latlng;
           map.removeEventListener('mouseup') ; //on ne suit (=Listen) plus l’event mouseup 
           map.addEventListener('mousedown', function(e2) {  //on suit l’event mousedown
                                     coin2=e2.latlng;
         map.removeEventListener('mousedown') ; //on ne suit plus l’event mousedown
               //on dispose des deux coins => recadrage carte
              		modifBBox(coin1, coin2) ;
                          });	
              });

});
