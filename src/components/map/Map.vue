<template>
  <div class="mapbox" id="map"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { onMounted, reactive, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import marker from "@/assets/marker.png";
import marker2 from "@/assets/marker2.png";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    watch(
      () => store.state.main.factoryReload,
      () => {
        state.factory = store.state.main.factorys;
        mapbox();
      }
    );

    onMounted(() => {
        mapbox();
    });

    const state = reactive({
      factory: store.state.main.factorys
    });

    const mapbox = async () => {
      const { factory } = state;
      mapboxgl.accessToken =
        "pk.eyJ1IjoiY29jby13YXBwbGFiIiwiYSI6ImNrcjJzdmxjazI2ejIydXJ6eGEzZW9sZXQifQ.VdjtFzPZbh-UwA5ite3Lkw";

      // 맵 기본 스타일 설정
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/coco-wapplab/ckra0nx4z2dl418qg6a54mh60",
        center: [126.7903013, 37.312074],
        zoom: 14.2
      });
      map.getCanvas().style.cursor = "default";

      const errMarker = factory.filter((facto) => facto.error === true);

      const nonErrMarker = factory.filter((facto) => facto.error === false);
      // 맵 로드
      map.on("load", async () => {
        // https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png

        map.loadImage(
          marker,
          await function(error, image) {
            if (error) throw error;
            map.addImage("custom-marker", image);
            // Add a GeoJSON source with 2 points
            const nonerrList = {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: []
              }
            };
            for (let i = 0; i < nonErrMarker.length; i++) {
              nonerrList.data.features.push({
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: nonErrMarker[i].location
                },
                properties: {
                  title: nonErrMarker[i].title,
                  id: nonErrMarker[i].id
                }
              });
            }

            map.addSource("points", nonerrList);
            // Add a symbol layer
            map.addLayer({
              id: "points",
              type: "symbol",
              source: "points",
              layout: {
                "icon-image": "custom-marker",
                "icon-size": 0.14,
                "icon-allow-overlap": true,
                 "text-allow-overlap": true,
                // get the title name from the source's "title" property
                "text-field": ["get", "title"],
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 2.25],
                "text-anchor": "top",
                "text-size": 14
              },
              paint: {
                "text-color": "#ffffff",
                "icon-color": "#ffffff"
              }
            });

            map.on("click", "points", (e) => {
              const { id } = e.features[0].properties;
              const target = nonErrMarker.filter((nonErr) => nonErr.id === id);

              store.state.selectedFac = JSON.parse(JSON.stringify(target[0]));
              store.state.factoryID = id;
              router.push("elec");
            });

            map.on("mouseenter", "points", () => {
              map.getCanvas().style.cursor = "pointer";
            });

            map.on("mouseleave", "points", () => {
              map.getCanvas().style.cursor = "default";
            });
          }
        );

        if (errMarker.length > 0) {
          map.loadImage(
            marker2,
            await function(error, image) {
              if (error) throw error;
              map.addImage("custom-marker2", image);
              // Add a GeoJSON source with 2 points
              const errList = {
                type: "geojson",
                data: {
                  type: "FeatureCollection",
                  features: []
                }
              };
              for (let i = 0; i < errMarker.length; i++) {
                errList.data.features.push({
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: errMarker[i].location
                  },
                  properties: {
                    title: errMarker[i].title,
                    id: errMarker[i].id
                  }
                });

                let msg = "이상";
                if (!errMarker[i].electronic && errMarker[i].heats) {
                  msg = "전기에너지 이상";
                }

                if (errMarker[i].electronic && !errMarker[i].heats) {
                  msg = "열에너지 이상";
                }
                if (!errMarker[i].electronic && !errMarker[i].heats) {
                  msg = "전기 & 열에너지 이상";
                }

                const popup = new mapboxgl.Popup({
                  closeButton: false,
                  closeOnClick: false,
                  className: "errPopUp",
                  offset: [0, -25]
                })
                  .setLngLat(errMarker[i].location)
                  .setHTML(msg)
                  .addTo(map);
              }

              map.addSource("points2", errList);
              // Add a symbol layer
              map.addLayer({
                id: "points2",
                type: "symbol",
                source: "points2",
                layout: {
                  "icon-image": "custom-marker2",
                  "icon-size": 0.14,
                  "icon-allow-overlap": true,
                  // get the title name from the source's "title" property
                  "text-field": ["get", "title"],
                  "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                  "text-offset": [0, 2.25],
                  "text-anchor": "top",
                  "text-size": 14
                },
                paint: {
                  "text-color": "#F92929",
                  "icon-color": "#ffffff"
                }
              });

              map.on("click", "points2", (e) => {
              const { id } = e.features[0].properties;
              const target = errMarker.filter((err) => err.id === id);
              store.state.selectedFac = JSON.parse(JSON.stringify(target[0]));
              store.state.factoryID = id;
              router.push("elec");
              });

              map.on("mouseenter", "points2", () => {
                map.getCanvas().style.cursor = "pointer";
              });

              map.on("mouseleave", "points2", () => {
                map.getCanvas().style.cursor = "default";
              });
            }
          );
        }
      });
    };
    return { state };
  }
};
</script>

<style lang="scss">
#map {
  width: 100%;
  height: 100%;
}

.errPopUp {
  .mapboxgl-popup-content {
    background: #ff0000;
    color: white;
    padding: 5px 10px;
    box-shadow: 0px 0px 10px #ff0000c5;
  }
  .mapboxgl-popup-tip {
    border-top-color: #ff0000;
    box-shadow: 0px 0px 10px #ff0000c5;
  }
}

@keyframes alertani {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  to {
    opacity: 1;
  }
}
</style>
