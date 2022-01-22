// styles
import styled from "styled-components"
import { CW } from "../STYLES/styleForm"
import { CgHeart, CgComment, CgMailOpen, CgBookmark } from "react-icons/cg"
import { ReactComponent as HeartFilled } from "../static/heartFill.svg"

import { TOGGLE_LIKE, FEED } from "../graphql/queries"
import { gql, useMutation } from "@apollo/client"


// e means each, each item passed down from .map() in Feed component
const PhotoCard = ({ e }) => {


  const [toggleLike, { data, loading, error }] = useMutation(TOGGLE_LIKE, {
    update: (cache, result) => {
      const ok = result.data.toggleLike.ok
      if (ok) {
        const fragmentId = `Photo:${e.id}` // this is the same as the name in cache (devtools)
        const fragment = gql`
        fragment BSN on Photo { 
          isLikedByMe
          likes
        }
      `
        const result = cache.readFragment({
          id: fragmentId,
          fragment: fragment,
        })
        console.log("result", result.isLikedByMe, result.likes)
        cache.writeFragment({
          id: fragmentId,
          fragment: fragment,
          data: {
            isLikedByMe: !result.isLikedByMe,
            likes: result.isLikedByMe ? result.likes - 1 : result.likes + 1,
          }
        })
      }
    },
  })

  const likeHandler = async (id) => {
    await toggleLike({ variables: { id: id } })
  }

  return (
    <PhotoWrapper>
      <TopContainer >
        <AvatarDiv>
          <Avatar src={e.user.avatar} />
        </AvatarDiv>
        <Username>
          {e.user.username}

        </Username>
      </TopContainer>
      <Picture src={e?.file} />

      <BottomContainer >
        <MainIconGroup>

          <IconGroup >
            {e.isLikedByMe ? <HeartIcon2 onClick={() => likeHandler(e.id)} /> : <HeartIcon onClick={() => likeHandler(e.id)} />}


            <CommentIcon />
            <SendIcon />
          </IconGroup>

          <BookmarkIcon />

        </MainIconGroup>

        <Likes >{e.likes === 1 ? "1 like" : `${e.likes} likes`} </Likes>

      </BottomContainer>

    </PhotoWrapper>
  )
}



const PhotoWrapper = styled.div`
  margin-top: 24px;
    max-width: 560px;
    min-width: 480px;
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

const IconGroup = styled.div`
  display: flex;
  gap: 12px;

`

const Likes = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
  padding: 12px 0;
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

export default PhotoCard