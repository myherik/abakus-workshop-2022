import React, { useState, useContext } from 'react';
import { AppContext } from "../state/context";
import { MenuItem, TextField, Button } from '@mui/material';

import "../App.css";
import getRandomRoute from '../utils/routeUtils';

const RouteWidget = () => {
  const context = useContext(AppContext);

  const [length, setLength] = useState(0); // Lengde på kalkulert rute
  const [radius, setRadius] = useState(1.5); // Radius rundt brukerens posisjon
  const isMobile = navigator.userAgent.match(/Mobile|Windows Phone|Lumia|Android|webOS|iPhone|iPod|Blackberry|PlayBook|BB10|Opera Mini|\bCrMo\/|Opera Mobi/i)
  const radiusToLengthOptions = [
    {
      radius: 0.5,
      meter: 3000
    },
    {
      radius: 0.7,
      meter: 5000
    },
    {
      radius: 1.5,
      meter: 10000
    }
  ];

  // Kalkuler ca antall skritt basert på rutens lengde
  const getSteps = (length) => {
    return Math.floor((length) * 1400);
  }

  // Finn rute
  const getRoute = () => {
    const point = context.point.value;

    getRandomRoute(point, radius, context).then((result) => {
      // Vi trenger å fjerne gamle ruter før vi legger til nye
      // Hint: grafikken legges til MapView 
      const mapView = context.mapView.value;

      const route = result.data.routeResults[0].route;

      route.attributes.name = "route";
      route.symbol = {
        type: "simple-line",
        color: "#3f51b5",
        width: 3
      };

      mapView.graphics.add(route);
      setLength(route.attributes.Total_Kilometers);
    });
  }

  return (
    <div className={isMobile ? "widgetContainerMobile" : "widgetContainer"}>
      Hvor mange skritt vil du gå idag?
      <div style={{ margin: "20px" }}>
        {/*
					Her har vi allerede brukt TextField componentet fra Material UI. 
					Material UI er en bibliotek med mange nyttige React komponenter vi kan bruke. 
				*/}
        <TextField id="select" label="Skritt" value={radius} select onChange={(e) => setRadius(e.target.value)}>
          {/* 
						Vi ønsker å gi brukeren noen valg over hvor mange skritt som skal gås pr. rute 
						Her kan vi bruke MenuItem inni TextField komponenten for å vise en dropdown.
						Dokumentasjonen for det er her: https://mui.com/material-ui/react-text-field/
					*/}
        </TextField>
      </div>
      <Button variant="contained" color="primary" onClick={() => getRoute()}>
        Finn rute
      </Button>
      {length > 0 &&
        <div style={{ padding: "10px" }}>
          <div>
            {length.toFixed(1)} kilometer
          </div>
          <div>
            ~ {getSteps(length)} skritt
          </div>
        </div>
      }
    </div>
  );
};

export default RouteWidget;
