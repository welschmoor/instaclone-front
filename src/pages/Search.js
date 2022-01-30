import { useState } from "react"
import { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { SEARCH_PHOTOS } from "../graphql/queries"
import { useQuery, useLazyQuery } from "@apollo/client"

// styles
import styled from "styled-components"
import { MWr, CWr } from '../STYLES/styleWrappers'

import PhotoCard from "../components/PhotoCard"

const Search = () => {
  const { searchTerm } = useParams()
  console.log("searchTerm", searchTerm)
  const { data } = useQuery(SEARCH_PHOTOS, {
    variables: { keyword: searchTerm }
  })



  console.log("searchData", data)
  return (
    <MWr>
      <CWr>
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