import React from "react"
import SignIn from "."
import remoteAuthentication from "../../services/authentication"

const makeSignIn = () => {
  return <SignIn authenticate={remoteAuthentication} />
}

export default makeSignIn
