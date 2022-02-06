// if you scroll for 5 years you might reach the midpoint of this file

import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { Link as LinkNS, useParams, useNavigate } from "react-router-dom"
import React, { useState, useEffect, useRef, useCallback } from "react"
import { DELETE_COMMENT, DELETE_PHOTO } from "../graphql/queries"
import { SEE_PROFILE, UPLOAD_PIC, EDIT_CAPTION } from '../graphql/queries'
import { SEE_PIC, TOGGLE_LIKE } from "../graphql/queries"
import { useUserHook } from "../graphql/useUserHook"
import { useForm } from "react-hook-form"


// styles
import { TopContainer as TopContainerNS, AvatarDiv as AvatarDivNS, Avatar, Username, BottomContainer as BottomContainerNS } from '../STYLES/styleProfile'
import { CgHeart, CgComment, CgMailOpen, CgBookmark, CgChevronRight, CgTrashEmpty, CgClose } from "react-icons/cg"
import { EditIcon, CaptionForm, InputCaption } from "../STYLES/stylePicDetails"
import { ReactComponent as HeartFilled } from "../static/heartFill.svg"
import { IoCheckmarkCircle } from "react-icons/io5"
import { RiInstagramLine } from 'react-icons/ri'
import { VscArrowLeft } from 'react-icons/vsc'
import { BlueBTN } from '../STYLES/styleForm'
import { IoArrowBack } from 'react-icons/io5'
import { Link3 } from '../STYLES/styleLinks'
import styled from 'styled-components'


import {
  SinglePicWrapper, PicGrid, AvatarDiv,
  Picture,
  RightColumn,
  BottomContainer,
  TopContainer,
  CheckMark,
  Comments,
  Comment,
  AvatarDivComment,
  CommentText,
  ContainerFromTop,
  MarginDiv,
  IconGroupContainer,
  TrashcanIcon,
  TrashcanIconBig,
  HeartIcon,
  HeartIcon2,
  CommentIcon,
  SendIcon,
  BookmarkIcon,
  MainIconGroup,
  LeftIconGroup,
  Likes,
  BottomGroup,
  CaptionDiv,
  SaveCaptionBTN,
  CheckmarkIcon
} from "../STYLES/stylePicDetails" //heilige sch0isse



import CommentForm from "./CommentForm"


const PicModal = ({ setShowModalPicutre, picData, seeProfileLazyQuery, refetch }) => {
  const [dummyState, setDummyState] = useState(false)
  console.log("picData", picData)
  const { data: userData } = useUserHook()



  const commentIconRef = useRef()
  const id = picData.id
  const { loading, data } = useQuery(SEE_PIC, {
    variables: { seePhotoId: Number(id) }
  })
  // const data = { seePhoto: picData }

  const comments = data?.seePhoto?.comments

  const [openCaptionFormB, setOpenCaptionFormB] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: { caption: data?.seePhoto?.caption } })

  // EDIT CAPTION (image description)
  const [editPhoto] = useMutation(EDIT_CAPTION)
  // const editPhotoHandler = (id, caption) => {
  //   editPhoto({ variables: { editPhotoId: id, caption: caption } })
  // }
  const onCaptionSuccess = async data => {
    console.log("successdata", data)
    await editPhoto({
      variables: { editPhotoId: Number(id), caption: data.caption },
      update: (cache, result) => {
        const ok = result.data.editPhoto.ok
        if (!ok) return;

        cache.modify({
          id: `Photo:${id}`,
          fields: {
            caption(prev) {
              return data.caption
            },
          },
        })
      }
    })
    setOpenCaptionFormB(false)
  }

  // const captionRef = useRef()
  const editCaptionHandler = () => { // this open edit input
    setOpenCaptionFormB(p => !p)
    console.log(openCaptionFormB)
  }




  const [deleteComment] = useMutation(DELETE_COMMENT, {
    update: (cache, result) => {
      const deleteResult = result.data.deleteComment
      if (deleteResult.ok) {
        cache.evict({ id: `Comment:${deleteResult.id}` })
        // we also need to update the cache commentsNumber:
        cache.modify({
          id: `Photo:${id}`,
          fields: {
            commentsNumber(prev) {
              if (prev === 0) return 0;
              return prev - 1
            }
          }
        })
      }
    },
  })
  const deleteCommentHandler = async (id) => {
    await deleteComment({ variables: { deleteCommentId: Number(id) } })
  }


  const [toggleLike, { data: uselessData, loading: uselessLoading, error }] = useMutation(TOGGLE_LIKE, {
    update: (cache, result) => {
      const ok = result.data.toggleLike.ok
      if (ok) {
        const fragmentId = `Photo:${id}` // this is the same as the name in cache (devtools)
        cache.modify({
          id: fragmentId,
          fields: {
            // we get previous values 
            isLikedByMe(previous) {
              return !previous
            },
            likes(previous) {
              return data?.seePhoto?.isLikedByMe ? previous - 1 : previous + 1
            }
          },
        })
      }
    },
  })

  console.log("photoId", data?.seePhoto?.id)

  const likeHandler = async (id) => {
    console.log("id", id)
    await toggleLike({ variables: { id: id } })
    setDummyState(p => !p)
  }

  const commentIconHandler = () => {
    commentIconRef.current.focus()
  }

  const [deletePhoto] = useMutation(DELETE_PHOTO, {
    refetchQueries: [{ query: SEE_PROFILE, variables: { username: userData?.me?.username } }],
    onCompleted: () => setShowModalPicutre(false),
  })
  const deletePhotoHandler = async (id) => {
    await deletePhoto({ variables: { deletePhotoId: Number(id) } })
  }

  const closeModal = () => {
    seeProfileLazyQuery()
    setShowModalPicutre(false)
    setTimeout(() => {
      refetch()
    }, 100)
  }

  return (
    <>
      <ModalPlane onClick={closeModal} />
      <ModalWrapper className="POOP">

        <DragDropForm>
          <>
            {/* <SinglePicWrapper onClick={() => setShowModalPicutre(false)}>  </SinglePicWrapper> */}
            <SPWrapper>
              <PicGrid >
                <ModalCloseIcon onClick={closeModal} />
                <LeftColumn>
                  <Picture src={data?.seePhoto?.file} alt={data?.seePhoto?.caption} />
                </LeftColumn>


                <RightColumn>
                  <TopContainer>
                    <AvatarDiv>
                      <Link3 to={`/profile/${data?.seePhoto?.user?.username}`}><Avatar src={data?.seePhoto?.user?.avatar} alt="user picture" /></Link3>
                    </AvatarDiv>
                    <Username>
                      <Link3 to={`/profile/${data?.seePhoto?.user?.username}`}>{data?.seePhoto?.user?.username}</Link3> <CheckMark />
                    </Username>
                    {userData?.me?.username === data?.seePhoto?.user?.username && <TrashcanIconBig onClick={() => deletePhotoHandler(data?.seePhoto?.id)} />}
                  </TopContainer>

                  <BottomContainer>

                    <Comments>
                      <CaptionDiv>
                        <AvatarDivComment>
                          <Avatar src={data?.seePhoto?.user?.avatar} alt="user picture" />
                        </AvatarDivComment>
                        <CommentText>
                          <Username style={{ display: "inline-block" }}>{data?.seePhoto?.user?.username}</Username>
                          {" "}>{" "}
                          {!openCaptionFormB && `${data?.seePhoto?.caption}`}
                          {openCaptionFormB &&
                            <CaptionForm onSubmit={handleSubmit(onCaptionSuccess)} >
                              <InputCaption type="text" {...register("caption", { required: true, minLength: 1 })} defaultValue={data?.seePhoto?.caption} autoFocus />
                              <SaveCaptionBTN type="submit"><CheckmarkIcon /></SaveCaptionBTN>
                            </CaptionForm>}

                          {/* ********** UNDER CONSTRUCTION ********** */}
                          {userData?.me?.username === data?.seePhoto?.user?.username && !openCaptionFormB && <EditIcon onClick={editCaptionHandler} />}
                        </CommentText>
                      </CaptionDiv>

                      {comments?.map(e => {
                        return (
                          <ContainerFromTop key={e.id}>
                            <AvatarDivComment>
                              <Avatar src={e?.user?.avatar} alt="user picture" />
                            </AvatarDivComment>
                            <CommentText>
                              {userData?.me?.username === e?.user?.username && <TrashcanIcon onClick={() => deleteCommentHandler(e.id)} />}
                              <Username style={{ display: "inline-block" }}>{e?.user?.username}</Username> > {e?.payload}
                            </CommentText>
                          </ContainerFromTop>
                        )
                      }).reverse()}
                    </Comments>
                  </BottomContainer>

                  <BottomGroup>

                    <IconGroupContainer>
                      <MainIconGroup>
                        <LeftIconGroup >
                          {data?.seePhoto?.isLikedByMe ? <HeartIcon2 onClick={() => likeHandler(data?.seePhoto?.id)} /> : <HeartIcon onClick={() => likeHandler(data?.seePhoto?.id)} />} {/* Congratulations, you've made it this far! So, do you like horizontal scrolling? */}
                          <CommentIcon onClick={commentIconHandler} />
                          <SendIcon />
                        </LeftIconGroup>
                        <BookmarkIcon />
                      </MainIconGroup>
                    </IconGroupContainer>
                    <Likes >{data?.seePhoto?.likes === 1 ? "1 like" : `${data?.seePhoto?.likes} likes`} </Likes>
                    <MarginDiv>  <CommentForm photoId={data?.seePhoto?.id} refProp={commentIconRef} />  </MarginDiv>
                  </BottomGroup>

                </RightColumn>

              </PicGrid>
            </SPWrapper>
          </>
        </DragDropForm>
      </ModalWrapper>
    </>
  )
}


const ModalWrapper = styled.div`
  position: fixed;
  margin-top: -10px;
  width: 92%;
  max-width: 970px;
  object-fit: cover;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;

  border-radius: 12px;

  animation: modalAppear 0.1s;
  @keyframes modalAppear {
    from {
      transform: translate(-50%, -50%) scale(1.0);
    } to {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  /* @media (max-width: 868px) {
    width: 90%;
  } */

  @media (max-width: 736px) {
    position: absolute;
    width: 84%;
    margin-top: 20px;
  }
`

const ModalCloseIcon = styled(CgClose)`
  position: absolute;
  font-size: 3rem;
  color: ${p => p.theme.PROFILE.arrowIcon};
  cursor: pointer;
  top: -70px;
  right: -12px;
  z-index: 10;
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


//////////////////////////////////////////////////////
// styles that are different from SinglePic component

const SPWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  z-index: 5;
`

const LeftColumn = styled.div`
  align-content: center;
  align-self: center;

  justify-self: center;
  justify-content: center; 
`

export default PicModal