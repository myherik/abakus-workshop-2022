import React, { useRef, useContext, useEffect } from "react";
import { AppContext } from "../state/context";

import esriConfig from "@arcgis/core/config.js";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import PopupTemplate from "@arcgis/core/PopupTemplate";

import "../App.css";

const MapComponent = () => {
  // Required: Set this property to insure assets resolve correctly.
  esriConfig.assetsPath = "./assets";
  const mapDiv = useRef(null);
  const context = useContext(AppContext);

  // Opprett kartet
  useEffect(() => {
    if (mapDiv.current) {
      // Det første vi trenger er et Map objekt med bakgrunnskart
      // Konstruktøren er allerede i koden, men vi må velge bakgrunnskartet
      // En liste med valg finner vi i API dokumentasjonen:
      // https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
      const map = new Map({
        basemap: "",
      });

      // Vi ønsker så å hente data som vi kan legge til i kartet.
      // På følgende tjeneste finner dere punkter som viser en rekke turistatraksjoner i Europa:
      // Url: https://services-eu1.arcgis.com/zci5bUiJ8olAal7N/arcgis/rest/services/OSM_Tourism_EU/FeatureServer/0
      // Se dokumentasjonssiden for et eksempel: https://developers.arcgis.com/javascript/latest/add-a-feature-layer/

      // Om man ønsker å ha en popup når man trykker på punktene i FeatureLayeret trenger man også å legge
      // inn en popup template i featurelayeret. Denne har vi ferdig definert her.
      const popUpTemplate = new PopupTemplate({
        title: "{name}",
        content: [{
          type: "text",
          text: `<p>Type: {tourism}</p>
                  <p>{description}</p>`
        }]
      });

      // TODO: Legge hente data
      // TODO: Legge til dataen i kartet
      // TODO: Legg til dataen i context

      // For å kunne vise kartet må dette legges til i et MapView
      // Dokumentasjonen for MapView finnes her:
      // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
      // Dersom man ønsker å se Trondheimsområdet er koordinatene for det
      // ymin: 63.40182257265643,
      // xmin: 10.227928161621094,
      // ymax: 63.453731595863324,
      // xmax: 10.560264587402344
      new MapView({
        // MapView trenger minimum feltene:
        // map
        // container
        // extent(valgfritt, men lurt å ha med)
      }).when(() => {
        // Når kartet er initialisert kan vi manipulre dataen her
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
};

export default MapComponent;
