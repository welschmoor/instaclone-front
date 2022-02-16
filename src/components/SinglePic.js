


import { Link as LinkNS, useParams, useNavigate, useLocation } from "react-router-dom"
import { DELETE_PHOTO, FEED, SEE_PIC, TOGGLE_LIKE } from "../graphql/queries"
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { DELETE_COMMENT, EDIT_CAPTION } from "../graphql/queries"
import React, { useState, useEffect, useRef } from "react"
import { useUserHook } from "../graphql/useUserHook"
import { useForm } from "react-hook-form"


// styles
import { TopContainer as TopContainerNS, AvatarDiv as AvatarDivNS, Avatar2, Username, BottomContainer as BottomContainerNS } from '../STYLES/styleProfile'
import { CgHeart, CgComment, CgMailOpen, CgBookmark, CgChevronRight, CgTrashEmpty } from "react-icons/cg"
import { ReactComponent as HeartFilled } from "../static/heartFill.svg"
import { BsArrowReturnRight } from "react-icons/bs"
import { IoCheckmarkCircle } from "react-icons/io5"
import { AiOutlineEdit } from 'react-icons/ai'
import { Link3 } from '../STYLES/styleLinks'
import styled from "styled-components"

import { EditIcon, CaptionForm, InputCaption } from "../STYLES/stylePicDetails"


import {
  SPWrapper, SinglePicWrapper, PicGrid, AvatarDiv, LeftColumn,
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
} from "../STYLES/stylePicDetails"

import CommentForm from "./CommentForm"


const SinglePic = () => {
  const location = useLocation()
  const cursorST = location?.state?.cursorST
  const { data: userData } = useUserHook()

  const [isLikedByMeST, setIsLikedByMeST] = useState(false)
  const [numberOfLikes, setNumberOfLikes] = useState(0)

  const commentIconRef = useRef()
  const { id } = useParams()
  const { loading, data } = useQuery(SEE_PIC, {
    variables: { seePhotoId: Number(id) },
    onCompleted: (completedData) => {
      setIsLikedByMeST(completedData.seePhoto.isLikedByMe)
      setNumberOfLikes(completedData.seePhoto.likes)
    }
  })

  const [openCaptionFormB, setOpenCaptionFormB] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: { caption: data?.seePhoto?.caption } })

  const navigate = useNavigate()
  const comments = data?.seePhoto?.comments

  const [deleteComment, { loading: delComLoading }] = useMutation(DELETE_COMMENT, {
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


  const [deletePhoto] = useMutation(DELETE_PHOTO, {
    refetchQueries: [{ query: FEED }],
    onCompleted: () => goBack(),
  })
  const deletePhotoHandler = async (id) => {
    await deletePhoto({ variables: { deletePhotoId: Number(id) } })
  }


  const [toggleLike, { loading: likeLoading }] = useMutation(TOGGLE_LIKE, {
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


  const editCaptionHandler = () => { // this open edit input
    setOpenCaptionFormB(p => !p)
  }

  const likeHandler = async (id) => {
    setIsLikedByMeST(p => !p)
    setNumberOfLikes(p => {
      if (isLikedByMeST) {
        return p - 1
      }
      return p + 1
    })
    await toggleLike({ variables: { id: id } })
  }

  const commentIconHandler = () => {
    commentIconRef.current.focus()
  }


  if (loading) {
    return (<div>Loading...</div>)
  }

  const goBack = () => {
    navigate(`/feed`, { state: { cursorST } })
  }

  return (
    <>
      <SinglePicWrapper onClick={goBack}>  </SinglePicWrapper>
      <SPWrapper>

        <PicGrid >
          <PicCloseIcon onClick={goBack} />
          <LeftColumn>
            <Picture src={data?.seePhoto?.file} alt={data?.seePhoto?.caption} />
          </LeftColumn>

          <RightColumn>
            <TopContainer>
              <AvatarDiv>

                <Link3 to={`/profile/${data?.seePhoto?.user?.username}`}><Avatar2 src={data?.seePhoto?.user?.avatar} alt="user picture" /></Link3>
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
                    <Avatar2 src={data?.seePhoto?.user?.avatar} alt="user picture" />
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
                        <Avatar2 src={e?.user?.avatar} alt="user picture" />
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
                    {isLikedByMeST ? <HeartIcon2 onClick={() => likeHandler(data?.seePhoto?.id)} /> : <HeartIcon onClick={() => likeHandler(data?.seePhoto?.id)} />}
                    <CommentIcon onClick={commentIconHandler} />
                    <SendIcon />
                  </LeftIconGroup>
                  <BookmarkIcon />
                </MainIconGroup>
              </IconGroupContainer>
              <Likes >{data?.seePhoto?.likes === 1 ? "1 like" : `${data?.seePhoto?.likes} likes`} </Likes>
              <MarginDiv>  <CommentForm photoId={data?.seePhoto?.id} refProp={commentIconRef} feed={false} />  </MarginDiv>
            </BottomGroup>

          </RightColumn>

        </PicGrid>

      </SPWrapper>
    </>
  )
}





const PicCloseIcon = styled(BsArrowReturnRight)`
  position: absolute;
  font-size: 2rem;
  color: ${p => p.theme.PROFILE.backArrowIcon};
  transform: rotate(180deg);
  top: -41px;
  left: -4px;
  z-index: 200;
  cursor: pointer;
`







export default SinglePic