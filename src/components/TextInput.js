/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */
import React from "react";
import "../assets/scss/textinput.scss";

const TextInput = ({ type = "text", label, onChange, value }) => {
  return (
    <div className="input-container">
      <label className={value && "filled"}>{label}</label>
      <input type={type} value={value} onChange={onChange} />
    </div>
  );
};

export default TextInput;
