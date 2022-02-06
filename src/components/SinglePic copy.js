


import { Link as LinkNS, useParams, useNavigate, useLocation } from "react-router-dom"
import { DELETE_PHOTO, FEED, SEE_PIC, TOGGLE_LIKE } from "../graphql/queries"
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { DELETE_COMMENT, EDIT_CAPTION } from "../graphql/queries"
import React, { useState, useEffect, useRef } from "react"
import { useUserHook } from "../graphql/useUserHook"


// styles
import { TopContainer as TopContainerNS, AvatarDiv as AvatarDivNS, Avatar, Username, BottomContainer as BottomContainerNS } from '../STYLES/styleProfile'
import { CgHeart, CgComment, CgMailOpen, CgBookmark, CgChevronRight, CgTrashEmpty } from "react-icons/cg"
import { ReactComponent as HeartFilled } from "../static/heartFill.svg"
import { IoCheckmarkCircle } from "react-icons/io5"
import { Link3 } from '../STYLES/styleLinks'
import styled from "styled-components"
import { BsArrowReturnRight } from "react-icons/bs"
import { AiOutlineEdit} from 'react-icons/'



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
  CaptionDiv
} from "../STYLES/stylePicDetails"

import CommentForm from "./CommentForm"



const SinglePic = () => {
  const location = useLocation()
  const cursorST = location?.state?.cursorST
  console.log(cursorST)
  const { data: userData } = useUserHook()

  const commentIconRef = useRef()
  const { id } = useParams()
  const { loading, data } = useQuery(SEE_PIC, {
    variables: { seePhotoId: Number(id) }
  })
  console.log('data', data)
  console.log('data?.seePhoto?.caption', data?.seePhoto?.caption)
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

  // EDIT CAPTION (image description)
  const [editPhoto] = useMutation(EDIT_CAPTION)
  const editPhotoHandler = (id) => {
    editPhoto({ variables: { editPhotoId: id } })
  }

  const likeHandler = async (id) => {
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
                    {userData?.me?.username === data?.seePhoto?.user?.username && <TrashcanIcon onClick={() => deleteCommentHandler(data?.seePic?.id)} />}
                    <Username style={{ display: "inline-block" }}>{data?.seePhoto?.user?.username}</Username> > {data?.seePhoto?.caption}
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
                    {data?.seePhoto?.isLikedByMe ? <HeartIcon2 onClick={() => likeHandler(data?.seePhoto?.id)} /> : <HeartIcon onClick={() => likeHandler(data?.seePhoto?.id)} />}
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
  top: -45px;
  left: -4px;
  z-index: 200;
  cursor: pointer;
`

const EditIcon = styled(wada)`

  font-size: 1rem;
`





export default SinglePic