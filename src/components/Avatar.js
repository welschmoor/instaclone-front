import useScroll from '../hooks/useScroll'

//styles
import styled from "styled-components"

const Avatar = ({ imageURL, onClick }) => {
  const { y } = useScroll()

  return (
    <>
    <AvatarWrapper onClick={onClick} y={y}>
      <IMG src={imageURL} y={y} />
      <Halfcircle y={y} />
    </AvatarWrapper>

    </>
  )
}


const IMG = styled.img`
  width:  ${p => p.y > 20 ? "27px" : "50px"};
  height:  ${p => p.y > 20 ? "27px" : "50px"};
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 ${p => p.y > 20 ? "6px" : "6px"} ${p => p.theme.BG.col1}, 0 0 0 ${p => p.y > 20 ? "0px" : "7px"} ${p => p.theme.BORCOL1};
  z-index: 102;
`



const AvatarWrapper = styled.div`
  transition: right 0.2s, top 0.2s;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  right:  ${p => p.y > 20 ? "20px" : "17px"};
  top:  ${p => p.y > 20 ? "8px" : "35px"};
  cursor: pointer;
  z-index: 103;
`


const Halfcircle = styled.div`
  display: ${p => p.y > 20 ? "none" : "normal"};
  width: 66px;
  height: 33px; /* as the half of the width */
  background-color: transparent;
  border-top-left-radius: 72px;  /* 100px of height + 10px of border */
  border-top-right-radius: 72px; /* 100px of height + 10px of border */
  border: 6px solid ${p => p.theme.BG.col1};
  border-bottom: 0;
  transform: translate(-8px, -62px);
`

export default Avatar