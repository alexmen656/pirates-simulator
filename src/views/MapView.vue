<template>
  <div class="container">
    <header class="app-header">
      <h1>{{ $t("title") }}</h1>
      <!-- <p class="app-description">
            {{ $t("description") }}
          </p>-->
      <!-- {{ hint }}-->
    </header>
    <div id="map" style="width: 100%; height: 100vh"></div>
    <RangList class="rang-list" />
    <!--<div class="map-legend"></div>-->
    <LiveChat class="live-chat2" />
    <BottomHint :hint="hint" />
    <CoinCount class="coin-count-container" />
    <NewShip class="new-ship-container" />
  </div>
</template>

<script>
import RangList from "@/components/RangList.vue";
import LiveChat from "@/components/LiveChat.vue";
import BottomHint from "@/components/BottomHint.vue";
import CoinCount from "@/components/CoinCount.vue";
import NewShip from "@/components/NewShip.vue";
import goldCoordinates from "@/data/gold.json";
import axios from "axios";
import { eventBus } from "@/eventBus";

export default {
  name: "App",
  components: {
    RangList,
    LiveChat,
    BottomHint,
    CoinCount,
    NewShip,
  },
  data() {
    return {
      //    hint: "New hints coming"
      hint: "Place your base by holding Shift and then clicking anywhere on the land.",
      blockNewCities: false,
    };
  },
  mounted() {
    if (localStorage.getItem("language") === null) {
      localStorage.setItem("language", "en");
    }
    this.$i18n.locale = localStorage.getItem("language");
    this.initMap();
  },
  methods: {
    generatePirateShipName() {
      const names = [
        "Black Pearl",
        "Flying Dutchman",
        "Queen Anne's Revenge",
        "Jolly Roger",
        "Sea Serpent",
        "Golden Hind",
        "Whydah",
        "Adventure Galley",
        "Royal Fortune",
        "Fancy",
        "Ranger",
        "Revenge",
        "Rising Sun",
        "Santa Maria",
        "HMS Interceptor",
        "HMS Dauntless",
        "HMS Endeavour",
        "HMS Surprise",
        "HMS Victory",
        "HMS Bounty",
        "HMS Beagle",
        "HMS Dreadnought",
        "HMS Defiant",
        "HMS Indefatigable",
        "HMS Invincible",
      ];
      const randomIndex = Math.floor(Math.random() * names.length);
      return names[randomIndex];
    },
    async initMap() {
      var MarkerAnnotation = window.mapkit.MarkerAnnotation,
        clickAnnotation;
      /*  var sfo = new window.mapkit.Coordinate(37.616934, -122.38379),
        work = new window.mapkit.Coordinate(37.3349, -122.0090201);*/

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
          range: "Poor Lands",
          num: 1,
        },
        {
          color: "#fa9fb5",
          range: "Modest Village",
          num: 2,
        },
        {
          color: "#f768a1",
          range: "Trade Port",
          num: 3,
        },
        {
          color: "#dd3497",
          range: "Golden Shores",
          num: 40,
        },
        {
          color: "#ae017e",
          range: "Treasure Kingdom",
          num: 5,
        },
        /*  {
          color: "#7a0177",
          range: "100+",
          num: Infinity,
        },*/
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

      let previewCircle = null;
      let previewCircle2 = null;
      let previewCircle3 = null;
      let previewCircle4 = null;

      const verificationId = localStorage.getItem("verification_id");
      if (!verificationId) {
        this.$router.push("/");
        return;
      }

      try {
        const response = await this.$axios.get("base.php", {
          params: { verification_id: verificationId },
        });

        if (response.data.error) {
          console.error(response.data.error);
          this.$router.push("/");
          return;
        }

        this.bases = response.data;
        this.bases.forEach((base) => {
          const coordinate = new window.mapkit.Coordinate(
            Number(base.coordinate_x),
            Number(base.coordinate_y)
          );
          const annotation = new window.mapkit.MarkerAnnotation(coordinate, {
            title: base.name,
            color: "#160808",
            glyphText: "🏠",
          });
          map.addAnnotation(annotation);

          const radiusInMeters = 2000000; // Beispielradius
          previewCircle2 = new window.mapkit.CircleOverlay(
            coordinate,
            radiusInMeters,
            {
              fillColor: "#0000FF22", // Transparente Füllfarbe
              strokeColor: "#0000FF", // Linienfarbe
              lineWidth: 3, // Breite der Linie
            }
          );
          map.addOverlay(previewCircle2);

          // this.cities.push(annotation);
        });
      } catch (error) {
        console.error("Error fetching bases:", error);
        // alert(3);
        //this.$router.push("/");
        return;
      }

      // Mouse Move Event hinzufügen
      document
        .querySelector(".mk-map-view")
        .addEventListener("mousemove", (event) => {
          // Konvertiere Mausposition in Kartenkoordinaten
          const point = new DOMPoint(event.clientX, event.clientY);
          const coordinate = map.convertPointOnPageToCoordinate(point);

          if (event.altKey) {
            if (previewCircle4) {
              previewCircle4.coordinate = coordinate;
            } else {
              const radiusInMeters = 1000000;
              previewCircle4 = new window.mapkit.CircleOverlay(
                coordinate,
                radiusInMeters,
                {
                  fillColor: "#0000FF22", // Transparente Füllfarbe
                  strokeColor: "#0000FF", // Linienfarbe
                  lineWidth: 2, // Breite der Linie
                }
              );
              map.addOverlay(previewCircle4);
            }
          } else {
            if (previewCircle4) {
              map.removeOverlay(previewCircle4);
              previewCircle4 = null;
            }
          }

          if (event.shiftKey) {
            if (previewCircle3) {
              previewCircle3.coordinate = coordinate;
            } else {
              const radiusInMeters = 2000000;
              previewCircle3 = new window.mapkit.CircleOverlay(
                coordinate,
                radiusInMeters,
                {
                  fillColor: "#0000FF22", // Transparente Füllfarbe
                  strokeColor: "#0000FF", // Linienfarbe
                  lineWidth: 2, // Breite der Linie
                }
              );
              map.addOverlay(previewCircle3);
            }
          } else {
            if (previewCircle3) {
              map.removeOverlay(previewCircle3);
              previewCircle3 = null;
            }
          }
        });

      // Mouse Leave Event, um den Kreis zu entfernen, wenn die Maus die Karte verlässt
      map.element.addEventListener("mouseleave", () => {
        if (previewCircle) {
          map.removeOverlay(previewCircle);
          previewCircle = null;
        }
      });

      // Setting properties on creation:
      /*var sfoAnnotation = new MarkerAnnotation(sfo, {
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
      workAnnotation.color = "#000000";
      workAnnotation.title = "Work";
      workAnnotation.subtitle = "Apple Park";
      // workAnnotation.selected = "true";
      workAnnotation.glyphText = "☠️";

      map.showItems([sfoAnnotation, workAnnotation, an2]);
*/
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
          const number = geoJSON.properties.number;

          overlay.data = {
            name: geoJSON.properties.name,
            number: geoJSON.properties.number,
          };

          // Find the right color for the population and the set the style.
          for (var i = 0; i < MAP_COLORS.length; ++i) {
            if (number < MAP_COLORS[i].num) {
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

      //Coming in an update :)
      /*var mapLegend = document.querySelector(".map-legend");

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

      addLegend();*/

      window.mapkit.importGeoJSON(
        "https://alex.polan.sk/pirates-simulator/countries.php",
        geoJSONParserDelegate
      );

      //const list = [];

      map.element.addEventListener("click", (event) => {
        if (!event.shiftKey && !event.altKey) {
          return;

          //Use this script if you want to create a lsit with coordinates where gold should spawn
          /*          console.log(coordinate);
          list.push({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
          });
          console.log(list);
          localStorage.setItem("list", JSON.stringify(list));*/
        }

        let coordinate = map.convertPointOnPageToCoordinate(
          new DOMPoint(event.pageX, event.pageY)
        );

        if (
          event.altKey &&
          (!localStorage.getItem("shipCount") ||
            parseInt(localStorage.getItem("shipCount")) < 3)
        ) {
          clickAnnotation = new MarkerAnnotation(coordinate, {
            title: this.generatePirateShipName(),
            color: "#160808",
            glyphText: "⚓️",
          });
          map.addAnnotation(clickAnnotation);

          const radiusInMeters = 1000000; // Radius in meters
          const circle = new window.mapkit.CircleOverlay(
            coordinate,
            radiusInMeters,
            {
              fillColor: "#0000FF22", // Transparente Füllfarbe
              strokeColor: "#0000FF", // Linienfarbe
              lineWidth: 2, // Breite der Linie
            }
          );

          map.addOverlay(circle);

          if (localStorage.getItem("shipCount")) {
            const newShipCount =
              parseInt(localStorage.getItem("shipCount")) + 1;
            localStorage.setItem("shipCount", newShipCount);
          } else {
            localStorage.setItem("shipCount", 1);
          }
        }

        if (event.shiftKey) {
          if (!this.blockNewCities) {
            let city_name = prompt(
              "Ahoi! Please enter the name of your new city:"
            );

            let json = {
              coordinate: coordinate,
              name: city_name,
              verification_id: verificationId,
            };

            //console.log(json);
            localStorage.setItem("base", JSON.stringify(json));

            axios
              .post("https://alex.polan.sk/pirates-simulator/base.php", json)
              .then((response) => {
                if (response.data.success) {
                  //status === "success"
                  console.log("Base created successfully");

                  clickAnnotation = new MarkerAnnotation(coordinate, {
                    title: city_name,
                    color: "#000000",
                    glyphText: "☠️",
                  });
                  map.addAnnotation(clickAnnotation);

                  const radiusInMeters = 2000000; // Radius in Metern
                  const circle = new window.mapkit.CircleOverlay(
                    coordinate,
                    radiusInMeters,
                    {
                      fillColor: "#0000FF22", // Transparente Füllfarbe
                      strokeColor: "#0000FF", // Linienfarbe
                      lineWidth: 2, // Breite der Linie
                    }
                  );

                  map.addOverlay(circle);

                  this.hint =
                    "Place your ships by holding the alt key and klick anywhere on the sea. (3 ships)";
                  console.log(this.hint);
                  this.blockNewCities = true;
                } else {
                  console.error("Error creating base:", response.data.message);
                }
              })
              .catch((error) => {
                console.error("Error creating base:", error);
              });
          } else {
            this.hint = "You can only create one city!";
          }
        }
      });
      this.spawnGoldAnnotations(map);
      setInterval(() => {
        this.checkForGold(map);
      }, 150); // Check for gold every 1.5 seconds
    },
    spawnGoldAnnotations(map) {
      const MarkerAnnotation = window.mapkit.MarkerAnnotation;
      setInterval(() => {
        const randomIndex = Math.floor(Math.random() * goldCoordinates.length);
        const coordinate = goldCoordinates[randomIndex];
        const annotation = new MarkerAnnotation(
          new window.mapkit.Coordinate(
            coordinate.latitude,
            coordinate.longitude
          ),
          {
            title: "Gold",
            color: "#FFD700",
            glyphText: "💰",
          }
        );
        map.addAnnotation(annotation);
        setTimeout(() => {
          map.removeAnnotation(annotation);
        }, 30000);
      }, 1500);
    },
    checkForGold(map) {
      //   console.log(1);
      // const radius = 0.01; // Define the radius within which to check for gold (in degrees)
      const goldAnnotations = map.annotations.filter(
        (annotation) => annotation.title === "Gold"
      );
      console.log(goldAnnotations.length);

      /* this.ships.forEach(ship => {
        goldAnnotations.forEach(gold => {
          if (this.isWithinRadius(ship.coordinate, gold.coordinate, radius)) {
            console.log("Gold!");
          }
        });
      });
*/
      const radius = 2000; // Define the radius within which to check for gold (in kilometers)
      //this.cities.forEach((city) => {

      if (localStorage.getItem("base") && localStorage.getItem("base") != "") {
        const base = JSON.parse(localStorage.getItem("base"));
        //  console.log(base);
        if (base.coordinate) {
          goldAnnotations.forEach((gold) => {
            console.log(
              this.isWithinRadius(base.coordinate, gold.coordinate, radius)
            );
            if (this.isWithinRadius(base.coordinate, gold.coordinate, radius)) {
              console.log("Gold!");
              this.addMoney(100);
              map.removeAnnotation(gold);
            }
          });
        }
      }

      // });
    },
    isWithinRadius(coord1, coord2, radius) {
      const R = 6371; // Radius of the Earth in kilometers
      const dLat = this.deg2rad(coord2.latitude - coord1.latitude);
      const dLon = this.deg2rad(coord2.longitude - coord1.longitude);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(coord1.latitude)) *
          Math.cos(this.deg2rad(coord2.latitude)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in kilometers
      return distance <= radius;
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },
    addMoney(count) {
      const verificationId = localStorage.getItem("verification_id");
      if (!verificationId) {
        console.error("Verification ID is missing");
        return;
      }

      let newCoinCount;
      if (
        localStorage.getItem("goldCoins") &&
        localStorage.getItem("goldCoins") !== ""
      ) {
        const coins = parseInt(localStorage.getItem("goldCoins"));
        newCoinCount = coins + count;
      } else {
        newCoinCount = count;
      }

      localStorage.setItem("goldCoins", newCoinCount);
      eventBus.emit("updateGoldCoins");

      // Send the new coin count to the backend
      this.$axios
        .post("coins.php", {
          verification_id: verificationId,
          amount: newCoinCount,
        })
        .then((response) => {
          if (response.data.success) {
            console.log("Coins updated successfully");
          } else {
            console.error("Error updating coins:", response.data.error);
          }
        })
        .catch((error) => {
          console.error("Error updating coins:", error);
        });
    },
  },
};

/*
Show Radius.

// Erstelle die Annotation
const annotationCoordinate = new mapkit.Coordinate(47.3769, 8.5417);
const annotation = new mapkit.MarkerAnnotation(annotationCoordinate, {
  title: "Marker",
  color: "#FF0000"
});

// Füge die Annotation zur Karte hinzu
map.addAnnotation(annotation);

// Erstelle einen Kreis mit einem Radius (z. B. 1000 Meter)
const radiusInMeters = 1000; // Radius in Metern
const circle = new mapkit.CircleOverlay(annotationCoordinate, radiusInMeters, {
  fillColor: "#0000FF22", // Transparente Füllfarbe
  strokeColor: "#0000FF", // Linienfarbe
  lineWidth: 2,           // Breite der Linie
});

// Füge den Kreis zur Karte hinzu
map.addOverlay(circle);


*/
</script>

<style>
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
  font-family: ui-sans-serif, system-ui, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  cursor: pointer;
}

.container .map-legend {
  position: absolute;
  z-index: 1005;
  top: 5px;
  left: 3px;
}

.map-legend div {
  margin-bottom: 5px;
  width: 70px;
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
  margin: 15px 0 5px 0;
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

.live-chat2 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 500px;
  height: 300px;
  overflow: hidden;
}

.coin-count-container {
  position: absolute;
  top: 8px;
  right: 6px;
  z-index: 1010;
}

.new-ship-container {
  position: absolute;
  top: 8px;
  left: 6px;
  z-index: 1010;
}
</style>
