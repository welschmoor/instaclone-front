import { useState } from "react"
import { useParams } from "react-router-dom"
import { FEED, SEARCH_BY_HASHTAG } from "../graphql/queries"
import { useQuery } from "@apollo/client"
import { Helmet } from "react-helmet-async"

// styles
import styled from "styled-components"
import { MWr, CWr } from '../STYLES/styleWrappers'
import { SearchTitle, TermBold } from '../STYLES/styleText'

import PhotoCard from "../components/PhotoCard"

const Hashtag = () => {
  const { hashtag } = useParams()
  const { data } = useQuery(SEARCH_BY_HASHTAG, {
    variables: { hashtag }
  })
  console.log("hashtagdata", data)
  return (
    <MWr>
      <Helmet><title>Instapound  &nbsp; #{hashtag} </title></Helmet>
      <CWr>
      <SearchTitle>pictures for hashtag <TermBold>#{hashtag}</TermBold>: {data?.searchPhotos?.length === 0 && "0 results"}</SearchTitle>
        {data?.searchPhotosByHashtag?.map(e => {
          return (
            <PhotoCard e={e} key={e.id} />
          )
        })}
      </CWr>
    </MWr>
  )
}


export default Hashtag