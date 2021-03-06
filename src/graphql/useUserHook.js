
// this hook checks if the token in local storage is a real token
import { useEffect } from "react"
import { useQuery, useReactiveVar } from "@apollo/client";
import { loggedInVar } from "./apollo";
import { ME } from "./queries";


export const useUserHook = () => {
  const loggedInBool = useReactiveVar(loggedInVar)
  const { data, error } = useQuery(ME, {
    skip: !loggedInBool,
    fetchPolicy: "network-only",   // Used for first execution
    nextFetchPolicy: "network-only", // Used for subsequent executions
  })

  useEffect(() => {
    let unsub = false
    if (data?.me === null) { // this means token exists but it's a wrong token
      if (!unsub) {
        loggedInVar(false)
        localStorage.removeItem("instapoundtoken")
      }
    }
    return () => { unsub = true }
  }, [data, loggedInBool])
  return { data, error };
}