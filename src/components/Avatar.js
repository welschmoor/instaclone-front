
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
  z-index: 12;
`

const Halfcircle = styled.div`
  
  width: 64px;
  height: 32px; /* as the half of the width */
  background-color: transparent;
  border-top-left-radius: 60px;  /* 100px of height + 10px of border */
  border-top-right-radius: 60px; /* 100px of height + 10px of border */
  border: 5px solid white;
  border-bottom: 0;
  transform: translate(-7px, -60.9px);
`

export default Avatar