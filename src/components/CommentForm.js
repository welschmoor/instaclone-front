

import { useForm } from "react-hook-form"
import { ADD_COMMENT } from "../graphql/queries"
import { useUserHook } from '../graphql/useUserHook'

//styles
import styled from "styled-components"
import { useMutation } from "@apollo/client"


// createComment requires the ID of photo; so send it from parent
const CommentForm = ({ photoId }) => {
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
        console.log(reconstComment)
        setValue("comment", "")
        cache.modify({
          id: fragmentId,
          fields: {
            comments(prev) {
              return [...prev, reconstComment]
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
      <Input placeholder="add comment" {...register('comment', { required: true })} name="comment" />
    </Form>

  )
}


const Form = styled.form`

`

const Input = styled.input`

`

export default CommentForm