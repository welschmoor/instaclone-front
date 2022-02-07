import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { MWr, CWr } from '../STYLES/styleWrappers'

const Message = () => {
  return (
    <MWr>
      <Helmet><title>Instapound Send Message </title></Helmet>
      <MText>Messaging not yet implemented</MText>
    </MWr>
  )
}

const MText = styled.h2`
  margin-top: 20px;
  color: ${p => p.theme.TEXT.mainLogo};
`

export default Message