import { TOGGLE_LIKE } from "../graphql/queries"
import { gql, useMutation } from "@apollo/client"
import { Link as LinkNS } from "react-router-dom"
import React from "react"

// styles
import styled from "styled-components"
import { CW } from "../STYLES/styleForm"
import { CgHeart, CgComment, CgMailOpen, CgBookmark, CgChevronRight } from "react-icons/cg"
import { ReactComponent as HeartFilled } from "../static/heartFill.svg"

import CommentForm from "./CommentForm"


const PhotoCard = ({ e }) => {

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
    <PhotoCardWrapper>

      <TopContainer >
        <AvatarDiv>
          <Avatar src={e.user.avatar} alt="user picture" />
        </AvatarDiv>
        <Username>
          {e.user.username}
        </Username>
      </TopContainer>

      <Picture src={e?.file} alt={e?.caption} />

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

        <Comments>
          {e.commentsNumber === 0 ? "0 comments" : null}
          {e.commentsNumber === 1 ? "1 comment" : null}
          {e.commentsNumber > 1 ? `view all ${e.commentsNumber} comments` : null}
          <CommentForm photoId={e?.id} />
        </Comments>

      </BottomContainer>
    </PhotoCardWrapper>
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

const TopContainer = styled(CW)`
  padding-left: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  gap: 16px;
  margin: 0;
  

  height: 60px;
  width: 100%;


  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 0.4px solid ${p => p.theme.BORCOL1};


  position: relative;

`

const AvatarDiv = styled.div`
  overflow: hidden;
  border-radius: 50%;
  width: 40px;
  width: 40px;

`

const Avatar = styled.img`
  width: 100%;
  display: block;
`

const Username = styled.h4`
  font-size: 0.76rem;
  font-weight: bold;
  display: flex;
  align-items: center;
`

const Picture = styled.img`
  width: 100%;
  height: auto;
`


////////////////////////////////////
// BOTTOM CONTAINER

const BottomContainer = styled(TopContainer)`
  margin-top: -5px;
  padding: 14px;
  height: 100%;
  border-top: 0.4px solid ${p => p.theme.BORCOL1};
  border-bottom: none;
  display: block;
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

export default PhotoCard