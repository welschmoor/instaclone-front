

import styled from 'styled-components'


const SearchForm = () => {
  return (
    <Form>
      <Input type="text" placeholder="Search" />
    </Form>
  )
}

const Form = styled.form`
  @media (max-width: 600px) {
    display: none;
  }
`

const Input = styled.input`
  background-color: rgb(239, 239, 239);
  padding: 9px;
  padding-left: 16px;
  border: none;
  border-radius: 6px;
`

export default SearchForm