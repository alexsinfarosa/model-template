import React from "react"
import ReactMapGL, { NavigationControl } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import GlobalStateContext from "../context/globalStateContext"

const settings = {
  dragPan: true,
  dragRotate: false,
  scrollZoom: false,
  touchZoom: true,
  touchRotate: true,
  keyboard: true,
  doubleClickZoom: true,
  minZoom: 0,
  maxZoom: 20,
  minPitch: 0,
  maxPitch: 85,
}

export default function Map() {
  const { station, dispatch } = React.useContext(GlobalStateContext)
  const [viewport, setViewport] = React.useState({
    latitude: station ? station.lat : 42.87295,
    longitude: station ? station.lon : -77.02818,
    zoom: 8,
    transitionDuration: 1000,
  })

  function handleClickOnMap(e) {
    const feature = e.features[0]
    if (feature) {
      const { description, ...station } = feature.properties
      dispatch({ type: "setStation", station })
      setViewport({
        ...viewport,
        latitude: station.lat,
        longitude: station.lon,
      })
    }
  }

  function getCursor({ isHovering }) {
    return isHovering ? "pointer" : "default"
  }

  return (
    <div className="h-96 lg:128">
      <ReactMapGL
        {...viewport}
        {...settings}
        width="100%"
        height="100%"
        mapboxApiAccessToken={process.env.GATSBY_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/xscanna/ck3695z07029q1cp5fk1bz1fn"
        interactiveLayerIds={["acisstationsgeojson"]}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        onClick={handleClickOnMap}
        getCursor={getCursor}
        clickRadius={2}
      >
        <NavigationControl
          className="absolute right-0 z-10 mt-4 mb-4 mr-4"
          showCompass={false}
        ></NavigationControl>
      </ReactMapGL>
    </div>
  )
}
