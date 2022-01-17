import { loggedInVar } from "../apollo"

const Login = () => {
  return (
    <div>
      Login Compo
      <button onClick={() => loggedInVar(true)} >login</button>
    </div>
  )
}

export default Login