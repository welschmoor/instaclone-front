
import styled from "styled-components"


const ErrorSignup = ({ errorMessage }) => {
  return (
    <ErrorDiv>
      {errorMessage}
    </ErrorDiv>
  )
}

const ErrorDiv = styled.div`
  position: absolute;
  font-size: 0.7rem;
  color: #e70000;
  top: 23.7%;
`

export default ErrorSignup