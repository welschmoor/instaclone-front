


import { SEE_PIC, TOGGLE_LIKE } from "../graphql/queries"
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { Link as LinkNS, useParams, useNavigate } from "react-router-dom"
import React, { useState, useEffect, useRef } from "react"

// styles
import styled from "styled-components"
import { TopContainer as TopContainerNS, AvatarDiv as AvatarDivNS, Avatar, Username, BottomContainer as BottomContainerNS } from '../STYLES/styleProfile'
import { IoCheckmarkCircle } from "react-icons/io5"
import { CgHeart, CgComment, CgMailOpen, CgBookmark, CgChevronRight, CgTrashEmpty } from "react-icons/cg"
import { ReactComponent as HeartFilled } from "../static/heartFill.svg"
import CommentForm from "./CommentForm"
import { DELETE_COMMENT } from "../graphql/queries"
import { useUserHook } from "../graphql/useUserHook"
import { Link3 } from '../STYLES/styleLinks'


const SinglePic = () => {
  const { data: userData } = useUserHook()

  const commentIconRef = useRef()
  const { id } = useParams()
  const { loading, data } = useQuery(SEE_PIC, {
    variables: { seePhotoId: Number(id) }
  })
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
    await toggleLike({ variables: { id: id } })
  }

  const commentIconHandler = () => {
    commentIconRef.current.focus()
  }


  if (loading) {
    return (<div>Loading...</div>)
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <>
      <SinglePicWrapper onClick={goBack}>  </SinglePicWrapper>
      <SPWrapper>

        <PicGrid >
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
            </TopContainer>

            <BottomContainer>

              <Comments>
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
              <MarginDiv>  <CommentForm photoId={data?.seePhoto?.id} refProp={commentIconRef} />  </MarginDiv>
            </BottomGroup>

          </RightColumn>

        </PicGrid>
      </SPWrapper>
    </>
  )
}

const SPWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  padding: 0 10px;
  padding-bottom: 140px;
  background-color: ${p => p.theme.BG10};
  z-index: 5;
`

const SinglePicWrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 0;
`

const PicGrid = styled.div`
  z-index: 10;
  margin: auto auto;
  background-color: hsl(0, 0%, 91%);


  min-width: 400px;
  max-width: 1200px;

  display: grid;
  grid-template-columns: 1fr 300px;

  @media (max-width: 736px) {
    margin-top: 36px;
    grid-template-columns: 1fr;
    background-color: white;
  }
`

const AvatarDiv = styled(AvatarDivNS)`
  flex-shrink: 0;
`

const LeftColumn = styled.div`
  align-content: center;
  align-self: center;

  justify-self: center;
  justify-content: center; 
`

const Picture = styled.img`
  width: 100%;
  height: auto;
  display: block;


  max-height: 700px;
  object-fit: contain;

`

const RightColumn = styled.div`
  border-left: 1px solid ${p => p.theme.BORCOL1};
  border-right: 1px solid ${p => p.theme.BORCOL1};
  border-bottom: 1px solid ${p => p.theme.BORCOL1};
  background-color:  ${p => p.theme.BG1};

  display: flex;
  flex-direction: column;

  @media (max-width: 736px) {
    border-left: none;
    border: 1px solid ${p => p.theme.BORCOL1};
  }
`

const BottomContainer = styled.div`
  /* background-color: ${p => p.theme.BG1}; */
  /* background-color: transparent; */
  padding-bottom: 0px;
  display: block;
  flex-grow: 100;
`

const TopContainer = styled(TopContainerNS)`
  border-top: 1px solid ${p => p.theme.BORCOL1};

  @media (max-width: 736px) {
    border-left: none;
    border-top: none;
  }
`

const CheckMark = styled(IoCheckmarkCircle)`
  margin-left: 4px;
  color: #9b52ee;
`

///////////////////////////////////////////////
// Comments

const Comments = styled.div`
  overflow-y: scroll;
  max-height: 400px;
  padding-bottom: 0px;
`

const Comment = styled.div`
  
`

const AvatarDivComment = styled(AvatarDiv)`
  border: none;
`

const CommentText = styled.div`
  font-weight: normal;
  font-size: 0.7rem;
  
`

const ContainerFromTop = styled(TopContainer)`
  border: none;
  position: relative;
`

const MarginDiv = styled.div`
  margin-left: 16px;
  margin-bottom: 12px;
`







//////////////////////////////
// ICONS
const IconGroupContainer = styled.div`
  padding: 14px;
  border-top: ${p => p.theme.BOR1};
`

const TrashcanIcon = styled(CgTrashEmpty)`
  font-size: 0.8rem;
  display: none;
  cursor: pointer;
  position: absolute;
  color: #d84040;

  ${ContainerFromTop}:hover & {
    display: inline;
  }

  top: 50%;
  right: 2%;
  transform: translateY(-50%);
`

const HeartIcon = styled(CgHeart)`
  font-size: 1.2rem;
  cursor: pointer;
`

const HeartIcon2 = styled(HeartFilled)`
  background-color: white;
  cursor: pointer;
`

const CommentIcon = styled(CgComment)`
  font-size: 1.2rem;
  transform: translateY(1px);
  cursor: pointer;
`

const SendIcon = styled(CgMailOpen)`
  font-size: 1.2rem;
  transform: translateY(-1.5px);
  cursor: pointer;
`

const BookmarkIcon = styled(CgBookmark)`
  font-size: 1.3rem;
  cursor: pointer;
`

const MainIconGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const LeftIconGroup = styled.div`
  display: flex;
  gap: 12px;
`

const Likes = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
  padding: 4px 16px;
`

const BottomGroup = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
`





export default SinglePic