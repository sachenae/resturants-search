import React from 'react';

const { compose, withProps, withHandlers, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");


const MyMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDiNOXq0cCRHTpyrJAAqxqM9AF3Ixa_DOk&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withStateHandlers(() => ({
    isOpen: false
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    }),
    showInfo: ({ showInfo, isOpen }) => (id) => ({
      isOpen: !isOpen,
      showInfoIndex: id
    })
  }),
  
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
  
    defaultZoom={13}
    defaultCenter={{ lat: 60.1665291, lng: 24.9310137 }}
  >
    <MarkerClusterer
      
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers && props.markers.map((marker) => (
        <Marker
          key={marker.id}
          
          position={{ lat: marker.location.lat, lng: marker.location.lon }}
          onClick={() => { props.showInfo(marker.id) }}
        >
        
        {(props.isOpen && props.showInfoIndex == marker.id) &&
        <InfoWindow
        onCloseClick={props.onToggleOpen}
        >
        <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
          <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
            <h4>{marker.name}</h4>
            <p>{marker.description}</p>
          </div>
        </div>
      </InfoWindow>}
        </Marker>
      ))}
    </MarkerClusterer>
  </GoogleMap>
  
);


export default MyMap;