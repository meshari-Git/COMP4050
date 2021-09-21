
import React from "react";
import GoogleMapReact from 'google-map-react';
import "../assets/css/map.css";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){

  const defaultProps = {
    center: {
      lat: -33.7738,
      lng: 151.1126
    },
    zoom: 15
  };
  const API_KEY = "AIzaSyBVlA41PNk8sS6ej2xL7NSQaGjEMFvY9OE"

  return (
    // Important! Always set the container height explicitly
    <div className="map">
      <GoogleMapReact
         bootstrapURLKeys={{ key: API_KEY }}
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
