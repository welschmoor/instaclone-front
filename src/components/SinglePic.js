


import { SEE_PIC, TOGGLE_LIKE } from "../graphql/queries"
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { Link as LinkNS, useParams, useNavigate } from "react-router-dom"
import React, { useState, useEffect } from "react"

// styles
import styled from "styled-components"
import { TopContainer, AvatarDiv, Avatar} from '../STYLES/styleProfile'


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
    navigate(-1)
  }

  return (
    <>
      <SinglePicWrapper onClick={goBack}>  </SinglePicWrapper>
      <SPWrapper>

        <PicGrid >
          <Picture src={data?.seePhoto?.file} alt={data?.seePhoto?.caption} />
          <RightColumn>
          <TopContainer>
            <AvatarDiv>
              <Avatar />
            </AvatarDiv>
          </TopContainer>
          </RightColumn>
        </PicGrid>
      </SPWrapper>

    </>

  )
}

const SPWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  padding: 0 10px;
  padding-bottom: 140px;
  background-color: ${p=>p.theme.BG10};
`

const SinglePicWrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 1;
`

const PicGrid = styled.div`

  z-index: 11;
  margin: auto auto;


  min-width: 400px;
  max-width: 1200px;

  display: grid;
  grid-template-columns: 1fr 300px;

  @media (max-width: 736px) {
    grid-template-columns: 1fr;
  }
`

const Picture = styled.img`
  width: 100%;
  height: auto;
  
`

const RightColumn = styled.div`
  background-color: grey;
`



export default SinglePic