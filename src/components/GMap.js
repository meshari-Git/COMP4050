
import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){

  const defaultProps = {
    center: {
      lat: 47.444,
      lng: -122.176
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '80%', }}>
      <GoogleMapReact
         bootstrapURLKeys={{ key: "AIzaSyBVlA41PNk8sS6ej2xL7NSQaGjEMFvY9OE" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={47.4502}
          lng={122.3088}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}
