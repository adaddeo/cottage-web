import React from "react"
import { Link } from "@reach/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarker, faCalendar } from "@fortawesome/free-solid-svg-icons"
import { HorizontalListing } from "../components/listing"
import { ToggleButton } from "../components/button"
import { TopBarContent } from "../components/page"
import { Image } from "../components/image"
import { ShortDate } from "../components/time"
import { UserBadges } from "../components/user"

const Profile = ({ authenticatedUser, user, follow, unfollow }) => {
  const listings = user.listings.nodes

  return (
    <>
      <TopBarContent>
        <div className="flex-1 p-3">
          <div className="absolute top-0 right-0 z-10 mt-3 mr-3">
            {user.username !== authenticatedUser.username ? (
              <FollowButton
                isFollowed={user.isFollowed}
                userId={user.id}
                follow={follow}
                unfollow={unfollow}
              />
            ) : (
              <Link to="/settings/profile" className="surface btn-flt">
                Edit
              </Link>
            )}
          </div>

          <div className="flex justify-between mt-8">
            <div className="w-full">
              <Image
                image={user.image}
                alt={user.name}
                className="w-48 h-48 border rounded-full"
              />
              <div className="mt-1 text-lg font-bold">{user.name}</div>
              <div className="flex items-center">
                <div className="mr-2 emphasis-medium">@{user.username}</div>
                <UserBadges user={user} />
              </div>
            </div>
          </div>

          <div className="mt-3">{user.bio}</div>

          <div className="flex items-center mt-3 emphasis-medium">
            <FontAwesomeIcon icon={faMapMarker} />
            <div className="ml-2 mr-5">{user.location}</div>
            <FontAwesomeIcon icon={faCalendar} />
            <div className="ml-2 mr-5">
              Joined <ShortDate date={user.createdAt} />
            </div>
          </div>

          <div>
            <span className="font-bold">{user.followedCount}</span>{" "}
            <span className="mr-5">following</span>
            <span className="font-bold">{user.followerCount}</span> followers
          </div>
        </div>
      </TopBarContent>

      <div className="px-3">
        <Listings path="/" listings={listings} />
      </div>
    </>
  )
}

const FollowButton = ({ follow, unfollow, userId, isFollowed, ...rest }) => {
  const handleClick = () => {
    if (isFollowed) {
      unfollow({ userId })
    } else {
      follow({ userId })
    }
  }

  return (
    <ToggleButton active={isFollowed} onClick={handleClick} {...rest}>
      {isFollowed ? "Following" : "Follow"}
    </ToggleButton>
  )
}

const Listings = ({ listings }) => (
  <div className="space-y-5">
    {listings.map((listing) => (
      <HorizontalListing key={listing.id} listing={listing} />
    ))}
  </div>
)

export default Profile
