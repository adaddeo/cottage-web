import React, { lazy } from "react"
import { useQuery } from "react-query"
import { withUserPage } from "../hoc"
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
      image {
        url: cdnUrl
      }
    }
  }
`)

const ProfileSettings = lazy(() => import("../pages/profile-settings"))

const ProfileSettingsRoot = ({ authenticatedUser, ...rest }) => {
  const { data } = useQuery(
    [authenticatedUser.username, "profile", "settings"],
    profileQuery,
    { cacheTime: 0 }
  )

  return (
    <ProfileSettings user={data.currentPerson} {...rest } />
  )
}

export default withUserPage({ 
  page: { 
    title: "Profile Settings", 
    back: true 
  }
})(ProfileSettingsRoot)
