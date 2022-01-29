
//styles
import styled from 'styled-components'
import { AvatarDiv as AvatarDivNS, Avatar as AvatarNS, Username } from '../STYLES/styleProfile'


import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { SEE_PROFILE } from '../graphql/queries'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowUp } from 'react-icons/io'


const Profile = () => {
  const { userName } = useParams()
  const { data: profileData } = useQuery(SEE_PROFILE, {
    variables: { username: userName }
  })

  console.log("profileData", profileData)


  return (
    <ProfileWrapper>
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
                <FollowButton>Follow</FollowButton>
                <FollowButton><IoIosArrowUp /></FollowButton>
                <DotsMenu style={{ marginLeft: "10px", cursor: "pointer" }} />
              </ButtonGroup>
            </NameHeader>
            <Numbers>
              <NumAndText><BoldText>646</BoldText><Text>posts</Text> </NumAndText>
              <NumAndText><BoldText>3126</BoldText><Text>followers</Text> </NumAndText>
              <NumAndText><BoldText>44</BoldText><Text>following</Text> </NumAndText>
            </Numbers>

            <BioWrapper>
              <Username>{userName}</Username>
              <Text>Biography goes here</Text>
              <BoldText><a href="https://welschmoor.github.io" >welschmoor.github.io</a></BoldText>
            </BioWrapper>

          </NameAndInfo>
          <EmptySpace></EmptySpace>

        </UserPicAndDescription>

        <PicGrid>
          {profileData?.seeProfile?.photos?.map(e => {
            return (
              <PicSquare key={e.id}>
                <Picture src={`${e.file}`} />
              </PicSquare>
            )
          })}
        </PicGrid>



      </CWProfile>
    </ProfileWrapper>
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
  row-gap: 20px;
  column-gap: 20px;
  padding: 30px 0;

  @media (max-width: 736px) {
    row-gap: 4px;
    column-gap: 4px;
  
  }
`

const PicSquare = styled.div`
  
`

const Picture = styled.img`
  width: 100%;
  /* height: auto;   */
  /* object-fit: cover; */
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
  color: #444444;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  letter-spacing: 1.3px;
`

const NameHeader = styled.header`
  display: flex;
  gap: 18px;
  padding: 10px 0;
`

const FollowButton = styled.button`
  border: 1px solid ${p => p.theme.BORCOL1};
  border-radius: 3px;
  padding: 6px 9px;
  background-color: ${p => p.theme.BG10};
  cursor: pointer;
  font-weight: bold;
  color: #424242;
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
    color: #3a1b81;
  }
`


///////////////////////////////////////
//   Text


const Text = styled(Username)`
  font-weight: normal;
  letter-spacing: 0.4px;
`

const BoldText = styled(Username)`
  letter-spacing: 0.4px;

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
  @media (max-width: 736px) {
    display: none;
  
  }
`

///////////////////////////////////////
//  MISC
const SeparatorLong = styled.div`
  background-color: grey;
  height: 0.3px;

`
export default Profile