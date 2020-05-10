import React from "react"
import { Router, Link } from "@reach/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarker, faCalendar } from "@fortawesome/free-solid-svg-icons"
import { compose, withAuthentication, withLayout } from "../hoc"
import { NavLink } from "../components/common"
import { Listing } from "../components/listing"
import { Reviews } from "../components/review"
import { Trades } from "../components/trade"
import { ToggleButton } from "../components/button"

import { trades, reviews } from "../data"

const Profile = ({ user: currentUser, isLoading, isError, data, error }) => {
  if (isLoading) return <div>Loading</div>
  if (isError) return <div>{error}</div>

  const user = data
  const dateJoined = new Date(user.date_joined)

  // Mock data fetching
  const userListings = user.listings
  const userTrades = trades.filter(
    (t) =>
      t.left.user.handle === user.handle || t.right.user.handle === user.handle
  )
  const userTradesCount = userTrades.length
  const userReviews = reviews.filter((r) => r.user.id === user.id)
  const userReviewsCount = userReviews.length

  return (
    <>
      <div className="flex justify-between">
        <div className="relative w-full">
          <img
            src={user.profile_image_url}
            className="w-40 h-40 rounded-full border"
          />
          <div className="mt-2 text-lg font-bold">{user.name}</div>
          <div className="text-gray-700">@{user.username}</div>

          <div className="absolute right-0 top-0">
            {user.username !== currentUser.username ? (
              <FollowButton isFollowing={true} />
            ) : (
              <Link to="/settings/profile" className="btn-txt">
                Edit Profile
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 inline-flex items-center">
        <FontAwesomeIcon icon={faMapMarker} />
        <div className="ml-2 mr-5">{user.location}</div>
        <FontAwesomeIcon icon={faCalendar} />
        <div className="ml-2 mr-5">
          Joined {dateJoined.toLocaleDateString()}
        </div>
      </div>

      <div>
        <span className="font-bold">7</span>{" "}
        <span className="mr-5">following</span>
        <span className="font-bold">5</span> followers
      </div>

      <div className="mt-6">
        <div className="gutter-none flex">
          <NavLink to="">Listings</NavLink>
          <NavLink to="trades">Trades ({userTradesCount})</NavLink>
          <NavLink to="reviews">Reviews ({userReviewsCount})</NavLink>
        </div>
        <div className="mt-5">
          <Router>
            <Listings path="/" listings={userListings} />
            <Trades path="trades" user={user} trades={userTrades} />
            <Reviews path="reviews" reviews={userReviews} />
          </Router>
        </div>
      </div>
    </>
  )
}

const FollowButton = ({ isFollowing = false, ...rest }) => (
  <ToggleButton active={isFollowing} {...rest}>
    {isFollowing ? "Following" : "Follow"}
  </ToggleButton>
)

const Listings = ({ listings }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
    {listings.map((listing) => (
      <Listing key={listing.id} listing={listing} />
    ))}
  </div>
)

export default compose(withLayout("user"), withAuthentication)(Profile)
