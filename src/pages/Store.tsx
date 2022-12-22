import ItemCard from "../components/ItemCard"

import { data, itemData } from "../data/items"

export default function Store(props: { getItem: ({}: itemData) => void }) {
    const itemArr = data.map((item) => (
        <ItemCard
            key={item._id}
            name={item.name}
            imgUrl={item.imgUrl}
            artist={item.artist}
            price={item.price}
            getItem={props.getItem}
        />
    ))

    return (
        <>
            <h1 className="font-cursive text-6xl pl-5 text-hcol mt-3 mb-7 text-center">
                Store
            </h1>
            <div className="grid grid-cols-3 auto-rows-[400px] p-5 gap-x-4 gap-y-8">
                {itemArr}
            </div>
        </>
    )
}
