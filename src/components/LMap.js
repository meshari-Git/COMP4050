/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import jobService from "../services/job";
import "../assets/css/lmap.css"


//Macquarie University Coordinates
const center = {
    lat: -33.7738,
    lng: 151.1126
};


const LMap = () => {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        jobService.getFavours()
            .then(response => {
                setJobs(response.data);
            });
    }, [jobs]);


    return (
        <MapContainer center={center} zoom={13} scrollWheelZoom={true} dragging={true} zoomControl={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {jobs.map((job) => (
                <div>
                    {console.log(job, job.lat)}
                    <Marker position={[job.lat, job.long]}>
                        <Popup>
                            <Link
                                to={{
                                    pathname: "/job",
                                    state: {
                                        job: job,
                                    },
                                }}>
                                <h1>
                                    {job.title}
                                </h1>
                            </Link>
                            <p>
                                {job.description}
                            </p>
                        </Popup>
                    </Marker>
                </div>
            ))}
        </MapContainer>
    )
}

export default LMap