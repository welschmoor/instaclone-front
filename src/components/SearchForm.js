

import { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const searchHandler = (e) => {
    e.preventDefault()
    if (searchTerm.trim().length < 1) { return }
    navigate(`/search/${searchTerm}`, { state: searchTerm })
  }

  return (
    <Form onSubmit={searchHandler}>
      <Input type="text" placeholder="Search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
    </Form>
  )
}

const Form = styled.form`
  @media (max-width: 600px) {
    display: none;
  }
`

const Input = styled.input`
  background-color: ${p => p.theme.BG.col2};
  padding: 9px;
  padding-left: 16px;
  border: none;
  border-radius: 6px;
  color: ${p => p.theme.TEXT.mainLogo};
`

export default SearchForm