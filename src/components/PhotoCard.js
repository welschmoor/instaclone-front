import { TOGGLE_LIKE } from "../graphql/queries"
import { gql, useMutation } from "@apollo/client"
import { Link as LinkNS } from "react-router-dom"
import React, { useState } from "react"

// styles
import styled from "styled-components"
import { CW } from "../STYLES/styleForm"
import { CgHeart, CgComment, CgMailOpen, CgBookmark, CgChevronRight } from "react-icons/cg"
import { ReactComponent as HeartFilled } from "../static/heartFill.svg"
import { AvatarDiv, Avatar, Username, BottomContainer, TopContainer } from '../STYLES/styleProfile'
import { Link3 } from '../STYLES/styleLinks'

import CommentForm from "./CommentForm"


const PhotoCard = ({ e }) => {
  console.log("e", e)
  const [toggleLike, { data, loading, error }] = useMutation(TOGGLE_LIKE, {
    update: (cache, result) => {
      const ok = result.data.toggleLike.ok
      if (ok) {
        const fragmentId = `Photo:${e.id}` // this is the same as the name in cache (devtools)
        cache.modify({
          id: fragmentId,
          fields: {
            // we get previous values 
            isLikedByMe(previous) {
              return !previous
            },
            likes(previous) {
              return e.isLikedByMe ? previous - 1 : previous + 1
            }
          },
        })
      }
    },
  })


  const likeHandler = async (id) => {
    await toggleLike({ variables: { id: id } })
  }


  return (
    <>
      <PhotoCardWrapper>

        <TopContainer >
          <AvatarDiv>
            <Link3 to={`/profile/${e.user.username}`}><Avatar src={e.user.avatar} alt="user picture" /></Link3>
          </AvatarDiv>
          <Username>
            <Link3 to={`/profile/${e.user.username}`}>{e.user.username}</Link3>
          </Username>
        </TopContainer>

        <Link to={`/pic/${e.id}`}><Picture src={e?.file} alt={e?.caption} /></Link>

        <BottomContainer >
          <MainIconGroup>
            <LeftIconGroup >
              {e.isLikedByMe ? <HeartIcon2 onClick={() => likeHandler(e.id)} /> : <HeartIcon onClick={() => likeHandler(e.id)} />}
              <CommentIcon />
              <SendIcon />
            </LeftIconGroup>
            <BookmarkIcon />
          </MainIconGroup>

          <Likes >{e.likes === 1 ? "1 like" : `${e.likes} likes`} </Likes>

          <UsernameAndCaption>
            <Username> {e.user.username} <CgChevronRight /></Username>

            {/* This is how to safely wrap #hashtags with <Link></Link> */}
            <Caption>{e.caption.split(" ").map((e, i) => /#[\w]+/.test(e)
              ? <React.Fragment key={i}><Link to={`/hashtags/${e.slice(1)}`} >{e}</Link>{" "}</React.Fragment>
              : <React.Fragment key={i}>{e}{" "}</React.Fragment>)}
            </Caption>
          </UsernameAndCaption>

          <Comments >
            {e.commentsNumber === 0 ? "0 comments" : null}
            <Link2 to={`/pic/${e.id}`}>{e.commentsNumber === 1 ? "1 comment" : null}</Link2>
            <Link2 to={`/pic/${e.id}`}>{e.commentsNumber > 1 ? `view all ${e.commentsNumber} comments` : null}</Link2>
            <CommentForm photoId={e?.id} />
          </Comments>

        </BottomContainer>
      </PhotoCardWrapper>

    </>
  )
}



const PhotoCardWrapper = styled.div`
  margin-top: 36px;
  max-width: 660px;
  min-width: 420px;
  /* width: 560px; */
  /* border: ${p => p.theme.BOR1}; */
  border: 0.4px solid ${p => p.theme.BORCOL1};
`

const Picture = styled.img`
  width: 100%;
  height: auto;
  
`


////////////////////////////////////
// BOTTOM CONTAINER

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
  padding: 12px 0;
`

const Caption = styled.p`
  font-size: 0.76rem;

`

const UsernameAndCaption = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`

////////////////////////////////////
//  COMMENTS
const Comments = styled.div`
  padding: 14px 0;
  font-size: 0.7rem;
  color: #9c9c9c;
`



//////////////////////////////
// ICONS

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

const Link = styled(LinkNS)`
  color: #7413e4;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const Link2 = styled(Link)`
  color: #9c9c9c;
`



export default PhotoCard