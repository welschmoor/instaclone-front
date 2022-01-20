

// styles
import { useQuery } from "@apollo/client"
import styled from "styled-components"
import { FEED } from "../graphql/queries"
import { MWr, CWr } from '../STYLES/styleWrappers'

import PhotoCard from "../components/PhotoCard"

const Feed = () => {
  const { data } = useQuery(FEED)

  return (
    <MWr>
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