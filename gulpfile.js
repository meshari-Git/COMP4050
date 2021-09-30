/** @license 4050 Boyz
 * Copyright (c) 4050 Boyz, Inc. and its affiliates.
 *
 * Authors: @J5kinner
 *
 */
const gulp = require("gulp");
const gap = require("gulp-append-prepend");

gulp.task("authors", async function () {
  // This adds author commenting to all of the relevant files
  await gulp
    .src("src/assets/css/*.css", { base: "./" })
    .pipe(
      gap.prependText(`/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */

`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  await gulp
    .src("src/authentication/*.js", { base: "./" })
    .pipe(
      gap.prependText(`/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */

`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  await gulp
    .src("src/components/*.js", { base: "./" })
    .pipe(
      gap.prependText(`/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */

`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  await gulp
    .src("src/hooks/*.js", { base: "./" })
    .pipe(
      gap.prependText(`/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */

`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  await gulp
    .src("src/services/*.js", { base: "./" })
    .pipe(
      gap.prependText(`/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */

`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  await gulp
    .src("src/tests/*.js", { base: "./" })
    .pipe(
      gap.prependText(`/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */

`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  await gulp
    .src("src/views/*.js", { base: "./" })
    .pipe(
      gap.prependText(`/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */

`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  await gulp
    .src("src/*.js", { base: "./" })
    .pipe(
      gap.prependText(`/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */

`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  /* SERVER COMMENTING */

  await gulp
    .src("server/config/*.js", { base: "./" })
    .pipe(
      gap.prependText(`/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */

`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  await gulp
    .src("server/controllers/*.js", { base: "./" })
    .pipe(
      gap.prependText(`/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */

`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  await gulp
    .src("server/models/*.js", { base: "./" })
    .pipe(
    gap.prependText(`/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */

`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  await gulp
    .src("server/*.js", { base: "./" })
    .pipe(
     gap.prependText(`/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */

`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  return;
});
