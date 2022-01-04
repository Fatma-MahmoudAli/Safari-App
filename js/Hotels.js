require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/layers/FeatureLayer",
    "esri/PopupTemplate",
    "esri/request",
  ], function (
    config,
    map,
    mapView,
    Graphic,
    GraphicsLayer,
    FeatureLayer,
    PopupTemplate,
    esriRequest
  ) {
    config.apiKey =
      "AAPK4f58534cd23e48d485d0490fff4eb1cahojRZg1hNi9ZPRJomA9EHHq6T9tpBha8cuCTWpguCILE839JocGoQ2UTO_QdpjsL";
  
    const _map = new map({
      basemap: "arcgis-topographic", // Basemap layer service
    });
  
    const view = new mapView({
      map: _map,
      center: [29, 29], //Longitude, latitude
      zoom: 5,
      container: "mapdiv",
    });
  
    const graphicsLayer = new GraphicsLayer();
    _map.add(graphicsLayer);
    var measureThisAction = {
      title: "Hotel",
      id: "measure-this",
      image: "Measure_Distance16.png"
    };
    
    var template = {
      // autocasts as new PopupTemplate()
      title: "Hotel",
      content: `<table border = "1" align="center" width=100% >
      <thead> 
     <tr> 
       <th>Name</th>
      <th>Describtion</th>
  
     </tr>
     </thead>
  
      <tbody>
       <tr>
        <td>Name</td>
       <td align="center">{Name}</td>
  
       </tr>

       <tr>
       <td>Snippet</td>
      <td align="center">{Snippet}</td>
 
      </tr>

     <tr>
        <td>room_price</td>
       <td align="center">{room_price}</td>
  
       </tr>
     
     <tr>
        <td>city_name</td>
       <td align="center">{city_name}</td>
  
       </tr>
    
      </tbody>
  
    </table> `,
    
     
      actions: [measureThisAction],
  
  
    };
  
    const pFeatureLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Hotel1/FeatureServer",
      outFields: ["*"],
      popupTemplate: template
    
    });
    _map.add(pFeatureLayer);
    
    let form = document.getElementById("submit");
    form.addEventListener("click", (e) => {
      e.preventDefault();
      submit(Graphic, pFeatureLayer);
    });
  });
  
  function submit(Graphic, pFeatureLayer) {
    let Name = document.getElementById("name");
    let Price = document.getElementById("price");
    let Phone_No = document.getElementById("Phone_No");
    let City = document.getElementById("city");
    console.log(Name.value);
    console.log(Price.value);
    navigator.geolocation.getCurrentPosition((e) => {
      console.log(e);
      let coords = e.coords;
      let graphic = new Graphic({
        geometry: {
          type: "point", // autocasts as new Point()
          longitude: coords.longitude,
          latitude: coords.latitude,
        },
        attributes: {
          Name: Name.value,
          Phone_No: parseInt(Phone_No.value),
          Price_EGP: parseInt(Price.value),
          City: City.value,
          //  "region": "Andreanof Islands, Aleutian Islands, Alaska"
        },
      });
      pFeatureLayer
        .applyEdits(
          {
            addFeatures: [graphic],
          },
          {
            returnEditMoment: true,
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }