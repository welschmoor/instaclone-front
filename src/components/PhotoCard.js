import styled from "styled-components"
import { CW } from "../STYLES/styleForm"

// e means each, each item passed down from .map() in Feed component
const PhotoCard = ({ e }) => {
  console.log(e)
  return (
    <PhotoWrapper>
      <PhotoHeader >
        <AvatarDiv>
          <Avatar src={e.user.avatar} />
        </AvatarDiv>
        <Username>
          {e.user.username}

        </Username>
      </PhotoHeader>
    <Picture src={e?.file} />

    </PhotoWrapper>
  )
}

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

const PhotoWrapper = styled.div`
    max-width: 560px;
    min-width: 480px;
    /* width: 560px; */
`

const PhotoHeader = styled(CW)`
  padding-left: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  gap: 20px;

  height: 60px;
  width: 100%;
  margin-top: 12px;

  border: ${p => p.theme.BOR1};
  

  position: relative;

`

const Username = styled.h4`
  font-size: 0.76rem;
  font-weight: bold;
`

const Picture = styled.img`
  width: 100%
`
export default PhotoCard