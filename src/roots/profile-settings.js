import React, { lazy } from "react"
import { useQuery } from "react-query"
import { compose, withLayout, withPage, withUser } from "../hoc"
import { request } from "../api"

const profileQuery = () => request(`
  {
    currentPerson {
      id
      username
      name
      bio
      location
      lat
      lng
      imageUrl
    }
  }
`)

const ProfileSettings = lazy(() => import("../pages/profile-settings"))
const ProfileSettingsRoot = ({ authenticatedUser, ...rest }) => {
  const { data } = useQuery(
    [authenticatedUser.username, "profile", "settings"],
    profileQuery
  )

  return (
    <ProfileSettings user={data.currentPerson} {...rest } />
  )
}

export default compose(
  withUser,
  withPage({ title: "Profile Settings", back: true }),
  withLayout("user")
)(ProfileSettingsRoot)
