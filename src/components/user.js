import React from "react"
import TimeAgo from "react-timeago"
import { Link } from "@reach/router"
import classnames from "classnames"

const timeAgoFormatter = (value, unit, _, __, nextFormatter) => {
  switch (unit) {
    case "second":
      return `${value}s`
    case "minute":
      return `${value}m`
    case "hour":
      return `${value}h`
    case "day":
      if (value <= 7) {
        return `${value}d`
      }
  }

  return nextFormatter()
}

export const UserLink = ({ user, children, ...rest }) => (
  <Link to={`/profile/${user.username}`} {...rest}>
    {children || user.name}
  </Link>
)

export const ProfileImage = ({ user, className, ...rest }) => (
  <img
    src={
      user.profile_image_url
        ? user.profile_image_url
        : "https://place-hold.it/60x60/999999/333333"
    }
    className={classnames(className, "rounded-full w-10 h-10 border")}
    alt={`${user.username} profile picture`}
    {...rest}
  />
)

export const ThinProfileImage = ({ url, className, ...rest }) => (
  <img
    src={url}
    className={classnames(className, "rounded-full w-24 h-24 border")}
    {...rest}
  />
)

export const UserImageLink = ({ user, className, ...rest }) => (
  <UserLink
    user={user}
    className={classnames(className, "flex items-center")}
    {...rest}
  >
    <ProfileImage user={user} className="mr-2" />
    <span className="font-bold">{user.name}</span>
  </UserLink>
)

export const UserActivity = ({ user, date, children }) => (
  <div className="gutter-none p-4 flex">
    <div className="flex-none mr-2">
      <UserLink user={user}>
        <ProfileImage user={user} />
      </UserLink>
    </div>

    <div className="flex-auto">
      <UserLink user={user}>
        <span className="font-bold">{user.name}</span>{" "}
        <span className="text-gray-600">@{user.username}</span>
        {date && (
          <span className="text-gray-600">
            {" "}
            &middot; <TimeAgo date={date} formatter={timeAgoFormatter} />
          </span>
        )}
      </UserLink>
      <div className="mt-1">{children}</div>
    </div>
  </div>
)

export const UnlinkedUserActivity = ({ user, date, children }) => (
  <div className="gutter-none p-4 flex">
    <div className="flex-none mr-2">
      <ProfileImage user={user} />
    </div>

    <div className="flex-auto">
      <span className="font-bold">{user.name}</span>{" "}
      <span className="text-gray-600">@{user.username}</span>
      {date && (
        <span className="text-gray-600">
          {" "}
          &middot; <TimeAgo date={date} formatter={timeAgoFormatter} />
        </span>
      )}
      <div className="mt-1">{children}</div>
    </div>
  </div>
)
