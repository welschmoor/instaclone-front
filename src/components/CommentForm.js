

import { useUserHook } from '../graphql/useUserHook'
import { ADD_COMMENT } from "../graphql/queries"
import { useForm } from "react-hook-form"
import { gql } from "@apollo/client"
import { useState } from "react"

//styles
import { useMutation } from "@apollo/client"
import styled from "styled-components"
import { CgCheck } from "react-icons/cg"

// createComment requires the ID of photo; so send it from parent
const CommentForm = ({ photoId, refProp }) => {
  const [commentResultStr, setCommentResultStr] = useState('')
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
    if (loading || data?.comment === "") return;
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
        placeholder="add comment, max 62 chars"
        {...register('comment', { required: true, maxLength: 70, })}
        name="comment"
      // ref={refProp}  // <= this breaks the form, why?
      />
      {commentResultStr !== "" &&
        <CommentIconGroup>
          <CommentMessage>
            <CheckMarkIcon /><>{commentResultStr}</>
          </CommentMessage>
        </CommentIconGroup>
      }

    </Form>
  )
}


const Form = styled.form`
  padding-top: 8px;
`

const Input = styled.input`
  padding: 5px 0;
  border: none;
  border-bottom: 1px solid ${p => p.theme.BORCOL1};
  &:focus {
    outline: none;
  }
  width: 66%;
  
`

const CommentMessage = styled.span`
  color: #28bb28;
  font-weight: bold;
  display: flex;
  align-items: center;

`

const CheckMarkIcon = styled(CgCheck)`
  font-size: 2rem;
  transform: translateY(-2px);
`

const CommentIconGroup = styled.div`
  position: absolute;
  bottom: -5px;
  display: flex;
  align-items: center;
  gap: 4px;
`

export default CommentForm