import { IcartItem } from "../App"

export function useIsInCart(cartItems: IcartItem[], itemName: string): boolean {
    return cartItems.some((item) => item.itemData.name === itemName)
}
