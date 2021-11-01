/** @license 4050 Boyz
 * Copyright (c) 4050 Boyz, Inc. and its affiliates.
 *
 * Authors: @J5kinner
 *
 */
import React from "react";
import "../../assets/sass/pages/createJob/createJob.scss";


function TextArea({ handler, type, label, value }) {
  return (
    <div>
      <div className="form-floating ">
        <textarea
          onChange={handler}
          type={type}
          className="form-control text-area"
          id="floatingTextarea2"
          placeholder={label}
          value={value}
        ></textarea>
        <label for="floatingTextarea2">{label}</label>
      </div>
    </div>
  );
}

export default TextArea;
