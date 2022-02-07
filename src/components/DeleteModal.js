import { useState, useCallback } from 'react'
import { DELETE_ACCOUNT, SEE_PROFILE, UPLOAD_PIC } from '../graphql/queries'
import { useDropzone } from 'react-dropzone';

// styles
import styled from 'styled-components'
import { Username } from '../STYLES/styleProfile'
import { RiInstagramLine } from 'react-icons/ri'
import { BlueBTN } from '../STYLES/styleForm'
import { useMutation } from '@apollo/client'
import { cacheSlot } from '@apollo/client/cache';
import { useNavigate } from 'react-router-dom';


const DeleteModal = ({ setShowUserMenu, showUserMenu, userID }) => {
  const [deleteAccount] = useMutation(DELETE_ACCOUNT)
  const navigate = useNavigate()

  const deleteAccountHandler = async () => {
    const response = window.confirm("You sure you want to delete your account?")
    if (!response) return;

    await deleteAccount({
      variables: {
        id: userID,
      },
      onCompleted: () => navigate('/accountDeletedRedirect', { state: { ok: true } })
    })
  }

  return (
    <>
      <ModalPlane onClick={() => setShowUserMenu(false)} />
      <ModalWrapper >
        <TitleDiv>
          <ModalText>User Menu</ModalText>
        </TitleDiv>
        <DelBTN type="button" onClick={deleteAccountHandler} >delete account</DelBTN>

      </ModalWrapper>
    </>
  )
}

const DelBTN = styled.div`
  cursor: pointer;
  background-color: #d82727;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
  border: none;
`


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
  background: ${p => p.theme.MODAL.bg};
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
  border-bottom: 1px solid ${p => p.theme.MODAL.borCol};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;

`

const ModalText = styled(Username)`
  letter-spacing: 0.6px;
  color: ${p => p.theme.MODAL.text1};
  cursor: default;
`

/////////////////////////////////////////////
// Icons
const InstaIcon = styled(RiInstagramLine)`
  font-size: 5rem;
  transition: 0.4s;
  margin-bottom: 20px;
  color: ${p => p.theme.MODAL.icon};

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
  color: ${p => p.theme.MODAL.dragTextCol};
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


export default DeleteModal