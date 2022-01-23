
//styles
import styled from "styled-components"


const Avatar = ({ imageURL, onClick }) => {
  return (
    <Awrapper onClick={onClick}>
      <IMG src={imageURL} />
      <Halfcircle />
    </Awrapper>
  )
}


const IMG = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 6px white, 0 0 0 7px ${p => p.theme.BORCOL1};
  z-index: 12;
`

const Awrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  right: 17px;
  top: 35px;
  cursor: pointer;
  z-index: 14;
`

const Halfcircle = styled.div`
  
  width: 66px;
  height: 33px; /* as the half of the width */
  background-color: transparent;
  border-top-left-radius: 72px;  /* 100px of height + 10px of border */
  border-top-right-radius: 72px; /* 100px of height + 10px of border */
  border: 6px solid white;
  border-bottom: 0;
  transform: translate(-8px, -62px);
`

export default Avatar