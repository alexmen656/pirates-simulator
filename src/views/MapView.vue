<template>
  <div class="container">
    <header class="app-header">
      <h1>{{ $t("title") }}</h1>
      <!-- <p class="app-description">
            {{ $t("description") }}
          </p>-->
      <TopHint v-if="hint" :hint="'...' + hint" />
    </header>
    <div id="map" style="width: 100%; height: 100vh"></div>
    <RankList class="rang-list" />
    <!--<div class="map-legend"></div>-->
    <LiveChat class="live-chat2" />
    <!--  <BottomHint :hint="hint" />-->
    <CoinCount class="coin-count-container" />
    <NewShip class="new-ship-container" />
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h2>{{ $t("statistics") }}</h2>
        <div>
          <p v-if="bases[0]?.name">{{ $t("base") }}: {{ bases[0].name }}</p>
          <p>{{ $t("ship_count") }}: {{ shipCount }}</p>
        </div>
        <h2>{{ $t("global") }}</h2>
        <div>
          <p v-if="allBases?.length">
            {{ $t("total_bases") }}: {{ allBases.length }}
          </p>
        </div>
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import RankList from "@/components/RankList.vue";
import LiveChat from "@/components/LiveChat.vue";
//import BottomHint from "@/components/BottomHint.vue";
import TopHint from "@/components/TopHint.vue";
import CoinCount from "@/components/CoinCount.vue";
import NewShip from "@/components/NewShip.vue";
import goldCoordinates from "@/data/gold.json";
import {
  getShipCount,
  calculateShipPrice,
  updateShipPrice,
  addShip,
} from "@/shipLogic";
import { addBase } from "@/baseLogic";
import { eventBus } from "@/eventBus";
import { getCoinCount, addCoins, subtractCoins } from "@/coinLogic";
import JSConfetti from "js-confetti";
//import axios from "axios";
//import { eventBus } from "@/eventBus";

export default {
  name: "App",
  components: {
    RankList,
    LiveChat,
    //  BottomHint,
    TopHint,
    CoinCount,
    NewShip,
  },
  data() {
    return {
      //    hint: "New hints coming"
      hint: "",
      blockNewCities: false,
      allBases: [],
      showModal: false,
      shipCount: 0,
    };
  },
  async mounted() {
    await getCoinCount();
    await this.loadAllBases();

    if (localStorage.getItem("language") === null) {
      localStorage.setItem("language", "en");
    }
    this.$i18n.locale = localStorage.getItem("language");
    this.initMap();

    eventBus.on("shipsUpdated", await this.updateShips);
    eventBus.on("baseUpdated", await this.updateBase);
    eventBus.on("openStatistics", () => {
      this.showModal = true;
    });
  },
  async beforeUnmount() {
    eventBus.off("shipsUpdated", await this.updateShips);
    eventBus.off("baseUpdated", await this.updateBase);
    eventBus.off("openStatistics", () => {
      this.showModal = true;
    });
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    async updateBase() {
      const verificationId = localStorage.getItem("verification_id");
      if (!verificationId) {
        this.$router.push("/");
        return;
      }
      const response = await this.$axios.get("base.php", {
        params: { verification_id: verificationId },
      });

      if (response.data.error) {
        console.error(response.data.error);
        this.$router.push("/");
        return;
      }

      this.bases = response.data;
    },

    async updateShips() {
      const verificationId = localStorage.getItem("verification_id");
      if (!verificationId) {
        this.$router.push("/");
        return;
      }
      const ships_response = await this.$axios.get("ships.php", {
        params: { verification_id: verificationId },
      });

      if (ships_response.data.error) {
        console.error(ships_response.data.error);
        this.$router.push("/");
        return;
      }

      this.ships = ships_response.data;
      this.shipCount = this.ships.length;
    },
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
        "Cutlass",
        "Corsair",
        "Buccaneer",
        "Marauder",
        "Scallywag",
        "Plunderer",
        "Sea Rover",
        "Pirate's Pride",
        "Neptune's Fury",
        "Poseidon's Wrath",
        "Kraken's Bane",
        "Mermaid's Song",
        "Davy Jones",
        "Blackbeard's Revenge",
        "Calypso's Curse",
        "Siren's Call",
        "Ghost Ship",
        "Stormbringer",
        "Wave Rider",
        "Ocean's Wrath",
        "Tidal Wave",
        "Sea Phantom",
        "Leviathan",
        "Poseidon's Trident",
        "Neptune's Spear",
        "Sea Dragon",
        "Ocean's Fury",
        "Pirate's Plunder",
        "Captain's Pride",
        "Sailor's Delight",
        "Treasure Hunter",
        "Sea Hawk",
        "Ocean Raider",
        "Storm Chaser",
        "Wind Rider",
        "Sea Breeze",
        "Ocean's Edge",
        "Wave Breaker",
        "Sea Witch",
        "Black Widow",
        "Crimson Tide",
        "Silver Shark",
        "Golden Treasure",
        "Emerald Envy",
        "Ruby Raider",
        "Sapphire Storm",
        "Diamond Dagger",
        "Pearl Pirate",
        "Ivory Invader",
        "Obsidian Outlaw",
        "Coral Corsair",
        "Amber Assassin",
        "Topaz Terror",
        "Garnet Ghost",
        "Onyx Overlord",
        "Jade Jolly",
        "Turquoise Tempest",
        "Aquamarine Avenger",
        "Moonstone Marauder",
        "Sunstone Scourge",
        "Meteorite Marauder",
        "Starlight Stealer",
        "Galactic Ghost",
        "Cosmic Corsair",
        "Nebula Navigator",
        "Asteroid Avenger",
        "Comet Chaser",
        "Solar Sailor",
        "Lunar Looter",
        "Celestial Scourge",
        "Eclipse Enforcer",
        "Galaxy Guardian",
        "Starship Stealer",
        "Planet Plunderer",
        "Astro Assassin",
        "Space Scallywag",
        "Rocket Raider",
        "Alien Avenger",
        "Martian Marauder",
        "Venusian Vandal",
        "Jovian Jolly",
        "Saturnian Scourge",
        "Uranian Usurper",
        "Neptunian Navigator",
        "Plutonian Pirate",
        "Solar System Scourge",
        "Interstellar Invader",
        "Milky Way Marauder",
        "Andromeda Avenger",
        "Black Hole Buccaneer",
        "Quasar Quester",
        "Pulsar Plunderer",
        "Supernova Stealer",
        "Dark Matter Marauder",
        "Event Horizon Enforcer",
        "Singularity Scourge",
        "Wormhole Warrior",
        "Time Traveler",
        "Dimension Drifter",
        "Parallel Pirate",
        "Quantum Quester",
        "Multiverse Marauder",
        "Infinity Invader",
        "Eternal Explorer",
        "Timeless Terror",
        "Chrono Corsair",
        "Temporal Tempest",
        "Epoch Enforcer",
        "Era Eradicator",
        "Millennium Marauder",
        "Century Corsair",
        "Decade Destroyer",
        "Yearling Yachter",
        "Monthly Marauder",
        "Weekly Wrecker",
        "Daily Destroyer",
        "Hourly Hunter",
        "Minute Marauder",
        "Second Stealer",
        "Moment Marauder",
        "Instant Invader",
        "Flash Fighter",
        "Blink Buccaneer",
        "Glimpse Ghost",
        "Spark Scourge",
        "Flicker Fighter",
        "Twinkle Terror",
        "Shimmer Stealer",
        "Gleam Ghost",
        "Glow Guardian",
        "Radiance Raider",
        "Luminous Looter",
        "Bright Buccaneer",
        "Shine Stealer",
        "Glitter Ghost",
        "Sparkle Scourge",
        "Dazzle Destroyer",
        "Flashy Fighter",
        "Brilliant Buccaneer",
        "Vivid Vandal",
        "Colorful Corsair",
        "Rainbow Raider",
        "Spectrum Stealer",
        "Prism Pirate",
        "Hue Hunter",
        "Tint Terror",
        "Shade Scourge",
        "Tone Tempest",
        "Pigment Plunderer",
        "Chromatic Corsair",
        "Iridescent Invader",
        "Opalescent Outlaw",
        "Pearlescent Pirate",
        "Lustrous Looter",
        "Shiny Scourge",
        "Glossy Ghost",
        "Polished Pirate",
        "Sleek Stealer",
        "Smooth Scourge",
        "Silky Scourge",
        "Velvet Vandal",
        "Plush Pirate",
        "Soft Scourge",
        "Cushion Corsair",
        "Pillow Plunderer",
        "Feather Fighter",
        "Downy Destroyer",
        "Fluffy Fighter",
        "Furry Fighter",
        "Hairy Hunter",
        "Woolly Warrior",
        "Fuzzy Fighter",
        "Cozy Corsair",
        "Warm Warrior",
        "Snug Scourge",
        "Comfy Corsair",
        "Relaxed Raider",
        "Chill Corsair",
        "Cool Corsair",
        "Calm Corsair",
        "Peaceful Pirate",
        "Serene Scourge",
        "Tranquil Tempest",
        "Quiet Quester",
        "Silent Stealer",
        "Still Scourge",
        "Motionless Marauder",
        "Frozen Fighter",
        "Icy Invader",
        "Chilly Corsair",
        "Cold Corsair",
        "Frosty Fighter",
        "Snowy Scourge",
        "Winter Warrior",
        "Arctic Avenger",
        "Polar Pirate",
        "Glacial Ghost",
        "Iceberg Invader",
        "Blizzard Buccaneer",
        "Snowstorm Scourge",
        "Avalanche Avenger",
        "Frostbite Fighter",
        "Icicle Invader",
        "Snowflake Stealer",
      ];
      const randomIndex = Math.floor(Math.random() * names.length);
      return names[randomIndex];
    },

    async loadAllBases() {
      const verificationId = localStorage.getItem("verification_id");
      if (!verificationId) {
        this.$router.push("/");
        return;
      }
      const response = await this.$axios.get("base.php", {
        params: { getAllBases: true, verification_id: verificationId },
      });

      if (response.data.error) {
        console.error(response.data.error);
        return;
      }

      this.allBases = response.data.bases;
    },

    async initMap() {
      const baseRadiusStrokeOpacity = 1;
      const baseRadiusLineWidth = 1;
      const baseRadiusStrokeColor = "#0000FF";
      const baseRadiusFillColor = "#0000FF";
      const baseRadiusFillOpacity = 0.25;
      const shipRadiusStrokeOpacity = 1;
      const shipRadiusLineWidth = 2;
      const shipRadiusStrokeColor = "#008000"; // replace toxic green(#00FF00) with normal green
      const shipRadiusFillColor = "#008000"; // replace toxic green(#00FF00) with normal green
      const shipRadiusFillOpacity = 0.35;

      const baseStyle = new window.mapkit.Style({
        fillColor: baseRadiusFillColor,
        fillOpacity: baseRadiusFillOpacity,
        strokeColor: baseRadiusStrokeColor,
        strokeOpacity: baseRadiusStrokeOpacity,
        lineWidth: baseRadiusLineWidth,
      });

      const shipStyle = new window.mapkit.Style({
        fillColor: shipRadiusFillColor,
        fillOpacity: shipRadiusFillOpacity,
        strokeColor: shipRadiusStrokeColor,
        strokeOpacity: shipRadiusStrokeOpacity,
        lineWidth: shipRadiusLineWidth,
      });

      var MarkerAnnotation = window.mapkit.MarkerAnnotation,
        clickAnnotation,
        shipAnnotation;
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
      let previewCircle5 = null;

      const verificationId = localStorage.getItem("verification_id");
      if (!verificationId) {
        this.$router.push("/");
        return;
      }

      console.log(this.allBases);
      if (this.allBases) {
        this.allBases.forEach((base) => {
          console.log(base.name);
          const coordinate = new window.mapkit.Coordinate(
            Number(base.coordinate_x),
            Number(base.coordinate_y)
          );
          const annotation = new window.mapkit.MarkerAnnotation(coordinate);
          annotation.title = base.name;
          annotation.subtitle = base.user_name + "'s base";
          annotation.color = "#808080";
          annotation.glyphText = "☠️";

          map.addAnnotation(annotation);
        });
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
        if (this.bases.length > 0) {
          this.blockNewCities = true;
        } else {
          this.hint =
            "Place your base by holding Shift and then clicking anywhere."; //on the land.";
        }
        this.bases.forEach((base) => {
          const coordinate = new window.mapkit.Coordinate(
            Number(base.coordinate_x),
            Number(base.coordinate_y)
          );
          const annotation = new window.mapkit.MarkerAnnotation(coordinate, {
            title: base.name,
            color: "#160808",
            glyphText: "☠️",
          });
          map.addAnnotation(annotation);
          const radiusInMeters = 2000000; // Beispielradius
          previewCircle2 = new window.mapkit.CircleOverlay(
            coordinate,
            radiusInMeters
          );
          previewCircle2.style = baseStyle;
          map.addOverlay(previewCircle2);

          // this.cities.push(annotation);
        });

        //shipsUpdated;

        const ships_response = await this.$axios.get("ships.php", {
          params: { verification_id: verificationId },
        });

        if (ships_response.data.error) {
          console.error(ships_response.data.error);
          this.$router.push("/");
          return;
        }

        this.ships = ships_response.data;
        this.shipCount = this.ships.length;

        if (this.ships.length == 0 && this.blockNewCities) {
          this.hint =
            "Place your ships by holding the alt key and klick anywhere. (2 ships)"; // on the sea
        }

        this.ships.forEach((ship) => {
          const coordinate = new window.mapkit.Coordinate(
            Number(ship.coordinate_x),
            Number(ship.coordinate_y)
          );
          const annotation = new window.mapkit.MarkerAnnotation(coordinate, {
            title: ship.name,
            color: "#160808",
            glyphText: "⚓️",
          });
          map.addAnnotation(annotation);
          const radiusInMeters = 1000000; // Beispielradius
          previewCircle5 = new window.mapkit.CircleOverlay(
            coordinate,
            radiusInMeters
          );
          previewCircle5.style = shipStyle;
          map.addOverlay(previewCircle5);

          // this.cities.push(annotation);
        });
      } catch (error) {
        console.error("Error fetching bases:", error);
        //this.$router.push("/");
        return;
      }

      /* document.querySelector(".mk-map-view").addEventListener("keydown", (event) => {
        if (event.altKey) {
          alert
        }
    });*/

      document
        .querySelector(".mk-map-view")
        .addEventListener("mousemove", (event) => {
          const point = new DOMPoint(event.clientX, event.clientY);
          const coordinate = map.convertPointOnPageToCoordinate(point);

          if (event.altKey) {
            if (previewCircle4) {
              previewCircle4.coordinate = coordinate;
            } else {
              const radiusInMeters = 1000000;
              previewCircle4 = new window.mapkit.CircleOverlay(
                coordinate,
                radiusInMeters
              );
              previewCircle4.style = shipStyle;

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
                radiusInMeters
              );

              previewCircle3.style = baseStyle;
              map.addOverlay(previewCircle3);
            }
          } else {
            if (previewCircle3) {
              map.removeOverlay(previewCircle3);
              previewCircle3 = null;
            }
          }
        });

      map.element.addEventListener("mouseleave", () => {
        if (previewCircle) {
          map.removeOverlay(previewCircle);
          previewCircle = null;
        }

        if (previewCircle3) {
          map.removeOverlay(previewCircle3);
          previewCircle3 = null;
        }

        if (previewCircle4) {
          map.removeOverlay(previewCircle4);
          previewCircle4 = null;
        }
      });

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

      window.mapkit.importGeoJSON(
        "https://alex.polan.sk/pirates-simulator/countries.php",
        geoJSONParserDelegate
      );

      //const list = [];

      map.element.addEventListener("click", async (event) => {
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
          event.altKey /*&&
         (!localStorage.getItem("shipCount") ||
            parseInt(localStorage.getItem("shipCount")) < 3)*/
        ) {
          const shipCount = await getShipCount();
          const shipPrice = calculateShipPrice(shipCount);

          if ((await getCoinCount()) >= shipPrice) {
            const ship_name = this.generatePirateShipName();
            const json = {
              coordinate: coordinate,
              name: ship_name,
              verification_id: verificationId,
            };

            const res = await addShip(json);
            if (res) {
              shipAnnotation = new MarkerAnnotation(coordinate, {
                title: ship_name,
                color: "#160808",
                glyphText: "⚓️",
              });
              map.addAnnotation(shipAnnotation);
              this.drawRadius(
                map,
                coordinate,
                1000000,
                /*  baseRadiusStrokeColor,
                    baseRadiusStrokeOpacity,
                    baseRadiusFillColor,
                    baseRadiusFillOpacity,
                    baseRadiusLineWidth*/
                shipStyle
              );

              await subtractCoins(shipPrice, "NewShip");
              await updateShipPrice();
              if (this.ships.length == 2) {
                this.hint = "Now you are ready to go! GLHF!";
                setTimeout(() => {
                  this.hint = "";
                }, 10000);
              } else if (this.ships.length == 1) {
                this.hint =
                  "Place your ships by holding the alt key and klick anywhere. (1 ship)"; // on the sea.
              }

              if (localStorage.getItem("shipCount")) {
                const newShipCount =
                  parseInt(localStorage.getItem("shipCount")) + 1;
                localStorage.setItem("shipCount", newShipCount);
              } else {
                localStorage.setItem("shipCount", 1);
              }
            }
          } else {
            const old_hint = this.hint;
            this.hint = `You need at least ${shipPrice.toLocaleString()} coins to place a ship!`;
            setTimeout(() => {
              this.hint = old_hint;
            }, 5000);
          }
        }

        if (event.shiftKey) {
          if (!this.blockNewCities) {
            let city_name = prompt(
              "Ahoi! Please enter the name of your new city:"
            );

            const json = {
              coordinate: coordinate,
              name: city_name,
              verification_id: verificationId,
            };

            //console.log(json);
            localStorage.setItem("base", JSON.stringify(json));

            const res = await addBase(json);
            if (res) {
              //axios
              //    .post("https://alex.polan.sk/pirates-simulator/base.php", json)
              //      .then((response) => {
              //   if (response.data.success) {
              //      console.log("Base created successfully");

              clickAnnotation = new MarkerAnnotation(coordinate, {
                title: city_name,
                color: "#000000",
                glyphText: "☠️",
              });
              map.addAnnotation(clickAnnotation);
              //this.drawRadius(map, coordinate, 2000000, 3);
              this.drawRadius(
                map,
                coordinate,
                2000000,
                /*  baseRadiusStrokeColor,
                    baseRadiusStrokeOpacity,
                    baseRadiusFillColor,
                    baseRadiusFillOpacity,
                    baseRadiusLineWidth*/
                baseStyle
              );

              this.hint =
                "Great your base was build! Place your ships by holding the alt key and klick anywhere. (2 ships)"; // on the sea
              console.log(this.hint);
              this.blockNewCities = true;
            } /*else {
                  console.error("Error creating base:", response.data.message);
                }*/
            /* })
              .catch((error) => {
                console.error("Error creating base:", error);
              });*/
          } else {
            const old_hint = this.hint;
            this.hint = "You can only create one base!";
            setTimeout(() => {
              this.hint = old_hint;
            }, 5000);
          }
        }
      });
      this.spawnGoldAnnotations(map);
      setInterval(() => {
        this.checkForGold(map);
        this.checkForDiamonds(map);
        this.checkForStones(map);
        this.checkForRubys(map);
        this.checkForEmeralds(map);
      }, 150);
    },
    drawRadius(
      map,
      coordinate,
      radius,
      /*strokeColor,
      strokeOpacity,
      fillColor,
      fillOpacity,
      lineWidth = 2*/
      style
    ) {
      const circle = new window.mapkit.CircleOverlay(
        coordinate,
        radius /*{
        fillColor: fillColor,
        fillOpacity: fillOpacity,
        strokeColor: strokeColor,
        strokeOpacity: strokeOpacity,
        lineWidth: lineWidth,
      }*/
      );
      circle.style = style;
      map.addOverlay(circle);
    },
    spawnGoldAnnotations(map) {
      const MarkerAnnotation = window.mapkit.MarkerAnnotation;

      setInterval(() => {
        const randomIndex = Math.floor(Math.random() * goldCoordinates.length);
        const coordinate = goldCoordinates[randomIndex];

        // Zufällige Werte für die Ressourcen festlegen
        const randomValue = Math.random();
        //let resourceType;
        let options;

        if (randomValue < 1 / 100) {
          // 1 in 100 Chance für Rubine
          //resourceType = "Ruby";
          options = {
            title: "Ruby",
            color: "#FF0000", // Rot
            glyphText: "♦️",
          };
        } else if (randomValue < 4 / 100) {
          // 1 in 100 Chance für Smaragde
          // resourceType = "Emerald";
          options = {
            title: "Emerald",
            color: "#00FF00", // Grün
            glyphText: "🟢",
          };
        } else if (randomValue < 20 / 100) {
          // 5 in 100 Chance für Diamanten
          //resourceType = "Diamond";
          options = {
            title: "Diamond",
            color: "#00FFFF", // Cyan
            glyphText: "💎", // Diamant-Symbol
          };
        } else if (randomValue < 50 / 100) {
          // 10 in 100 Chance für Steine
          //resourceType = "Stone";
          options = {
            title: "Stone",
            color: "#808080", // Grau
            glyphText: "🪨", // Stein-Symbol
          };
        } else {
          // Rest ist Gold (83%)
          //resourceType = "Gold";
          options = {
            title: "Gold",
            color: "#FFD700", // Gold
            glyphText: "⭐️", // Stern für Gold
          };
        }

        // Annotation erstellen und zur Karte hinzufügen
        const annotation = new MarkerAnnotation(
          new window.mapkit.Coordinate(
            coordinate.latitude,
            coordinate.longitude
          ),
          options
        );

        map.addAnnotation(annotation);

        // Annotation nach 30 Sekunden entfernen
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

      this.ships.forEach((ship) => {
        if (ship.coordinate_y && ship.coordinate_y) {
          //base.coordinate
          ship.coordinate = new window.mapkit.Coordinate(
            Number(ship.coordinate_x),
            Number(ship.coordinate_y)
          );
          goldAnnotations.forEach(async (gold) => {
            if (this.isWithinRadius(ship.coordinate, gold.coordinate, 1000)) {
              console.log("Gold!");
              await addCoins(100, "Gold");

              //check
              //gold.color = "#b39700";
              const MarkerAnnotation = window.mapkit.MarkerAnnotation;
              //alert(gold.coordinate);
              const new_gold = new MarkerAnnotation(gold.coordinate, {
                title: "New Gold",
                color: "#b39700",
                glyphText: "⭐️", //💰
              });
              map.addAnnotation(new_gold);
              map.removeAnnotation(gold);
              setTimeout(() => {
                map.removeAnnotation(new_gold);
              }, 3000);
            }
          });
        }
      });

      if (this.bases) {
        //localStorage.getItem("base") && localStorage.getItem("base") != ""
        //const base = this.bases[0]; //JSON.parse(localStorage.getItem("base"))
        //  console.log(base);

        this.bases.forEach((base) => {
          if (base.coordinate_y && base.coordinate_y) {
            //base.coordinate
            base.coordinate = new window.mapkit.Coordinate(
              Number(base.coordinate_x),
              Number(base.coordinate_y)
            );
            goldAnnotations.forEach(async (gold) => {
              console.log(
                this.isWithinRadius(base.coordinate, gold.coordinate, 2000)
              );
              if (this.isWithinRadius(base.coordinate, gold.coordinate, 2000)) {
                console.log("Gold!");
                await addCoins(100, "Gold");

                //check
                //gold.color = "#b39700";
                const MarkerAnnotation = window.mapkit.MarkerAnnotation;
                const new_gold = new MarkerAnnotation(gold.coordinate, {
                  title: "New Gold",
                  color: "#b39700",
                  glyphText: "⭐️", //💰
                });
                map.addAnnotation(new_gold);
                map.removeAnnotation(gold);
                setTimeout(() => {
                  map.removeAnnotation(new_gold);
                }, 3000);
              }
            });
          }
        });
      }
    },

    checkForDiamonds(map) {
      //   console.log(1);
      // const radius = 0.01; // Define the radius within which to check for gold (in degrees)
      const goldAnnotations = map.annotations.filter(
        (annotation) => annotation.title === "Diamond"
      );
      console.log(goldAnnotations.length);

      this.ships.forEach((ship) => {
        if (ship.coordinate_y && ship.coordinate_y) {
          //base.coordinate
          ship.coordinate = new window.mapkit.Coordinate(
            Number(ship.coordinate_x),
            Number(ship.coordinate_y)
          );
          goldAnnotations.forEach(async (gold) => {
            if (this.isWithinRadius(ship.coordinate, gold.coordinate, 1000)) {
              console.log("Diamond!");
              await addCoins(300, "Diamond");

              //check
              //gold.color = "#b39700";
              const MarkerAnnotation = window.mapkit.MarkerAnnotation;
              //alert(gold.coordinate);
              const new_diamond = new MarkerAnnotation(gold.coordinate, {
                title: "New Diamond",
                color: "#00b3b3",
                glyphText: "💎",
              });
              map.addAnnotation(new_diamond);
              map.removeAnnotation(gold);
              setTimeout(() => {
                map.removeAnnotation(new_diamond);
              }, 3000);
            }
          });
        }
      });

      if (this.bases) {
        //localStorage.getItem("base") && localStorage.getItem("base") != ""
        //const base = this.bases[0]; //JSON.parse(localStorage.getItem("base"))
        //  console.log(base);

        this.bases.forEach((base) => {
          if (base.coordinate_y && base.coordinate_y) {
            //base.coordinate
            base.coordinate = new window.mapkit.Coordinate(
              Number(base.coordinate_x),
              Number(base.coordinate_y)
            );
            goldAnnotations.forEach(async (gold) => {
              console.log(
                this.isWithinRadius(base.coordinate, gold.coordinate, 2000)
              );
              if (this.isWithinRadius(base.coordinate, gold.coordinate, 2000)) {
                console.log("Diamond!");
                await addCoins(300, "Diamond");
                //check
                //gold.color = "#b39700";
                const MarkerAnnotation = window.mapkit.MarkerAnnotation;
                const new_diamond = new MarkerAnnotation(gold.coordinate, {
                  title: "New Diamond",
                  color: "#00b3b3",
                  glyphText: "💎",
                });
                map.addAnnotation(new_diamond);
                map.removeAnnotation(gold);
                setTimeout(() => {
                  map.removeAnnotation(new_diamond);
                }, 3000);
              }
            });
          }
        });
      }
    },

    checkForStones(map) {
      const goldAnnotations = map.annotations.filter(
        (annotation) => annotation.title === "Stone"
      );

      this.ships.forEach((ship) => {
        if (ship.coordinate_y && ship.coordinate_y) {
          ship.coordinate = new window.mapkit.Coordinate(
            Number(ship.coordinate_x),
            Number(ship.coordinate_y)
          );
          goldAnnotations.forEach(async (gold) => {
            if (this.isWithinRadius(ship.coordinate, gold.coordinate, 1000)) {
              await addCoins(20, "Stone");

              const MarkerAnnotation = window.mapkit.MarkerAnnotation;
              const new_diamond = new MarkerAnnotation(gold.coordinate, {
                title: "New Stone",
                color: "#5a5a5a",
                glyphText: "🪨",
              });
              map.addAnnotation(new_diamond);
              map.removeAnnotation(gold);
              setTimeout(() => {
                map.removeAnnotation(new_diamond);
              }, 3000);
            }
          });
        }
      });

      if (this.bases) {
        this.bases.forEach((base) => {
          if (base.coordinate_y && base.coordinate_y) {
            base.coordinate = new window.mapkit.Coordinate(
              Number(base.coordinate_x),
              Number(base.coordinate_y)
            );
            goldAnnotations.forEach(async (gold) => {
              if (this.isWithinRadius(base.coordinate, gold.coordinate, 2000)) {
                await addCoins(20, "Stone");
                const MarkerAnnotation = window.mapkit.MarkerAnnotation;
                const new_diamond = new MarkerAnnotation(gold.coordinate, {
                  title: "New Stone",
                  color: "#5a5a5a",
                  glyphText: "🪨",
                });
                map.addAnnotation(new_diamond);
                map.removeAnnotation(gold);
                setTimeout(() => {
                  map.removeAnnotation(new_diamond);
                }, 3000);
              }
            });
          }
        });
      }
    },

    checkForEmeralds(map) {
      const goldAnnotations = map.annotations.filter(
        (annotation) => annotation.title === "Emerald"
      );

      this.ships.forEach((ship) => {
        if (ship.coordinate_y && ship.coordinate_y) {
          ship.coordinate = new window.mapkit.Coordinate(
            Number(ship.coordinate_x),
            Number(ship.coordinate_y)
          );
          goldAnnotations.forEach(async (gold) => {
            if (this.isWithinRadius(ship.coordinate, gold.coordinate, 1000)) {
              await addCoins(700, "Emerald");

              const MarkerAnnotation = window.mapkit.MarkerAnnotation;
              const new_diamond = new MarkerAnnotation(gold.coordinate, {
                title: "New Emerald",
                color: "#00b300",
                glyphText: "🟢",
              });
              map.addAnnotation(new_diamond);
              map.removeAnnotation(gold);
              setTimeout(() => {
                map.removeAnnotation(new_diamond);
              }, 3000);
            }
          });
        }
      });

      if (this.bases) {
        this.bases.forEach((base) => {
          if (base.coordinate_y && base.coordinate_y) {
            base.coordinate = new window.mapkit.Coordinate(
              Number(base.coordinate_x),
              Number(base.coordinate_y)
            );
            goldAnnotations.forEach(async (gold) => {
              if (this.isWithinRadius(base.coordinate, gold.coordinate, 2000)) {
                await addCoins(700, "Emerald");
                const MarkerAnnotation = window.mapkit.MarkerAnnotation;
                const new_diamond = new MarkerAnnotation(gold.coordinate, {
                  title: "New Emerald",
                  color: "#00b300",
                  glyphText: "🟢",
                });
                map.addAnnotation(new_diamond);
                map.removeAnnotation(gold);
                setTimeout(() => {
                  map.removeAnnotation(new_diamond);
                }, 3000);
              }
            });
          }
        });
      }
    },

    checkForRubys(map) {
      const goldAnnotations = map.annotations.filter(
        (annotation) => annotation.title === "Ruby"
      );

      this.ships.forEach((ship) => {
        if (ship.coordinate_y && ship.coordinate_y) {
          ship.coordinate = new window.mapkit.Coordinate(
            Number(ship.coordinate_x),
            Number(ship.coordinate_y)
          );
          goldAnnotations.forEach(async (gold) => {
            if (this.isWithinRadius(ship.coordinate, gold.coordinate, 1000)) {
              await addCoins(1000, "Ruby");

              const MarkerAnnotation = window.mapkit.MarkerAnnotation;
              const new_diamond = new MarkerAnnotation(gold.coordinate, {
                title: "New Ruby",
                color: "#b30000",
                glyphText: "♦️",
              });
              map.addAnnotation(new_diamond);
              map.removeAnnotation(gold);
              setTimeout(() => {
                map.removeAnnotation(new_diamond);
              }, 3000);
              const jsConfetti = new JSConfetti();
              // jsConfetti.addConfetti();
              jsConfetti.addConfetti({
                emojis: ["♦️"],
                emojiSize: 100,
                confettiNumber: 10,
              });
            }
          });
        }
      });

      if (this.bases) {
        this.bases.forEach((base) => {
          if (base.coordinate_y && base.coordinate_y) {
            base.coordinate = new window.mapkit.Coordinate(
              Number(base.coordinate_x),
              Number(base.coordinate_y)
            );
            goldAnnotations.forEach(async (gold) => {
              if (this.isWithinRadius(base.coordinate, gold.coordinate, 2000)) {
                await addCoins(1000, "Ruby");
                const MarkerAnnotation = window.mapkit.MarkerAnnotation;
                const new_diamond = new MarkerAnnotation(gold.coordinate, {
                  title: "New Ruby",
                  color: "#b30000",
                  glyphText: "♦️",
                });
                map.addAnnotation(new_diamond);
                map.removeAnnotation(gold);
                setTimeout(() => {
                  map.removeAnnotation(new_diamond);
                }, 3000);
              }
            });
          }
        });
      }
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
  },
};
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

#map::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 0) 60%,
    rgba(0, 0, 0, 0.6) 100%
  );
  z-index: 1000; /* Ensure the vignette is above other elements */
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
  bottom: 5px; /*0*/
  left: 5px; /*0*/
  width: 500px;
  height: 300px;
  overflow: hidden;
  z-index: 1100;
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
  display: flex;
  align-items: center;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: rgba(18, 18, 18, 0.95);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: white;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-width: 15%;
}

.modal button {
  background-color: black;
  border: none;
  color: white;
  border-radius: 8px;
  padding: 5px 10px;
}

.modal h2 {
  margin-bottom: 0px;
}

.modal p {
  margin-top: 5px;
  margin-bottom: 0;
}

.modal div {
  margin-bottom: 20px;
}
</style>
