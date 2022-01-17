// reactive variables what do you think will happen if you do this thing twice?

import { makeVar } from "@apollo/client";


export const loggedInVar = makeVar(false)
export const darkModeVar = makeVar(false)