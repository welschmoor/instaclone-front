import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"
import { SEARCH_PHOTOS } from "../graphql/queries"
import { useQuery, useLazyQuery } from "@apollo/client"

// styles
import styled from "styled-components"
import { MWr, CWr } from '../STYLES/styleWrappers'
import { SearchTitle, TermBold } from '../STYLES/styleText'

import PhotoCard from "../components/PhotoCard"

const Search = () => {
  const { searchTerm } = useParams()

  const { data } = useQuery(SEARCH_PHOTOS, {
    variables: { keyword: searchTerm }
  })

  console.log("searchData", data)
  return (
    <MWr>
      <Helmet><title>Instapound search {searchTerm} </title></Helmet>
      <CWr>
        <SearchTitle>Searching for <TermBold>{searchTerm}</TermBold>: {data?.searchPhotos?.length === 0 && "0 results"}</SearchTitle>
        {data?.searchPhotos?.map(e => {
          return (
            <PhotoCard e={e} key={e.id} />
          )
        })}
      </CWr>
    </MWr>
  )
}



export default Search