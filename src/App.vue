<template>
  <!--<div id="app">-->
    <router-view> </router-view>
<!--  </div>-->
</template>

<script>
//import RangList from "@/components/RangList.vue";
//import { eventBus } from '@/eventBus';

export default {
  name: "App",
  /*components: {
    RangList,
  },*/
  mounted() {
    if (localStorage.getItem("language") === null) {
      localStorage.setItem("language", "en");
    }
    this.$i18n.locale = localStorage.getItem("language");
    this.initMap();
  },
  methods: {
    async initMap() {
      var MarkerAnnotation = window.mapkit.MarkerAnnotation,
        clickAnnotation;
      var sfo = new window.mapkit.Coordinate(37.616934, -122.38379),
        work = new window.mapkit.Coordinate(37.3349, -122.0090201);

      await window.mapkit.init({
        authorizationCallback: function (done) {
          fetch("https://alex.polan.sk/people-map/verify.php")
            .then((res) => res.text())
            .then(done);
        },
        language: "en",
      });

      const MAP_COLORS = [
        {
          color: "#fcc5c0",
          range: "0",
          num: 1,
        },
        {
          color: "#fa9fb5",
          range: "1+",
          num: 10,
        },
        {
          color: "#f768a1",
          range: "10+",
          num: 30,
        },
        {
          color: "#dd3497",
          range: "30+",
          num: 50,
        },
        {
          color: "#ae017e",
          range: "50+",
          num: 100,
        },
        {
          color: "#7a0177",
          range: "100+",
          num: Infinity,
        },
      ];

      const region = new window.mapkit.CoordinateRegion(
        new window.mapkit.Coordinate(25.0, 15.0),
        new window.mapkit.CoordinateSpan(180.0, 360.0)
      );

      const map = new window.mapkit.Map("map", {
        mapType: window.mapkit.Map.MapTypes.Satellite,
        center: new window.mapkit.Coordinate(25.0, 15.0),
        region: region,
        ///showsUserLocation: true,
        //showsUserLocationControl: true,
      });

      // Setting properties on creation:
      var sfoAnnotation = new MarkerAnnotation(sfo, {
        color: "#f4a56d",
        title: "SFO",
        glyphText: "✈️",
      });
      var an2 = new MarkerAnnotation(
        new window.mapkit.Coordinate(36.321718, 30.331393),
        { color: "#f4a56d", title: "Hooker's Haven", glyphText: "✈️" }
      );

      // Setting properties after creation:
      var workAnnotation = new MarkerAnnotation(work);
      workAnnotation.color = "#969696";
      workAnnotation.title = "Work";
      workAnnotation.subtitle = "Apple Park";
      workAnnotation.selected = "true";
      workAnnotation.glyphText = "";

      map.showItems([sfoAnnotation, workAnnotation, an2]);

      let geoJSONParserDelegate = {
        itemForPolygon: function (overlay) {
          overlay.style = new window.mapkit.Style({
            strokeColor: "#000",
            strokeOpacity: 0.8,
            lineWidth: 1,
            fillOpacity: 0.8,
            fillColor: "#CACACA",
          });
          map.addOverlay(overlay);

          return overlay;
        },

        itemForFeature: function (overlay, geoJSON) {
          const counter = geoJSON.properties.count;

          overlay.data = {
            name: geoJSON.properties.name,
            counter: geoJSON.properties.count,
          };

          // Find the right color for the population and the set the style.
          for (var i = 0; i < MAP_COLORS.length; ++i) {
            if (counter < MAP_COLORS[i].num) {
              overlay.style = new window.mapkit.Style({
                fillOpacity: 0.7,
                lineWidth: 0.5,
                fillColor: MAP_COLORS[i].color,
              });
              break;
            }
          }
          return overlay;
        },

        geoJSONDidComplete: function (result, geoJSON) {
          console.log("GeoJSONDelegate.geoJSONDidComplete");
          console.log(result);
          console.log(geoJSON);
        },
        geoJSONDidError: function (error, geoJSON) {
          console.log("GeoJSONDelegate.geoJSONDidError");
          console.log(error);
          console.log(geoJSON);
        },
      };

      var mapLegend = document.querySelector(".map-legend");

      function addLegend() {
        let el, textNode;
        MAP_COLORS.forEach(function (mColor) {
          el = document.createElement("div");
          textNode = document.createTextNode(mColor.range);
          el.appendChild(textNode);
          el.style.background = mColor.color;
          mapLegend.appendChild(el);
        });
      }

      addLegend();

      window.mapkit.importGeoJSON(
        "https://alex.polan.sk/people-map/countries.php",
        geoJSONParserDelegate
      );

      map.element.addEventListener("click", function (event) {
        if (!event.shiftKey) {
          return;
        }

        if (clickAnnotation) {
          //   map.removeAnnotation(clickAnnotation);
        }

        let person = prompt("Ahoi! Please enter the name of your new city:");
        console.log(person);

        var coordinate = map.convertPointOnPageToCoordinate(
          new DOMPoint(event.pageX, event.pageY)
        );
        clickAnnotation = new MarkerAnnotation(coordinate, {
          title: person,
          color: "#c969e0",
        });
        let json = {
          coordinate: coordinate,
          title: person,
          color: "#c969e0",
        };
        console.log(json);
        localStorage.setItem("base", JSON.stringify(json));
        map.addAnnotation(clickAnnotation);
      });
    },
  },
};
</script>

<style>
@font-face {
  font-family: "Blackpearl";
  src: url("@/Blackpearl.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}


#map {
  width: 100%;
  height: 100%;
}

body,
html {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  font-family: "Blackpearl", sans-serif !important;
  cursor: pointer;
}

.container .map-legend {
  position: absolute;
  z-index: 1005;
  top: 15px;
  left: 15px;
}

.map-legend div {
  margin-bottom: 5px;
  width: 40px;
  font-size: 12px;
  color: #fff;
  padding: 4px 7px;
  border-radius: 5px;
}

.container {
  position: relative;
}

.app-header {
  text-align: center;
  margin: 0;
  z-index: 1001; /* Ensure the header is above other elements */
  position: absolute;
  background-color: transparent; /* Completely transparent background */
  text-align: center;
  justify-content: center;
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0)
  ); /* Gradient shadow from top */
  margin-bottom: 10px;
}

.app-header h1 {
  font-size: 2em;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  margin-bottom: 5px;
}

.app-description {
  font-size: 1.2em;
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
  padding: 0 20px;
  margin-top: 5px;
}

/*class="mk-top-right-controls-container mk-top-right-controls-container-children-two mk-controls-container-controls-larger"*/

.mk-top-right-controls-container {
  z-index: 1010;
}
</style>
