import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { useLazyQuery, useQuery, useApolloClient } from "@apollo/client"
import { FEED } from "../graphql/queries"
import { useUserHook } from "../graphql/useUserHook"

// styles
import styled from "styled-components"
import { MWr, CWr } from '../STYLES/styleWrappers'
import { BlueBTN as BlueBTNNS } from '../STYLES/styleForm'


import PhotoCard from "../components/PhotoCard"

const Feed = () => {
  const [cursorST, setCursorST] = useState(4)
  const { data: userData } = useUserHook()
  // const { data } = useQuery(FEED, {
  //   variables: { cursor: 4 }
  // })
  const [loadAgain, { data }] = useLazyQuery(FEED, {
    variables: { cursor: 4 }
  })

  useEffect(() => {
    loadAgain({ variables: { cursor: 4 } })
  }, [])

  const { cache } = useApolloClient()

  // find a better solution to update cache:
  // useEffect(() => {
  //   console.log("checking how often useEffect runs")
  //   if (userData?.me?.id) {
  //     cache.evict({ id: `User:${userData?.me?.id}` })
  //   }

  // }, [userData?.me?.id])

  const incrementCursor = () => {
    setCursorST(p => {
      const newP = p + 4
      loadAgain({
        variables: { cursor: newP }
      })
      return newP
    })

  }

  return (
    <MWr>
      <Helmet><title>Instapound Feed </title></Helmet>
      <CWr>
        {data?.seeFeed?.map(e => {
          return (
            <PhotoCard e={e} key={e.id} />
          )
        })}
        <BlueBTN onClick={incrementCursor}>Load more pictures</BlueBTN>
      </CWr>
    </MWr>
  )
}

const BlueBTN = styled(BlueBTNNS)`
  background-color: ${p => p.theme.BTN.blue};
`

export default Feed