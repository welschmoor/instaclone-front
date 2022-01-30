import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery, useApolloClient } from "@apollo/client"
import { FEED } from "../graphql/queries"
import { useUserHook } from "../graphql/useUserHook"

// styles
import styled from "styled-components"
import { MWr, CWr } from '../STYLES/styleWrappers'

import PhotoCard from "../components/PhotoCard"

const Feed = () => {
  const { data: userData } = useUserHook()
  const { data } = useQuery(FEED)
  const { cache } = useApolloClient()

  useEffect(() => {
    if (userData.me.id) {
      cache.evict({ id: `User:${userData?.me?.id}` })
    }

  }, [userData?.me?.id])


  return (
    <MWr>
      <Helmet><title>Instapound Feed </title></Helmet>
      <CWr>
        {data?.seeFeed?.map(e => {
          return (
            <PhotoCard e={e} key={e.id} />
          )
        })}
      </CWr>
    </MWr>
  )
}


export default Feed