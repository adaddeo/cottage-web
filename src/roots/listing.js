import React, { lazy } from "react"
import { useQuery } from "react-query"
import { withUserPage } from "../hoc"
import { request } from "../api"

const Listing = lazy(() => import("../pages/listing"))

const ListingRoot = ({ id, ...rest }) => {
  const { data } = useQuery(
    ["listing", id],
    (_key, listingId) => request(`
      {
        listing(id: "${listingId}") {
          id
          name
          price
          shortDescription
          description
          image {
            base64
            cdnUrl
            webpCdnUrl
          }
          personId
          person {
            name
            username
            isFollower
            isSeller
            image: thumbnailImage {
              cdnUrl
              webpCdnUrl
              base64
            }
          }
        }
      }
    `)
  )

  return <Listing {...{ data, ...rest}} />
}

export default withUserPage({ 
  page: { 
    top: 'panel',
    title: 'Listing',
    back: true
  },
  layout: {
    focus: true
  }
})(ListingRoot)
