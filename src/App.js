import React, { useRef, useEffect, useState } from "react";
import { AppContext } from "./state/context";

import "./App.css";
import Map from "./components/Map";
import RouteWidget from "./components/RouteWidget";

import esriConfig from '@arcgis/core/config.js';
import IdentityManager from '@arcgis/core/identity/IdentityManager';
import OAuthInfo from '@arcgis/core/identity/OAuthInfo';
import Portal from '@arcgis/core/portal/Portal';

function App() {

  // Autentiser ved oppstart
  // useEffect(() => {
  //   // esriConfig.portalUrl = "https://ntnu-gis.maps.arcgis.com/";

  //   var info = new OAuthInfo({
  //     appId: "id3Q2AFr5FLf1nOY",
  //     // appId: "id3Q2AFr5FLf1nOY",
  //     // Uncomment the next line and update if using your own portal
  //     portalUrl: esriConfig.portalUrl,
  //     popup: false
  //   });
    // new Portal(esriConfig.portalItem);

  //   IdentityManager.registerOAuthInfos([info]);
  //   IdentityManager.getCredential(esriConfig.portalUrl + "/sharing").then((res) => {
  //     portal.load();
  //   });
  // }, []);

  // Opprett store som sendes rundt til ulike komponenter
  esriConfig.apiKey = "AAPK52519f141ec04565b33944a7da4bc90fnViwerekXzgz0Xmo2l0frkfDum-JLaO1qlOfNgp6QFA4tUSOS_ZEur7zjsuqLFJu";
  const [mapView, setMapView] = useState(null);
  const [point, setPoint] = useState({ //Create a point
    type: "point",
    latitude: 63.4305,
    longitude: 10.4500
  });

  const store = {
    mapView: { value: mapView, set: setMapView },
    point: { value: point, set: setPoint },
  }

  return (
    <AppContext.Provider value={store}>
      <div style={{ height: "100%", width: "100%" }}>
        <Map/>
        <RouteWidget />
      </div>
    </AppContext.Provider>

  );
}

export default App;
