/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "../assets/css/lmap.css"

const center = {
    lat: -33.7738,
    lng: 151.1126
};

const LMap = () => {
    return (
        <MapContainer center={[-33.7738, 151.1126]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[33.7738, 151.1126]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default LMap