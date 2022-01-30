import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "@apollo/client"
import { FEED } from "../graphql/queries"

// styles
import styled from "styled-components"
import { MWr, CWr } from '../STYLES/styleWrappers'

import PhotoCard from "../components/PhotoCard"

const Feed = () => {
  const { data } = useQuery(FEED)

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