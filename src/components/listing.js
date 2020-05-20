import React from "react"
import { Link } from "@reach/router"
import { CompactUserImageLink } from "./user"

export const ListingLink = ({ listing, children, ...rest }) => (
  <Link to={`/listing/${listing.id}`} {...rest}>
    {children || listing.name}
  </Link>
)

export const ListingImage = ({ listing }) => (
  <img
    src={
      listing.image_url
        ? listing.image_url
        : "https://place-hold.it/400x400/999999/333333&text=Image"
    }
  />
)

export const Listing = ({ listing, user, distance, ...rest }) => (
  <div>
    {user && (
      <div className="mb-1 px-2">
        <CompactUserImageLink user={user} />
      </div>
    )}

    <ListingLink listing={listing} {...rest}>
      <img src={listing.image_url} alt={listing.name} />

      <div className="mt-1 px-2 text-sm">
        <div className="text-lg font-bold">{listing.name}</div>
        <div className="emphasis-medium">
          ${listing.price}
          {distance && <span> &middot; {distance}</span>}
        </div>
        {listing.short_description && (
          <div className="mt-1">{listing.short_description}</div>
        )}
      </div>
    </ListingLink>
  </div>
)

export const HorizontalListing = ({ listing, user, distance }) => (
  <div className="flex">
    <ListingLink listing={listing} className="flex-none w-48 h-48">
      <img src={listing.image_url} alt={listing.name} className="rounded" />
    </ListingLink>

    <div className="flex-1 ml-3">
      <ListingLink listing={listing}>
        <div className="mt-1 text-sm">
          <div className="text-lg font-bold">{listing.name}</div>
          <div className="emphasis-medium">
            ${listing.price}
            {distance && <span> &middot; {distance}</span>}
          </div>
          {listing.short_description && (
            <div className="mt-1">{listing.short_description}</div>
          )}
        </div>
      </ListingLink>

      {user && (
        <div className="mt-3">
          <CompactUserImageLink user={user} />
        </div>
      )}
    </div>
  </div>
)

export const ListingHit = ({ hit }) => <Listing listing={hit} />

export const Listings = ({ listings }) => {
  return (
    // <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    <ul>
      {listings.map((listing) => (
        <li key={listing.id} className="mb-3 sm:mb-0">
          <Listing listing={listing} />
        </li>
      ))}
    </ul>
  )
}
