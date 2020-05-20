import React from "react"
import { Link } from "@reach/router"
import { compose, withAuthentication, withFetchData, withLayout } from "../hoc"
import { UserImageLink } from "../components/user"
import { ListingImage } from "../components/listing"
import { ContainedButton } from "../components/button"
import { TopBar } from "../components/layout"

const Listing = ({ authenticatedUser, data }) => {
  const { listing, distance } = data

  return (
    <>
      <TopBar title="Listing" back={true}>
        {listing.user_id === authenticatedUser.id && (
          <Link to={`/listing/${listing.id}/edit`} className="btn-txt">
            Edit
          </Link>
        )}
      </TopBar>

      <div className="px-3">
        <UserImageLink user={listing.user} className="mt-1" />
      </div>
      <div className="my-2">
        <ListingImage listing={listing} />
      </div>
      <div className="px-3">
        <div className="text-xl font-bold">{listing.name}</div>
        <div className="emphasis-medium">
          ${listing.price}
          {distance && <span> &middot; {distance}</span>}
        </div>
        {listing.short_description && (
          <div className="mt-1">{listing.short_description}</div>
        )}

        <div className="mt-3">
          <ContainedButton>Purchase</ContainedButton>
        </div>
      </div>
    </>
  )
}

export default compose(
  withAuthentication,
  withFetchData,
  withLayout("user", { focus: true })
)(Listing)
