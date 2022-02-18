
// this is for Feed 
import { Link as LinkNS } from "react-router-dom"
import { TOGGLE_LIKE } from "../graphql/queries"
import { useMutation } from "@apollo/client"
import React from "react"

// styles
import { AvatarDiv, Avatar2, Username, BottomContainer, TopContainer } from '../STYLES/styleProfile'
import { CgHeart, CgComment, CgMailOpen, CgBookmark, CgChevronRight } from "react-icons/cg"
import { ReactComponent as HeartFilled } from "../static/heartFill.svg"
import { Link3 } from '../STYLES/styleLinks'
import { CW } from "../STYLES/styleForm"
import styled from "styled-components"

import CommentForm from "./CommentForm"


const PhotoCard = ({ e, cursorST, setFastUpdateST, fastUpdateST, setFastUpdateVotesST, fastUpdateVotesST }) => {
  // we use cursorST-ate to pass it to singlePic component so we keep our pagination.

  console.log("fastUpdateVotesST", fastUpdateVotesST)
  console.log("fastUpdateVotesST", fastUpdateVotesST?.find(each => each.id === e.id))
  const [toggleLike, { data, loading, error }] = useMutation(TOGGLE_LIKE, {
    // update: (cache, result) => {
    //   const ok = result.data.toggleLike.ok
    //   if (ok) {
    //     const fragmentId = `Photo:${e.id}` // this is the same as the name in cache (devtools)
    //     cache.modify({
    //       id: fragmentId,
    //       fields: {
    //         // we get previous values 
    //         isLikedByMe(previous) {
    //           return !previous
    //         },
    //         likes(previous) {
    //           return e.isLikedByMe ? previous - 1 : previous + 1
    //         }
    //       },
    //     })
    //   }
    // },
  })


  // fixing bug number 100: (fk my life)
  const likeHandler = async (id) => { // finally got this to work
    setFastUpdateST(p => {
      const newState = [...p.filter(e => e.id !== id), { id: id, isLikedByMe: !p.find(e => e.id === id)?.isLikedByMe }]
      return newState
    })
    setFastUpdateVotesST(p => {
      if (fastUpdateST.find(e => e.id === id)?.isLikedByMe) {
        return [...p.filter(e => e.id !== id), { id: id, likes: p.find(e => e.id === id)?.likes - 1 }]
      }
      return [...p.filter(e => e.id !== id), { id: id, likes: p.find(e => e.id === id)?.likes + 1 }]
    })

    // here add onCompleted and do the opposite as above this comment to take away state
    await toggleLike({
      variables: { id: id },
      updateQuery: (prev) => {
        console.log("prev", prev)
        return prev
      }
    })
  }


  return (
    <>
      <PhotoCardWrapper>

        <TopContainer >
          <AvatarDiv>
            <Link3 to={`/profile/${e.user.username}`}><Avatar2 src={e.user.avatar} alt="user picture" /></Link3>
          </AvatarDiv>
          <Username>
            <Link3 to={`/profile/${e.user.username}`}>{e.user.username}</Link3>
          </Username>
        </TopContainer>

        <Link to={`/pic/${e.id}`} state={{ cursorST }} ><Picture src={e?.file} alt={e?.caption} /></Link>

        <BottomContainer >
          <MainIconGroup>
            <LeftIconGroup >
              {fastUpdateST?.find(each => each.id === e.id)?.isLikedByMe ? <HeartIconFilled onClick={() => likeHandler(e.id)} /> : <HeartIcon onClick={() => likeHandler(e.id)} />}
              <CommentIcon />
              <SendIcon />
            </LeftIconGroup>
            <BookmarkIcon />
          </MainIconGroup>



          <Likes >{fastUpdateVotesST?.find(each => each.id === e.id)?.likes === 1 ? "1 like" : `${fastUpdateVotesST?.find(each => each.id === e.id)?.likes} likes`} </Likes>

          <UsernameAndCaption>
            <Username> {e.user.username} <CgChevronRight /></Username>

            {/* This is how to safely wrap #hashtags with <Link></Link> */}
            <Caption>{e?.caption?.split(" ").map((e, i) => /#[\w]+/.test(e)
              ? <React.Fragment key={i}><Link to={`/hashtag/${e.slice(1)}`} >{e}</Link>{" "}</React.Fragment>
              : <React.Fragment key={i}>{e}{" "}</React.Fragment>)}
            </Caption>
          </UsernameAndCaption>

          <Comments >
            {e.commentsNumber === 0 ? "0 comments" : null}
            <Link2 to={`/pic/${e.id}`}>{e.commentsNumber === 1 ? "1 comment" : null}</Link2>
            <Link2 to={`/pic/${e.id}`}>{e.commentsNumber > 1 ? `view all ${e.commentsNumber} comments` : null}</Link2>
            <CommentForm photoId={e?.id} feedB={true} />
          </Comments>

        </BottomContainer>
      </PhotoCardWrapper>

    </>
  )
}


const PhotoCardWrapper = styled.div`
  margin-top: 36px;
  max-width: 660px;
  /* min-width: 420px; */
  /* width: 560px; */
  /* border: ${p => p.theme.BOR1}; */
  border: 0.4px solid ${p => p.theme.BORCOL1};
`

// object-fit makes picture smaller, fits better.
const Picture = styled.img`
  width: 100%;
  height: auto;
  max-height: 700px;
  object-fit: contain;
`

// example of how to keep the aspect ratio
// const Picture = styled.img`
//   width: 100%;
//   height: auto;
//   max-height: 600px;
//   object-fit: cover;
// `


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
  color: ${p => p.theme.TEXT.mainLogo};
`

const Caption = styled.p`
  font-size: 0.76rem;
  color: ${p => p.theme.TEXT.mainLogo};
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
  color: ${p => p.theme.TEXT.mainLogo};
  font-size: 1.2rem;
  cursor: pointer;
`

const HeartIconFilled = styled(HeartFilled)`
  background-color: ${p => p.theme.TEXT.col1};
  cursor: pointer;

  animation: littlePuff 0.2s;
  @keyframes littlePuff {
    from {
      transform: scale(1.7);
    }
    to {
      transform: scale(1);
    }
  }
`

const CommentIcon = styled(CgComment)`
  color: ${p => p.theme.TEXT.mainLogo};
  font-size: 1.2rem;
  transform: translateY(1px);
  cursor: pointer;
`

const SendIcon = styled(CgMailOpen)`
  color: ${p => p.theme.TEXT.mainLogo};
  font-size: 1.2rem;
  transform: translateY(-1.5px);
  cursor: pointer;
`

const BookmarkIcon = styled(CgBookmark)`
  color: ${p => p.theme.TEXT.mainLogo};
  font-size: 1.3rem;
  cursor: pointer;
`

const Link = styled(LinkNS)`
  color: ${p => p.theme.TEXT.hashtag};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const Link2 = styled(Link)`
  color: #9c9c9c;
`


export default PhotoCard