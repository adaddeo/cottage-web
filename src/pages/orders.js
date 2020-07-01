import React from "react"
import { Link } from "@reach/router"
import Currency from "../components/currency"
import { ListingImage } from "../components/listing"
import { UserBadge } from "../components/user"
import { ShortDate } from "../components/time"

const Orders = ({ orders }) => {
  if (orders.nodes.length === 0) {
    return (
      <div className="px-3">
        You haven't placed any orders.
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {orders.nodes.map((order) => (
          <div key={order.id}>
            <Order {...{ order }} />
          </div>
        ))}
      </div>
    </>
  )
}

const Order = ({ order }) => (
  <div className="px-3 pb-4 border-b">
    <div className="text-sm emphasis-medium">
      <ShortDate date={order.createdAt} />
    </div>
    <div className="text-lg">
      Order #{order.number}
    </div>

    <div className="mt-2 space-y-3">
      {order.items.nodes.map((item) => (
        <div key={item.id}>
          <ItemSummary {...{ item }} />
        </div>
      ))}
    </div>

    <div className="mt-3">
      <div className="mb-1 text-sm emphasis-medium">Seller</div>
      <UserBadge user={order.seller} />
    </div>
  </div>
)

const ItemSummary = ({ item }) => (
  <div className="flex">
    <div className="mr-3">
      <ListingImage className="w-32 h-32 rounded" image={item.listing.smallImage} listing={item} />
    </div>
    <div>
      <div className="font-bold">{item.listing.name}</div>
      <div className="mt-1"><Currency amount={item.price} /></div>
      { !item.isReviewed && <Link to="/review" className="mt-3 text-sm">Add a review</Link> }
    </div>
  </div>
)

export default Orders
