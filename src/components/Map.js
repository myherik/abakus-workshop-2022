import React, { useRef, useEffect, useContext } from "react";
import { AppContext } from "../state/context";

import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import Graphic from "@arcgis/core/Graphic";
import esriConfig from '@arcgis/core/config.js';
import Locate from '@arcgis/core/widgets/Locate';

import "../App.css";
import { createOSMFeatureLayer, queryOSMData } from "../utils/featureUtils";

const MapComponent = () => {
  const context = useContext(AppContext);

  // Required: Set this property to insure assets resolve correctly.
  esriConfig.assetsPath = './assets';

  const mapDiv = useRef(null);

  // Tegn punktgrafikk 
  useEffect(() => {
    if (context.mapView.value) {
      const mapView = context.mapView.value;

      const oldPoint = mapView.graphics.items.filter((item) => { return item.geometry.type === "point" })[0];
      mapView.graphics.remove(oldPoint);

      const simpleMarkerSymbol = {
        type: "simple-marker",
        color: '#1976d2',  // Blue
        outline: {
          color: [255, 255, 255], // White
          width: 1
        }
      };

      const pointGraphic = new Graphic({
        geometry: context.point.value,
        symbol: simpleMarkerSymbol
      });

      mapView.graphics.add(pointGraphic);
    }
  }, [context.point.value, context.mapView.value]);

  // Opprett kartet
  useEffect(() => {
    esriConfig.portalUrl = "https://geodata.maps.arcgis.com/";
    if (mapDiv.current) {
      const map = new Map({
        basemap: 'gray-vector'
      });

      const mapView = new MapView({
        map: map,
        container: mapDiv.current,
        extent: {
          ymin: 63.40182257265643,
          xmin: 10.227928161621094,
          ymax: 63.453731595863324,
          xmax: 10.560264587402344
        }
      }).when((mapView) => {
        // Når kartet er initialisert:
        // Hent data fra OpenStreetMap
        queryOSMData(
          "63.40182257265643,10.227928161621094,63.453731595863324,10.560264587402344"
        ).then((result) => {
          // Lag et kartlag med punkter fra osm spørringen
          const featureLayer = createOSMFeatureLayer(result, context);
          map.add(featureLayer);
        });

        // Legge til click event
        mapView.on("click", (event) => {
          context.point.set(event.mapPoint);
        });

        // Legge til widgets
        var locateWidget = new Locate({
          view: mapView,
          scale: 5000
        });
        mapView.ui.add(locateWidget, "top-left");

        // Når locate-widget lokaliserer, sett ruteberegnerens startpunkt
        locateWidget.on("locate", function (locateEvent) {
          if (locateEvent.position.coords) {
            context.point.set(
              {
                type: "point",
                latitude: locateEvent.position.coords.latitude,
                longitude: locateEvent.position.coords.longitude
              }
            )
          }
        });
        context.mapView.set(mapView);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default MapComponent;
