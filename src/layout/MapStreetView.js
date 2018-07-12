import React from 'react';
const { compose, withProps } = require("recompose");

const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  StreetViewPanorama,
  OverlayView,
  Marker
} = require("react-google-maps");
const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
  })


const MapStreetView = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDiNOXq0cCRHTpyrJAAqxqM9AF3Ixa_DOk&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap >
    <StreetViewPanorama defaultPosition={{ lat: 60.1665291, lng: 24.9310137 }} visible>
    {props.markers && props.markers.map((marker) => (
        <OverlayView
        position={{ lat: marker.location.lat, lng: marker.location.lon }}
          mapPaneName={OverlayView.OVERLAY_LAYER}
          getPixelPositionOffset={getPixelPositionOffset}
          key={marker.id}
      >
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
        </OverlayView>
    ))}

      
        
      
    </StreetViewPanorama>
  </GoogleMap>
);

export default MapStreetView;