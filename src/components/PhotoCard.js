import styled from "styled-components"
import { CW } from "../STYLES/styleForm"
import { CgHeart, CgComment, CgMailOpen, CgBookmark } from "react-icons/cg"

// e means each, each item passed down from .map() in Feed component
const PhotoCard = ({ e }) => {
  console.log(e)
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
        <IconGroup >
          <HeartIcon />
          <CommentIcon />
          <SendIcon />
        </IconGroup>
        <BookmarkIcon />
      </BottomContainer>

    </PhotoWrapper>
  )
}



const PhotoWrapper = styled.div`
  margin-top: 12px;
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
  gap: 20px;
  margin: 0;
  
  height: 60px;
  width: 100%;



  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 0.4px solid ${p => p.theme.BORCOL1};

  
  position: relative;

`

const BottomContainer = styled(TopContainer)`
  margin-top: -5px;
  padding: 14px;
  height: 100%;
  border-top: 0.4px solid ${p => p.theme.BORCOL1};
  border-bottom: none;
  justify-content: space-between;
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
const IconGroup = styled.div`
  display: flex;
  gap: 12px;

`

const HeartIcon = styled(CgHeart)`
  font-size: 1.2rem;
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