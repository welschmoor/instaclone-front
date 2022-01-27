

import { useForm } from "react-hook-form"
import { ADD_COMMENT } from "../graphql/queries"
import { useUserHook } from '../graphql/useUserHook'
import { gql } from "@apollo/client"

//styles
import styled from "styled-components"
import { useMutation } from "@apollo/client"


// createComment requires the ID of photo; so send it from parent
const CommentForm = ({ photoId, refProp }) => {
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
    console.log("data", data)
    if (loading || data?.comment === "") return;
    const response = await createComment({ variables: { photoId: photoId, payload: data?.comment } })
    setValue("comment", "") // this clears input
  }

  return (
    <Form onSubmit={handleSubmit(onSuccess)}>
      <Input placeholder="add comment, max 62 chars" {...register('comment', { required: true, maxLength: 70, })} name="comment" ref={refProp} />
    </Form>
  )
}


const Form = styled.form`
  padding-top: 8px;
`

const Input = styled.input`
  padding: 5px 0;
  border: none;
  border-bottom: 1px solid grey;
  &:focus {
    outline: none;
  }
`

export default CommentForm