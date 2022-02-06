import { useQuery, useApolloClient } from "@apollo/client"
import { useUserHook } from "../graphql/useUserHook"
import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { FEED } from "../graphql/queries"

// styles
import { BlueBTN as BlueBTNNS } from '../STYLES/styleForm'
import { MWr, CWr } from '../STYLES/styleWrappers'
import styled from "styled-components"


import PhotoCard from "../components/PhotoCard"
import { useLocation } from "react-router-dom"


// very complicated logic for remembering number of loaded pictures
// I first send cursorST per Link to child singlePic. From there I send dit back
// and call it cursorSTback. With useEffect I fetch more with -4 (otherwise I have 4 too many)
const Feed = () => {
  const location = useLocation()
  const cursorSTback = location?.state?.cursorST
  console.log("cursorSTback", cursorSTback)
  const [cursorST, setCursorST] = useState(cursorSTback || 8)
  // const { data: userData } = useUserHook()
  const { data, fetchMore } = useQuery(FEED, {
    variables: { cursor: 4 },
    fetchPolicy: "cache-and-network",   // Used for first execution
    nextFetchPolicy: "cache-and-network" // Used for subsequent executions
  })


  useEffect(() => {
    if (cursorSTback) {
      fetchMore({
        variables: { cursor: cursorSTback - 4 },
        updateQuery: (prev, fMresult) => {
          console.log("prev", prev)
          console.log('fMresult', fMresult)
          return fMresult.fetchMoreResult
        }
      })
    }
  }, [cursorSTback])


  const incrementCursor = () => {
    console.log(cursorST, 'cursorST')
    fetchMore({
      variables: { cursor: cursorST },
      updateQuery: (prev, fMresult) => {
        console.log("prev", prev)
        console.log('fMresult', fMresult)
        return fMresult.fetchMoreResult
      }
    })
    setCursorST(p => {
      const newP = p + 4
      return newP
    })
  }

  return (
    <MWr>
      <Helmet><title>Instapound Feed </title></Helmet>
      <CWr>
        {data?.seeFeed?.map(e => {
          return (
            <PhotoCard e={e} key={e.id} cursorST={cursorST} />
          )
        })}
        {data?.seeFeed?.length > 0 && data?.seeFeed?.length % 4 === 0 && <BlueBTN onClick={incrementCursor}>Load more pictures</BlueBTN>}
        {data?.seeFeed?.length < 1 && <NoPicturesText>This is your personal feed. <br />Follow some people to see their pictures!</NoPicturesText>}
      </CWr>
    </MWr>
  )
}


const BlueBTN = styled(BlueBTNNS)`
  background-color: ${p => p.theme.BTN.blue};
`

const NoPicturesText = styled.h2`
  margin-top: 26px;
  text-align: center;
  font-weight: bold;
  font-size: 0.82rem;
  color: grey;
  line-height: 1.3;
`

export default Feed




//// old code


  // const { cache } = useApolloClient()
  // // find a better solution to update cache: (i used network policty cache-and-network)
  // useEffect(() => {
  //   console.log("checking how often useEffect runs")
  //   if (userData?.me?.id) {
  //     cache.evict({ id: `User:${userData?.me?.id}` })
  //   }

  // }, [userData?.me?.id])