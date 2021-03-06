import React, { useState } from "react"
import { Link } from "@reach/router"
import { login } from "../api"
import { useUserContext } from "../hooks"
import { OutlineButton } from "./button"
import { UserBadge } from "./user"

const LoginFormContainer = () => {
  const { user, signIn, logout } = useUserContext()

  if (user) {
    return (
      <div className="mt-5">
        <div className="mb-1">
          You are signed in as:
        </div>

        <UserBadge user={user} />

        <div className="w-48 mt-3">
          <Link to="/home" className="block btn-ctn btn-1">
            Go to Activity Feed
          </Link>
          <OutlineButton onClick={logout} className="w-full mt-2">
            Logout
          </OutlineButton>
        </div>
      </div>
    )
  } else {
    return <LoginForm signIn={signIn} />
  }
}

const LoginForm = ({ signIn }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    login({
      username,
      password,
    })
      .then(({ user }) => signIn(user, true))
      .catch(() => setError("Login failed. Try again."))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="block mt-4 bg-gray-100">
        <div className="px-2 py-1 text-sm">Email or username</div>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-2 py-1 bg-gray-100 outline-none"
        />
      </label>
      <label className="block mt-2 bg-gray-100">
        <div className="px-2 py-1 text-sm">Password</div>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-2 py-1 bg-gray-100 outline-none"
        />
      </label>

      <div className="mt-5">
        <OutlineButton className="btn-full">Log in</OutlineButton>
        <div className="my-2 text-sm text-center text-gray-600">or</div>
        <Link to="/sign-up" className="surface btn-ctn btn-1 btn-full">
          Sign up
        </Link>
      </div>

      {error && <div className="mt-3 text-error">{error}</div>}
    </form>
  )
}

export default LoginFormContainer
