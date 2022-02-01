import { useState, useCallback } from 'react'
import { SEE_PROFILE, UPLOAD_PIC } from '../graphql/queries'
import { useDropzone } from 'react-dropzone';

// styles
import styled from 'styled-components'
import { Username } from '../STYLES/styleProfile'
import { RiInstagramLine } from 'react-icons/ri'
import { BlueBTN } from '../STYLES/styleForm'
import { useMutation } from '@apollo/client'
import { cacheSlot } from '@apollo/client/cache';


const UploadModal = ({ setUploadModalOpenB, username }) => {
  const [fileError, setFileError] = useState(null)
  const [uploadFile, { loading: uploadLoading }] = useMutation(UPLOAD_PIC);
  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (uploadLoading) { return }
      // select the first file from the Array of files
      const file = acceptedFiles[0];
      // use the uploadFile variable created earlier
      try {
        await uploadFile({
          // use the variables option so that you can pass in the file we got above
          variables: { file },
          update: (cache, result) => {
            console.log("result", result)
            if (!result.data.uploadPhoto.ok) return;

            cache.modify({
              id: `ROOT_QUERY`,
              fields: {
                seeFeed(previous) {
                  // and now I don't know what to do here
                  console.log("previous", previous)
                }
              }
            })
          },
          onCompleted: () => {
            setUploadModalOpenB(false)
          },
          refetchQueries: [{ query: SEE_PROFILE, variables: { username } }]
        });
      } catch (error) {
        setFileError(error.message)
      }

    }, [uploadFile]
  ); // pass in uploadFile as a dependency


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });


  return (
    <>
      <ModalPlane onClick={() => setUploadModalOpenB(false)} />
      <ModalWrapper >
        <TitleDiv>
          <ModalText>Create new post!</ModalText>
          {fileError && <div>{fileError}</div>}
        </TitleDiv>
        <DragDropForm
          {...getRootProps()}
          className={`dropzone ${isDragActive && 'isActive'}`}
        >
          <InstaIcon />

          <FileInput {...getInputProps()} disabled={uploadLoading} />
          {isDragActive ? (
            <UploadText>Drop the files here ...</UploadText>
          ) : (
            <UploadText>Drag photos and videos here</UploadText>
          )}
          <Label htmlFor="file-upload" uploadLoading={uploadLoading} >
            {uploadLoading ? "Loading..." : "Select from computer"}
          </Label>
        </DragDropForm>
      </ModalWrapper>
    </>
  )
}


const ModalWrapper = styled.div`
  position: fixed;
  max-width: 700px;
  min-height: 250px;
  width: 80%;
  height: 70%;
  object-fit: cover;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
  background: #ffffff;
  border-radius: 12px;

  animation: modalAppear 0.1s;
  @keyframes modalAppear {
    from {
      transform: translate(-50%, -50%) scale(1.20);
    } to {
      transform: translate(-50%, -50%) scale(1);
    }
  }
`

const ModalPlane = styled.div`
  position: fixed;
  width: 200vw;
  height: 200vh;
  background: #000000b7;
  transform: translate(-50%, -50%);
  z-index: 140;
`

const TitleDiv = styled.div`
  border-bottom: 1px solid ${p => p.theme.BORCOL1};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;

`

const ModalText = styled(Username)`
  letter-spacing: 0.6px;
  color: #525252;
  cursor: default;
`

/////////////////////////////////////////////
// Icons
const InstaIcon = styled(RiInstagramLine)`
  font-size: 5rem;
  transition: 0.4s;
  margin-bottom: 20px;

  &:hover {
    transform: rotate(180deg);
  }
`

/////////////////////////////////////////////
// FORM
const DragDropForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
`

const FileInput = styled.input`
  display: none;
`

const UploadText = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  color: #414141;
  margin-bottom: 20px;
  cursor: default;
`

const Label = styled.label`
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  cursor: pointer;
  width: 180px;
  background-color:  ${p => p.uploadLoading ? "#69bbf1" : "#0095F6"};

  height: 32px;

  border: none;
  border-radius: 4px;

  font-size: 0.7rem;
  color: white;
  font-weight: 600;
`


export default UploadModal