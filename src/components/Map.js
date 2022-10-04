import React, { useRef, useEffect, useContext } from "react";
import { AppContext } from "../state/context";

import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import Graphic from "@arcgis/core/Graphic";
import esriConfig from '@arcgis/core/config.js';
import Locate from '@arcgis/core/widgets/Locate';

import "../App.css";

const Map = () => {
  const context = useContext(AppContext);

  // Required: Set this property to insure assets resolve correctly.
  esriConfig.assetsPath = './assets';

  const mapDiv = useRef(null);

  // Tegn punktgrafikk 
  useEffect(() => {
    if (context.mapView.value) {
      const mapView = context.mapView.value;

      mapView.graphics.removeAll();

      const simpleMarkerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],  // Orange
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
      const map = new WebMap({
        portalItem: { // autocasts as new PortalItem()
          id: "ac31e298305f42258eccad33b2029616"  // ID of the WebScene on arcgis.com
        }
      });

      const mapView = new MapView({
        map: map,
        container: mapDiv.current,
      }).when((mapView) => {
        // Når kartet er initialisert:

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
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default Map;
