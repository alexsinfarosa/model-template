import React from "react"
import ReactMapGL, { NavigationControl } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"

export default function Map() {
  const [viewport, setViewport] = React.useState({
    width: "100%",
    height: 400,
    latitude: 42.87295,
    longitude: -77.02818,
    zoom: 8,
  })

  function getCursor({ isHovering }) {
    return isHovering ? "pointer" : "default"
  }

  return (
    <div className="mb-24">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.GATSBY_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/xscanna/ck3695z07029q1cp5fk1bz1fn"
        interactiveLayerIds={["acisstationsgeojson"]}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        dragRotate={false}
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
