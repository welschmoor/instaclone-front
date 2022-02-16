

import { gql, useReactiveVar } from "@apollo/client"
import { useUserHook } from '../graphql/useUserHook'
import { ADD_COMMENT } from "../graphql/queries"
import { loggedInVar } from '../graphql/apollo'
import { useForm } from "react-hook-form"
import { useState } from "react"

//styles
import { useMutation } from "@apollo/client"
import { CgCheck } from "react-icons/cg"
import styled from "styled-components"


// createComment requires the ID of photo; so send it from parent
const CommentForm = ({ photoId, feedB }) => { // feedB true means it's for Feed component
  const [commentResultStr, setCommentResultStr] = useState('')
  const loggedInBool = useReactiveVar(loggedInVar)
  const { data: userData } = useUserHook()
  const { register, handleSubmit, setValue, getValues } = useForm()
  const [createComment, { loading }] = useMutation(ADD_COMMENT, {
    update: (cache, result) => {
      const ok = result.data.createComment.ok
      const commentId = result.data.createComment.commentId

      if (ok && userData.me) {
        const fragmentId = `Photo:${photoId}`
        // we reconstruct the comment:
        const reconstComment = {
          __typename: "Comment",
          createdAt: Date.now() + "",
          id: commentId,
          isMine: true,
          payload: getValues().comment,
          user: {
            ...userData.me
          }
        }

        // we first write the Fragment to specify the shape of the new comment
        const newComment = cache.writeFragment({
          data: reconstComment,
          fragment: gql`
            fragment BSname on Comment {
              id
              createdAt
              isMine
              payload
              user {
                username
                avatar
              }
            }
          `
        })

        setValue("comment", "")
        cache.modify({
          id: fragmentId,
          fields: {
            comments(prev) {
              return [...prev, newComment]
            },
            commentsNumber(prev) {
              return prev + 1
            }
          },
        })
      }
    },
  })

  const onSuccess = async (data) => {
    if (!loggedInBool || loading || data?.comment === "") return;
    const response = await createComment({ variables: { photoId: photoId, payload: data?.comment } })
    setValue("comment", "") // this clears input
    setCommentResultStr("comment added!")
    setTimeout(() => {
      setCommentResultStr("")
    }, 4232)
  }

  return (
    <Form onSubmit={handleSubmit(onSuccess)}>
      <Input
        autoComplete='off'
        placeholder="add comment, max 62 chars"
        {...register('comment', { required: true, maxLength: 70, })}
        name="comment"
      // ref={refProp}  // <= this breaks the form, why?
      />
      {commentResultStr !== "" &&
        <CommentAndIcon feedB={feedB} >
          <CommentMessage>
            <CheckMarkIcon /><>{commentResultStr}</>
          </CommentMessage>
        </CommentAndIcon>
      }

    </Form>
  )
}


const Form = styled.form`
  padding-top: 8px;
  display: relative;
`

const Input = styled.input`
  background-color: ${p => p.theme.BG.col1};
  color: ${p => p.theme.TEXT.mainLogo};
  padding: 5px 0;
  border: none;
  border-bottom: 1px solid ${p => p.theme.BORCOL1};
  &:focus {
    outline: none;
  }
  width: 66%;
  
`

const CommentAndIcon = styled.div`
  position: absolute;
  bottom: ${p => p.feedB ? "-5px" : "-10px"};
  display: flex;
  align-items: center;
  gap: 4px;
`

const CommentMessage = styled.span`
  color: #28bb28;
  font-weight: bold;
  display: flex;
  align-items: center;
  font-size: 0.7rem;
`

const CheckMarkIcon = styled(CgCheck)`
  font-size: 2rem;
  transform: translateY(-2px);
`


export default CommentForm