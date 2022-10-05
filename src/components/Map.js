import React, { useRef, useEffect } from "react";

import esriConfig from '@arcgis/core/config.js';
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";

import "../App.css";
import { createOSMFeatureLayer, queryOSMData } from "../utils/featureUtils";

const MapComponent = () => {
  // Required: Set this property to insure assets resolve correctly.
  esriConfig.assetsPath = './assets';
  const mapDiv = useRef(null);

  // Opprett kartet
  useEffect(() => {
    if (mapDiv.current) {
      // Det første vi trenger er et Map objekt med bakgrunnskart
      // Konstruktøren er allerede i koden, men vi må velge bakgrunnskartet
      // En liste med valg inner vi i API dokumentasjonen:
      // https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
      const map = new Map({
        basemap: ''
      });

      // For å kunne vise kartet må dette legges til i et MapView
      // Dokumentasjonen for MapView finnes her:
      // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
      // Dersom man ønsker å se Trondheimsområdet er koordinatene for det
          // ymin: 63.40182257265643,
          // xmin: 10.227928161621094,
          // ymax: 63.453731595863324,
          // xmax: 10.560264587402344
      // Eller som en bbox:
      new MapView({
        // MapView trenger minimum feltene:
        // map
        // container
        // men det er og lurt å legge til feltet extent
      }).when(() => {
        // Når kartet er initialisert kan vi hente data
        // Vi har lagd noen hjelpefunksjoner i utils/featureUtils
        // Den første henter data fra Open Streetmap, men trenger en bbox
        queryOSMData("").then((result) => {
          // Etter at vi har hentet data må vi legge dette til i kartet
          // Det er en annen funksjon i featureUtils
          // denne gjør OSM data om til et kartlag som kan legges til i kartet
          
          // etter å ha lagd kartlaget må dette legges til i kartet
          // Dette er beskrevet i API dokumentsjonen for Map
        });
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default MapComponent;
