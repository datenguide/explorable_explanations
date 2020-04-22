import React, { useState, useEffect } from 'react'
import { StaticMap, Source, Layer } from 'react-map-gl'
import { json } from 'd3-request'
import MapNav from './MapNav'

import 'mapbox-gl/dist/mapbox-gl.css'

const regionLayer = {
  type: 'fill',
  source: 'geojson',
  paint: {
    'fill-color': '#ff0000',
    'fill-opacity': 0.4,
  },
}

const mapNavItems = [
  {
    id: 'nuts-1',
    title: 'Bundesländer',
    path: '/nrw_bundesland.geojson',
  },
  {
    id: 'nuts-2',
    title: 'Statistische Regionen',
    path: '/nrw_bundesland.geojson',
  },
  {
    id: 'nuts-3',
    title: 'Landkreise',
    path: '/nrw_landkreise.geojson',
  },
  {
    id: 'lau',
    title: 'Gemeinden',
    path: '/nrw_gemeinden.geojson',
  },
]

function Map({ mapboxApiAccessToken }) {
  const [data, setData] = useState({})
  const [currentLayer, setCurrentLayer] = useState(mapNavItems[0])
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 400,
    latitude: 51.427,
    longitude: 7.664,
    zoom: 6,
    options: false,
    mapboxApiAccessToken,
  })

  function loadGeojson(path) {
    json(path, (error, response) => {
      if (!error) setData(response)
    })
  }

  useEffect(() => {
    // code to run on component mount
    loadGeojson(currentLayer.path)
  }, [])

  return (
    <StaticMap {...viewport} onViewportChange={setViewport}>
      <MapNav
        items={mapNavItems}
        currentItem={currentLayer}
        onItemClick={(item) => {
          setCurrentLayer(item)
          loadGeojson(item.path)
        }}
      />
      <Source type="geojson" data={data}>
        <Layer {...regionLayer} />
      </Source>
    </StaticMap>
  )
}

export default Map
