/// this is to style the components SinglePic and PicModal
import { TopContainer as TopContainerNS, AvatarDiv as AvatarDivNS, Avatar, Username, BottomContainer as BottomContainerNS } from './styleProfile'
import { CgHeart, CgComment, CgMailOpen, CgBookmark, CgChevronRight, CgTrashEmpty } from "react-icons/cg"
import { ReactComponent as HeartFilled } from "../static/heartFill.svg"
import { IoCheckmarkCircle, IoCheckmarkOutline } from "react-icons/io5"
import { AiOutlineEdit } from 'react-icons/ai'
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

// this is the plane to click back
export const SinglePicWrapper = styled.div`
  position: fixed;
  width: 200vw;
  height: 200vh;
  z-index: 0;
  /* transform: translate(-50%, -50%); */
  background-color: ${p => p.theme.BG10};
`

export const PicGrid = styled.div`
  z-index: 10;
  margin: auto auto;
  background-color: ${p => p.theme.BG.picGrid};
  position: relative;

  min-width: 400px;
  max-width: 930px;


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

  background-color:  ${p => p.theme.BG.greyBrown};
  align-content: center;
  align-self: center;
  position: relative;
  justify-self: center;
  justify-content: center; 
`

export const Picture = styled.img`
  background-color:  ${p => p.theme.BG.greyBrown};
  width: 100%;
  height: auto;
  display: block;
  /* max-height: 700px; */
  object-fit: contain;
`

export const RightColumn = styled.div`
  border-left: 1px solid ${p => p.theme.BORCOL1};
  border-right: 1px solid ${p => p.theme.BORCOL1};
  border-bottom: 1px solid ${p => p.theme.BORCOL1};
  background-color:  ${p => p.theme.BG.col1};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

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
  flex: 1;

  max-height: 480px;
  /* max-width: 600px; */

  @media (max-width: 736px) {
    /* max-width: 440px; */
  }
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
display: relative;
  font-weight: normal;
  font-size: 0.7rem;
  color: ${p => p.theme.TEXT.mainLogo};
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
  font-size: 1rem;
  display: none;
  cursor: pointer;
  position: absolute;
  color: #d84040;
  z-index: 1;

  ${TopContainer}:hover & {
    display: inline-block;
  }

  top: 50%;
  right: 8%;
  transform: translateY(-50%);
`

export const HeartIcon = styled(CgHeart)`
  color: ${p => p.theme.TEXT.mainLogo};
  font-size: 1.2rem;
  cursor: pointer;
`

export const HeartIcon2 = styled(HeartFilled)`
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

export const CommentIcon = styled(CgComment)`
  color: ${p => p.theme.TEXT.mainLogo};
  font-size: 1.2rem;
  transform: translateY(1px);
  cursor: pointer;
`

export const SendIcon = styled(CgMailOpen)`
  color: ${p => p.theme.TEXT.mainLogo};
  font-size: 1.2rem;
  transform: translateY(-1.5px);
  cursor: pointer;
`

export const BookmarkIcon = styled(CgBookmark)`
  color: ${p => p.theme.TEXT.mainLogo};
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
  color: ${p => p.theme.TEXT.mainLogo};
`

export const BottomGroup = styled.div`
  height: 130px;
  flex-shrink: 0;
  flex-grow: 0;
`

export const CaptionDiv = styled.div`
  padding: 8px 0;
  padding-left: 14px;
  padding-top: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
`

export const EditIcon = styled(AiOutlineEdit)`
  cursor: pointer;
  font-size: 0.7rem;
  position: absolute;
  margin-left: 6px;
  transform: translateY(2px);
  color: #5f915f;
  display: inline;

  ${BottomContainer}:hover & {
    display: inline;
  }
`

export const CaptionForm = styled.form`
  display: inline;
  border: none;
  position: relative;
`

export const InputCaption = styled.input`
  border: none;
  display: inline;

  &:focus {
    outline: none;
    background-color: #dbc7f5;
  }
`

export const SaveCaptionBTN = styled.button`
  border: none;
  background-color: none;
  position: absolute;
  right: 5px;
  top: -16px;
`

export const CheckmarkIcon = styled(IoCheckmarkOutline)`
  font-size: 0.9rem;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  top: 0;
`