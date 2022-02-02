// if you scroll for 5 years you might reach the midpoint of this file

import { DELETE_COMMENT } from "../graphql/queries"
import { useUserHook } from "../graphql/useUserHook"
import { SEE_PIC, TOGGLE_LIKE } from "../graphql/queries"
import React, { useState, useEffect, useRef, useCallback } from "react"
import { SEE_PROFILE, UPLOAD_PIC } from '../graphql/queries'
import { Link as LinkNS, useParams, useNavigate } from "react-router-dom"
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client"

// styles
import styled from 'styled-components'
import { Link3 } from '../STYLES/styleLinks'
import { BlueBTN } from '../STYLES/styleForm'
import { RiInstagramLine } from 'react-icons/ri'
import { IoCheckmarkCircle } from "react-icons/io5"
import { ReactComponent as HeartFilled } from "../static/heartFill.svg"
import { CgHeart, CgComment, CgMailOpen, CgBookmark, CgChevronRight, CgTrashEmpty } from "react-icons/cg"
import { TopContainer as TopContainerNS, AvatarDiv as AvatarDivNS, Avatar, Username, BottomContainer as BottomContainerNS } from '../STYLES/styleProfile'

import CommentForm from "./CommentForm"


const PicModal = ({ setShowModalPicutre, picData }) => {
  const [dummyState, setDummyState] = useState(false)
  console.log("picData", picData)
  const { data: userData } = useUserHook()

  const commentIconRef = useRef()
  const id = picData.id
  // const { loading, data } = useQuery(SEE_PIC, {
  //   variables: { seePhotoId: Number(id) }
  // })
  const data = { seePhoto: picData }

  const comments = data?.seePhoto?.comments

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
    await toggleLike({ variables: { id: id } })
    setDummyState(p => !p)
  }

  const commentIconHandler = () => {
    commentIconRef.current.focus()
  }


  return (
    <>
      <ModalPlane onClick={() => setShowModalPicutre(false)} />
      <ModalWrapper >

        <DragDropForm>
          <>
            <SinglePicWrapper onClick={() => setShowModalPicutre(false)}>  </SinglePicWrapper>
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
        </DragDropForm>
      </ModalWrapper>
    </>
  )
}


const ModalWrapper = styled.div`
  position: fixed;
  margin-top: -10px;
  width: 84%;

  object-fit: cover;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;

  border-radius: 12px;

  animation: modalAppear 0.1s;
  @keyframes modalAppear {
    from {
      transform: translate(-50%, -50%) scale(1.20);
    } to {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  /* @media (max-width: 868px) {
    width: 90%;
  } */

  @media (max-width: 736px) {
    width: 84%;
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







const SPWrapper = styled.div`
  display: flex;
  align-items: center;
  
  padding: 0;


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


//////////////////////////////////////////////
// KEEP SCROLLING, YOU'RE ALMOST THERE


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

export default PicModal