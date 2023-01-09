import ItemCard from "../components/ItemCard"

import { data } from "../data/items"

import { IcartItem, IitemData } from "../App"

type Props = {
    cartItems: IcartItem[]
    getItem: ({}: IitemData) => void
    addItem: ({}: IitemData) => void
    getQnt: (cartItems: IcartItem[], name: string) => number
    incQnt: ({}: IitemData) => void
    decQnt: ({}: IitemData) => void
}

export default function Store(props: Props) {
    const { cartItems, getItem, addItem, getQnt, incQnt, decQnt } = props
    const itemArr = data.map((item) => (
        <ItemCard
            key={item._id}
            itemData={{
                name: item.name,
                imgUrl: item.imgUrl,
                artist: item.artist,
                price: item.price,
            }}
            cartItems={cartItems}
            getItem={getItem}
            addItem={addItem}
            getQnt={getQnt}
            incQnt={incQnt}
            decQnt={decQnt}
        />
    ))

    return (
        <>
            <h1 className="font-cursive text-6xl pl-5 text-hcol mt-3 mb-7 text-center">
                Store
            </h1>
            <div className="grid grid-cols-3 auto-rows-[500px] p-5 gap-x-4 gap-y-8">
                {itemArr}
            </div>
        </>
    )
}
