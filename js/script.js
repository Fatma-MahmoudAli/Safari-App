// let myBasemap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
// 	subdomains: 'abcd',
// 	maxZoom: 19});

var myBasemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let mymap = L.map('Map',{
    center:[30,30],
	
    zoom:5,
    layers:[myBasemap]
});
var Attraction = L.geoJSON( {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          29.443359375,
          25.145284610685064
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          30.838794708251953,
          29.310800427071975
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          25.46630859375,
          29.248063243796576
        ]
      }
    }
  ]
}

  ).addTo(mymap)
console.log(Attraction);

var popup = L.popup()
    .setLatLng(geometry)
    .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    .openOn(mymap);


let geoJason = L.geoJSON(Attraction,{

	onEachFeature:function (feature, layer) {
		console.log("feature",feature);
		console.log("layer",layer);
	   layer.bindPopup(	
		    	`<table id = "Table">
	    	<thead> 
	   	<tr> 
	   		<th>Name:</th>
	  		<th>Describtion</th>
   
	   	</tr>
	   	</thead>
   
	    	<tbody>
	    	 <tr>
	    		<td>Country:</td>
	   		<td>${attribution}</td>
   
	    	 </tr>
			 <tr>
	    		<td>Deaths:</td>
	   		<td>${deaths}</td>
   
	    	 </tr>
			 <tr>
			 <td>confirmed:</td>
			<td>${confirmed}</td>

		  </tr>
		  
		  <tr>
		  <td>recovered:</td>
		 <td>${recovered}</td>
 
	      </tr>
	   
			 
			
	   
   
	    	</tbody>
   
	    </table>`
			  
	   	)}
	  }
).addTo(mymap)

// form
var e = document.getElementById("ddlViewBy");
var strUser = e.value;

let res = this.menu.valu

		
