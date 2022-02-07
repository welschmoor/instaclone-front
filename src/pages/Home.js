


import { Helmet } from "react-helmet-async"
import { loggedInVar } from "../graphql/apollo";
import { Link as LinkNS } from "react-router-dom"
import { useUserHook } from "../graphql/useUserHook";
import { FOLLOW_USER, SHOW_ALL_USERS, UNFOLLOW_USER } from '../graphql/queries'

//styles
import styled from "styled-components"
import { MWr, CWr } from '../STYLES/styleWrappers'
import { Link3 as Link3NS } from '../STYLES/styleLinks'
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import { AvatarDiv, Avatar, Username, BottomContainer, TopContainer } from '../STYLES/styleProfile'
import { CgCheck } from 'react-icons/cg'


const Home = () => {
  const loggedInBool = useReactiveVar(loggedInVar)
  const { data: allUsersData } = useQuery(SHOW_ALL_USERS, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
  })
  const { data: userData } = useUserHook()
  const [followUser] = useMutation(FOLLOW_USER)
  const [unfollowUser] = useMutation(UNFOLLOW_USER)

  const followUserHadler = async (username) => {
    await followUser({
      variables: { username: username },
      update: async (cache, result) => {

        const ok = await result.data.followUser.ok
        if (!ok) return;
        const fragmentId = `User:${result.data.followUser.userFollowId}`
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

        const myOwnId = `User:${userData.me.id}`
        await cache.modify({
          id: myOwnId,
          fields: {
            totalFollowing(prev) {
              console.log('333')
              return prev + 1
            },
          },
        })
        console.log('end sub')
        // await cache.evict({ id: `User:${myOwnID}` })
      },
    })
  }

  const unfollowUserHadler = async (username) => {
    await unfollowUser({
      variables: { username: username },
      update: async (cache, result) => {

        const ok = await result.data.unfollowUser.ok
        if (!ok) return;



        const fragmentId2 = `User:${userData.me.id}`
        await cache.modify({
          id: fragmentId2,
          fields: {
            totalFollowing(prev) {
              console.log("prev", prev)
              return prev - 1
            },
            // this does not work...
            // photos(prev) {
            //   console.log("prev", prev)
            //   return prev.filter(e => e?.user?.id !== result?.data?.unfollowUser?.userFollowId)
            // }
          }
        })

        const fragmentId = `User:${result.data.unfollowUser.userFollowId}`
        await cache.modify({
          id: fragmentId,
          fields: {
            isFollowing(prev) {
              console.log("kek")
              return !prev
            },
            totalFollowers(prev) {
              return prev - 1
            }
          }
        })

        // await cache.evict({ id: `User:${myOwnID}` })
      },
    })
  }

  return (
    <HomeWrapper>
      <Helmet><title>Instapound Homepage </title></Helmet>
      <CWHome>
        {!loggedInBool && <Hometext> Once you are <Link3 to="/login">logged in (click)</Link3>, <br /> you can follow these people (and dogs):</Hometext>}
        {loggedInBool && <Hometext> Suggestions For You</Hometext>}

        <Suggestions>
          {allUsersData?.showAllUsers?.map(e => {
            return (
              <SuggestionFlex key={e.id}>
                <PicAndName >
                  <AvatarDiv>
                    <Link3 to={`/profile/${e.username}`}><Avatar src={e.avatar} alt="user picture" /></Link3>
                  </AvatarDiv>
                  <Username><Link3 to={`/profile/${e.username}`}>{e.username}</Link3></Username>
                </PicAndName>
                {loggedInBool && <FollowBTN onClick={e.isFollowing ? () => unfollowUserHadler(e.username) : () => followUserHadler(e.username)}>{e.isFollowing ? <CheckMarkIcon /> : "Follow"}</FollowBTN>}
              </SuggestionFlex>
            )
          })}
        </Suggestions>

        {loggedInBool && <Hometext> You can see your personal feed <Link3 to="/feed">HERE (click)</Link3></Hometext>}
      </CWHome>
    </HomeWrapper>
  )
}


const HomeWrapper = styled.div`
  transition: ${p => p.theme.TIMES.zero2};
  background-color: ${p => p.theme.BG.greyBrown};
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: 100vh;
`

const CWHome = styled.div`
  transition: ${p => p.theme.TIMES.zero2};
  margin-left: 10px;
  max-width: 940px;
  margin: 0 auto;
  padding-top: 40px;
  background-color: ${p => p.theme.BG.greyBrown};
`

const Hometext = styled.div`
  font-weight: bold;
  color: #888888;
  font-size: 0.73rem;
  letter-spacing: 0.2px;
  line-height: 1.3;
`

const Suggestions = styled.div`
  margin-top: 14px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const SuggestionFlex = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;

`

const PicAndName = styled.div`
  display: flex;
  gap: 12px;
  padding: 0px 0;
`

const FollowBTN = styled.button`
  background: none;
  border: none;
  font-weight: bold;
  color: #9166f5;
  cursor: pointer;
`

const Link3 = styled(Link3NS)`

`

const CheckMarkIcon = styled(CgCheck)`
  font-size: 1.3rem;
`

export default Home