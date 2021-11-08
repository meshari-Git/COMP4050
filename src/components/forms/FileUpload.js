/** @license 4050 Boyz
 * Copyright (c) 4050 Boyz, Inc. and its affiliates.
 *
 * Authors: @J5kinner
 *
 */
import React, { useState, useRef } from "react";
import "../../assets/sass/pages/createJob/createJob.scss";

const kilo_bytes = 1000;
const max_file_byte_size = 50000000;
const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / kilo_bytes);

/**
 * Takes a file of certain size and returns that file visually once uploaded to state
 *
 * @param label - PROP: determines the components label
 * @param fileMaxByteSize - PROP: prevents files which are too large being uploaded
 * @param fileCallBackUpdate - PROP: Callback function used for sending files to state for parent component
 * @return upload images to be viewed on the screen
 */
const FileUpload = ({
  label,
  fileCallBackUpdate,
  maxFileSizeInBytes = max_file_byte_size,
  ...otherProps
}) => {
  const [files, setFiles] = useState({});
  const fileInputField = useRef(null);

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  /*Stores the files through the parent component*/
  const CallBackUpdate = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    fileCallBackUpdate(filesAsArray);
  };
  /*Sending the files to be stored in the parent*/
  const handleNewUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      CallBackUpdate(updatedFiles);
    }
  };

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      if (file.size < maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { file };
        }
        files[file.name] = file;
      }
    }
    return { ...files };
  };

  const removeFile = (fName) => {
    delete files[fName];
    setFiles({ ...files });
    CallBackUpdate({ ...files });
  };

  return (
    <>
      <section className="upload-section">
        <p className="drag-drop-text">Click to open your folder</p>
        <p className="drag-drop-text">Drag and drop your files anywhere or</p>
        <button
          type="button"
          className="upload-file-btn"
          onClick={handleUploadBtnClick}
        >
          <i className="fas fa-file-import" />
          <span> Upload files</span>
        </button>
        <input
          className="upload-input"
          type="file"
          ref={fileInputField}
          onChange={handleNewUpload}
          title=""
          value=""
          {...otherProps}
        />
      </section>
      <article className="preview-container">
        <h5>Uploads</h5>
        <section className="preview-list">
          {Object.keys(files).map((fName, index) => {
            let file = files[fName];
            let isImageFile = file.type.split("/")[0] === "image";
            return (
              <section key={fName} className="preview-container">
                <div>
                  {isImageFile && (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`file preview ${index}`}
                      id="preview-img"
                    />
                  )}
                  <div className="file-meta-data" isImageFile={isImageFile}>
                    <span>{file.name}</span>
                    <aside>
                      <span>{convertBytesToKB(file.size)} kb</span>

                      <i
                        className="remove-file-icon fas fa-trash-alt"
                        onClick={() => removeFile(fName)}
                      />
                    </aside>
                  </div>
                </div>
              </section>
            );
          })}
        </section>
      </article>
    </>
  );
};

export default FileUpload;
