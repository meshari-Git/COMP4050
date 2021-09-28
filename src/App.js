/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */
import React from "react";
import DataRouter from "./hooks/DataRouter"
import Footer from './components/Footer'
import "./assets/css/app.css"

function App() {

    return (
        <div className="App">
            <DataRouter />
            <Footer />
        </div>
    )
}

export default App;

