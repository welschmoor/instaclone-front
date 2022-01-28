import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { SEE_PIC, SEE_PROFILE } from '../graphql/queries'


const Profile = () => {
  const { userName } = useParams()
  const { data: profileData } = useQuery(SEE_PROFILE, {
    variables: { username: userName }
  })

  console.log(profileData)


  return (
    <div>Profile {userName} </div>
  )
}

export default Profile