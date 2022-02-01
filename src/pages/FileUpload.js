/// this is a test component for file upload reachable per url.../upload

import { useMutation } from '@apollo/client';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { UPLOAD_PIC } from '../graphql/queries'


const FileUpload = () => {
  const [uploadFile] = useMutation(UPLOAD_PIC);
  const onDrop = useCallback(
    (acceptedFiles) => {
      // select the first file from the Array of files
      const file = acceptedFiles[0];
      // use the uploadFile variable created earlier
      uploadFile({
        // use the variables option so that you can pass in the file we got above
        variables: { file },
        onCompleted: () => {},
      });
    },
    // pass in uploadFile as a dependency
    [uploadFile]
  );


  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });




  
  return (
    <Wrappp>
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive && 'isActive'}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </Wrappp>
  );
};

const Wrappp = styled.div`
  margin-top: 70px;
`
export default FileUpload;