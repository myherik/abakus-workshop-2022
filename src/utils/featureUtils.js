import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Point from "@arcgis/core/geometry/Point";

export const queryOSMData = async (bbox) => {
  const url = "https://overpass-api.de/api/interpreter"
  const body = `
  [out:json][timeout:25];
  (
    node["tourism"](${bbox});
  );
  out body;
  >;
  out skel qt;`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  });
  return response.json();
}

export const createOSMFeatureLayer = (OsmPoi, context) => {
  // Opprett geografisk punkt for hvert POI
  const poiFeature = OsmPoi?.elements.map((poi) => {
    let poiInfo = "";
    Object.entries(poi.tags).forEach(([key, value]) => (
      poiInfo += `<p>${key}: ${value}<p>`
    ))
    const point = new Point({
      latitude: poi.lat,
      longitude: poi.lon
    })
    const feature = {
      geometry: point,
      attributes: {
        ObjectID: poi.id,
        tags: poiInfo,
        title: poi.tags?.name || poi.tags?.information || poi.tags?.tourism || ""
      }
    }
    return feature;
  });
  // Lag et kartlag som kan vise, og gjøre spørringer mot punktene vi lagde
  const featureLayer = new FeatureLayer({
    fields: [
      {
        name: "ObjectID",
        alias: "ObjectID",
        type: "oid"
      }, {
        name: "tags",
        alias: "tags",
        type: "string"
      },
      {
        name: "title",
        alias: "Title",
        type: "string"
      }
    ],
    geometryType: "point",
    spatialReference: { wkid: 4326 },
    source: poiFeature,
    popupTemplate: {
      title: "{title}",
      content: [{
        type: "text",
        text: "{tags}"
      }]
    }
  });
  context.featureLayer.set(featureLayer);
  return featureLayer;
}