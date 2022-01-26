


import { SEE_PIC, TOGGLE_LIKE } from "../graphql/queries"
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { Link as LinkNS, useParams, useNavigate } from "react-router-dom"
import React, { useState, useEffect } from "react"

// styles
import styled from "styled-components"



const SinglePic = () => {
  const { id } = useParams()
  const { loading, data } = useQuery(SEE_PIC, {
    variables: { seePhotoId: Number(id) }
  })
  const navigate = useNavigate()

  useEffect(() => {
    console.log("keke")
  }, [id])


  if (loading) {
    return (<div>Loading...</div>)
  }

  const goBack = () => {
    navigate(-1) // does not remember scroll position :(
  }

  return (
    <SinglePicWrapper onClick={goBack}>
      <PicGrid >
        <Picture src={data?.seePhoto?.file} alt={data?.seePhoto?.caption} />
      </PicGrid>
    </SinglePicWrapper>
  )
}

const SinglePicWrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 1;
`



const PicGrid = styled.div`
  z-index: 11;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
`

const Picture = styled.img`
  width: 100%;
  height: auto;
  
`



export default SinglePic