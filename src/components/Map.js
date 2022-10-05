import React, { useRef, useEffect } from "react";

import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import esriConfig from '@arcgis/core/config.js';

import "../App.css";
import { createOSMFeatureLayer, queryOSMData } from "../utils/featureUtils";

const MapComponent = () => {

  // Required: Set this property to insure assets resolve correctly.
  esriConfig.assetsPath = './assets';

  const mapDiv = useRef(null);

  // Opprett kartet
  useEffect(() => {
    esriConfig.portalUrl = "https://geodata.maps.arcgis.com/";
    if (mapDiv.current) {
      const map = new Map({
        basemap: 'gray-vector'
      });

      new MapView({
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
          const featureLayer = createOSMFeatureLayer(result);
          map.add(featureLayer);
        });
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default MapComponent;
