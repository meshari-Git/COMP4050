/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: @J5kinner
  * 
  */
import React from "react";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <div>
    <div className="jumbotron">
      <h1 className="display-4 text-center">{title}</h1>
      <p className="lead text-center">{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
