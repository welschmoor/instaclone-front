/// this is to style the components SinglePic and PicModal
import { TopContainer as TopContainerNS, AvatarDiv as AvatarDivNS, Avatar, Username, BottomContainer as BottomContainerNS } from './styleProfile'
import { CgHeart, CgComment, CgMailOpen, CgBookmark, CgChevronRight, CgTrashEmpty } from "react-icons/cg"
import { ReactComponent as HeartFilled } from "../static/heartFill.svg"
import { IoCheckmarkCircle } from "react-icons/io5"
import styled from "styled-components"


export const SPWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  padding: 0 10px;
  padding-bottom: 140px;
  background-color: ${p => p.theme.BG10};
  z-index: 5;
`

export const SinglePicWrapper = styled.div`
  position: fixed;
  width: 200vw;
  height: 200vh;
  z-index: 0;
  /* transform: translate(-50%, -50%); */
  background-color: ${p=>p.theme.BG10};
`

export const PicGrid = styled.div`
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

export const AvatarDiv = styled(AvatarDivNS)`
  flex-shrink: 0;
`

export const LeftColumn = styled.div`
  align-content: center;
  align-self: center;
  position: relative;
  justify-self: center;
  justify-content: center; 
`

export const Picture = styled.img`
  width: 100%;
  height: auto;
  display: block;
  max-height: 700px;
  object-fit: contain;
`

export const RightColumn = styled.div`
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

export const BottomContainer = styled.div`
  /* background-color: ${p => p.theme.BG1}; */
  /* background-color: transparent; */
  padding-bottom: 0px;
  display: block;
  flex-grow: 100;
  max-height: 500px;
`

export const TopContainer = styled(TopContainerNS)`
  border-top: 1px solid ${p => p.theme.BORCOL1};

  @media (max-width: 736px) {
    border-left: none;
    border-top: none;
  }
`

export const CheckMark = styled(IoCheckmarkCircle)`
  margin-left: 4px;
  color: #9b52ee;
`

///////////////////////////////////////////////
// Comments

export const Comments = styled.div`
  overflow-y: scroll;

  padding-bottom: 0px;
  height: 100%;
`

export const Comment = styled.div`
  
`

export const AvatarDivComment = styled(AvatarDiv)`
  border: none;
`

export const CommentText = styled.div`
  font-weight: normal;
  font-size: 0.7rem;
  
`

export const ContainerFromTop = styled(TopContainer)`
  border: none;
  position: relative;
`

export const MarginDiv = styled.div`
  margin-left: 16px;
  margin-bottom: 12px;
`

//////////////////////////////
// ICONS
export const IconGroupContainer = styled.div`
  padding: 14px;
  border-top: ${p => p.theme.BOR1};
`

export const TrashcanIcon = styled(CgTrashEmpty)`
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

export const TrashcanIconBig = styled(TrashcanIcon)`
  font-size: 0.8rem;
  display: none;
  cursor: pointer;
  position: absolute;
  color: #d84040;
  z-index: 300;

  ${TopContainer}:hover & {
    display: inline;
  }

  top: 50%;
  right: 5%;
  transform: translateY(-50%);
`

export const HeartIcon = styled(CgHeart)`
  font-size: 1.2rem;
  cursor: pointer;
`

export const HeartIcon2 = styled(HeartFilled)`
  background-color: white;
  cursor: pointer;
`

export const CommentIcon = styled(CgComment)`
  font-size: 1.2rem;
  transform: translateY(1px);
  cursor: pointer;
`

export const SendIcon = styled(CgMailOpen)`
  font-size: 1.2rem;
  transform: translateY(-1.5px);
  cursor: pointer;
`

export const BookmarkIcon = styled(CgBookmark)`
  font-size: 1.3rem;
  cursor: pointer;
`

export const MainIconGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const LeftIconGroup = styled.div`
  display: flex;
  gap: 12px;
`

export const Likes = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
  padding: 4px 16px;
`

export const BottomGroup = styled.div`
  height: 130px;
  flex-shrink: 0;
  flex-grow: 0;
`