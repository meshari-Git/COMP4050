/** @license 4050 Boyz
 * Copyright (c) 4050 Boyz, Inc. and its affiliates.
 *
 * Authors: @J5kinner
 *
 */
import React from "react";

function Input({ handler, type, label, value }) {
  return (
    <div>
      <div className="form-floating mb-3">
        <input
          onChange={handler}
          type={type}
          className="form-control"
          id="floatingInput"
          placeholder={label}
          value={value}
        />
        <label for="floatingInput">{label}</label>
      </div>
    </div>
  );
}

export default Input;
