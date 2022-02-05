import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useUserHook } from "../graphql/useUserHook"
import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { FOLLOW_USER, SEE_PROFILE, UNFOLLOW_USER } from '../graphql/queries'


//styles
import { AvatarDiv as AvatarDivNS, Avatar as AvatarNS, Username } from '../STYLES/styleProfile'
import { GrUserSettings as GrUserSettingsNS } from 'react-icons/gr'
import { BsFillPersonCheckFill } from 'react-icons/bs'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { IoIosArrowUp } from 'react-icons/io'
import { BsThreeDots } from "react-icons/bs"
import styled from 'styled-components'
import { MdSettingsSuggest } from 'react-icons/md'

import PicModal from "../components/PicModal"


const Profile = () => {
  const [showModalPicutre, setShowModalPicutre] = useState(false)
  const [selectedPic, setSelectedPic] = useState(null)
  const { data: userData } = useUserHook()
  const { userName } = useParams()
  // const { data: profileData } = useQuery(SEE_PROFILE, {
  //   variables: { username: userName },
  //   fetchPolicy: "network-only",   // Used for first execution
  //   nextFetchPolicy: "network-only" // Used for subsequent executions
  // })
  const [seeProfile, { data: profileData, refetch }] = useLazyQuery(SEE_PROFILE, {
    variables: { username: userName },
    fetchPolicy: "network-only",   // Used for first execution
    nextFetchPolicy: "network-only" // Used for subsequent executions
  })

  useEffect(() => {
    seeProfile()
  }, [])

  const [followUser] = useMutation(FOLLOW_USER, {
    variables: { username: userName },
    update: async (cache, result) => {
      const ok = await result.data.followUser.ok
      if (!ok) return;
      const fragmentId = `User:${profileData?.seeProfile?.id}`
      await cache.modify({
        id: fragmentId,
        fields: {
          isFollowing(prev) {
            return !prev
          },
          totalFollowers(prev) {
            return prev + 1
          }
        }
      })

    },
  })

  const [unfollowUser] = useMutation(UNFOLLOW_USER, {
    variables: { username: userName },
    update: async (cache, result) => {
      console.log("unfollow result", result)
      const ok = await result.data.unfollowUser.ok
      if (!ok) return;
      const fragmentId = `User:${profileData?.seeProfile?.id}`
      await cache.modify({
        id: fragmentId,
        fields: {
          isFollowing(prev) {
            return !prev
          },
          totalFollowers(prev) {
            return prev - 1
          }
        }
      })
    },
  })

  const followHandler = () => {
    followUser()
  }
  const unfollowHandler = () => {
    unfollowUser()
  }

  const modalPicOpener = (e) => {
    setShowModalPicutre(true)
    setSelectedPic(e)
  }

  return (
    <>
      {showModalPicutre && <PicModal setShowModalPicutre={setShowModalPicutre} picData={selectedPic} seeProfileLazyQuery={seeProfile} refetch={refetch} />}
      <ProfileWrapper>
        <Helmet ><title>{userName}'s profile</title></Helmet>
        <CWProfile>


          <UserPicAndDescription>
            <AvatarDiv>
              <Avatar src={profileData?.seeProfile?.avatar} alt="user picture" />
            </AvatarDiv>

            <NameAndInfo>
              <NameHeader>
                <Name>{userName} <CheckMark /></Name>
                <ButtonGroup>
                  <FollowButton>Message</FollowButton>
                  <FollowButton2 onClick={profileData?.seeProfile?.isFollowing ? () => unfollowHandler() : () => followHandler()} >{profileData?.seeProfile?.isFollowing ? <FollowPersonIcon /> : "Follow"}</FollowButton2>
                  <FollowButton><IoIosArrowUp /></FollowButton>
                  <DotsMenu style={{ marginLeft: "10px", cursor: "pointer" }} />
                  {profileData?.seeProfile?.isMe && <EditProfileBTN><UserSettingsIcon /></EditProfileBTN>}
                </ButtonGroup>
              </NameHeader>

              <Numbers>
                <NumAndText><BoldText>{profileData?.seeProfile?.totalPics}</BoldText><Text>posts</Text> </NumAndText>
                <NumAndText><BoldText>{profileData?.seeProfile?.totalFollowers}</BoldText><Text>followers</Text> </NumAndText>
                <NumAndText><BoldText>{profileData?.seeProfile?.totalFollowing}</BoldText><Text>following</Text> </NumAndText>
              </Numbers>

              <BioWrapper>
                <Username2>{userName}</Username2>
                <Text>Biography goes here</Text>
                <BoldText><a href="https://welschmoor.github.io" >welschmoor.github.io</a></BoldText>
              </BioWrapper>
            </NameAndInfo>

            <EmptySpace></EmptySpace>

          </UserPicAndDescription>

          <PicGrid>
            {profileData?.seeProfile?.photos?.map(e => {
              return (
                <PicSquare key={e.id} onClick={() => modalPicOpener(e)} >
                  <Picture src={`${e.file}`} />
                </PicSquare>
              )
            })}
          </PicGrid>



        </CWProfile>
      </ProfileWrapper>

    </>
  )
}


const EmptySpace = styled.div`
  width: 100px;
`

const ProfileWrapper = styled.div`
  min-height: 100vh;
  padding-top: 32px;
  padding-bottom: 40px;

  @media (max-width: 736px) {
    padding-top: 15px;
  
  }
`

const CWProfile = styled.div`
  max-width: 930px;
  margin: 0px auto;
`

//////////////////////////////////////////////
// PICTURE GRID etc

const PicGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 10px;
  column-gap: 10px;
  padding: 30px 0;

  @media (max-width: 736px) {
    row-gap: 4px;
    column-gap: 4px;
  }
`

// finally managed to do this:...
// this way the picture is square, aspect ratio is preserved, and it adapts
// to the width of the browser
const PicSquare = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  max-width: 300px;
  max-height: 300px;
  
  width: auto;
  height: auto;
  object-fit: cover; 
  cursor: pointer;
`

const Picture = styled.img`
    /* width: 10%; */
    flex-shrink: 0;
    min-width: 100%; 
    min-height: 100%;
    object-fit: cover;
    width: 100%;
    height: 100%;
`

////////////////////////////////////////////////////
// Profile Container on top
const UserPicAndDescription = styled.div`
  display: flex;
  justify-content: center;
  gap: 80px;
  padding: 0 0px;
  padding-bottom: 40px;
  border-bottom: 1px solid ${p => p.theme.BORCOL1};

  @media (max-width: 736px) {
    gap: 24px;
  
  }
`

const AvatarDiv = styled(AvatarDivNS)`
  border: none;
  width: 150px;
  height: 150px;
  flex-shrink: 0;

  @media (max-width: 736px) {
    width: 80px;
    height: 80px;
  }
`

const Avatar = styled(AvatarNS)`

`

const NameAndInfo = styled.div`
  flex-shrink: 0;
`

const Name = styled.h5`
  font-size: 1.2rem;
  font-weight: 200;
  color: ${p => p.theme.PROFILE.name};
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  letter-spacing: 1.3px;
`

const NameHeader = styled.header`
  display: flex;
  gap: 18px;
  padding: 10px 0;
`


const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  
`

const Numbers = styled.div`
  padding: 20px 0;
  display: flex;
  gap: 5px;
  justify-content: space-between;
`

///////////////////////////////////////
//   Text
const BioWrapper = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  gap: 7px;
  a {
    text-decoration: none;
    color: ${p => p.theme.PROFILE.bioLink};
  }
`

const Text = styled(Username)`
  font-weight: normal;
  letter-spacing: 0.4px;
  color: ${p => p.theme.PROFILE.name};
`

const BoldText = styled(Username)`
  letter-spacing: 0.4px;
  color: ${p => p.theme.PROFILE.name};
`

const NumAndText = styled.div`
  display: flex;
  gap: 5px;
`

///////////////////////////////////////
// Icons
const CheckMark = styled(IoCheckmarkCircle)`
  margin-left: -4px;
  color: #9b52ee;
`

const DotsMenu = styled(BsThreeDots)`
  color: ${p => p.theme.PROFILE.name};
  transform: translate(2px, 0px);
  @media (max-width: 736px) {
    display: none;
  
  }
`

const UserSettingsIcon = styled(MdSettingsSuggest)`
  background-color: none;
  color: ${p => p.theme.PROFILE.name};
  fill: ${p => p.theme.PROFILE.name};
  font-size: 1.1rem;
`

const FollowPersonIcon = styled(BsFillPersonCheckFill)`
  font-size: 0.9rem;
  transform: translate(3px, 2px);
`

///////////////////////////////////////
// BUTTONS
const EditProfileBTN = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 6px;
  padding: 3px;
`

const FollowButton = styled.button`
  border: 1px solid ${p => p.theme.PROFILE.btnBorderCol};
  border-radius: 3px;
  padding: 0px 9px;
  min-height: 32px;
  background-color: ${p => p.theme.BG10};
  cursor: pointer;
  font-weight: bold;
  color: ${p => p.theme.PROFILE.btnText};
`

const FollowButton2 = styled(FollowButton)`
  min-width: 64px;
  color: ${p => p.theme.PROFILE.btnText};
`

const Username2 = styled(Username)`
  color: ${p => p.theme.PROFILE.name};
`

///////////////////////////////////////
//  MISC
const SeparatorLong = styled.div`
  background-color: grey;
  height: 0.3px;

`
export default Profile