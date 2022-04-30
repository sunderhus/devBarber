import React from "react"
import SignUp from "."
import registerAccount from "../../services/registerAccount"

const makeSignUp = () => {
  return <SignUp register={registerAccount} />
}

export default makeSignUp
