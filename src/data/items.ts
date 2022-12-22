export type itemData = {
    _id?: number
    name: string
    imgUrl: string
    artist: string
    price: number
}

const data: itemData[] = [
    {
        _id: 1,
        name: "Girl and Cat",
        imgUrl: "/1_girl_and_cat.jpg",
        artist: "freeillustrated",
        price: 14.99,
    },
    {
        _id: 2,
        name: "White Kitty",
        imgUrl: "/2_white_kitty.jpg",
        artist: "JenDigitalArt",
        price: 19.99,
    },
    {
        _id: 3,
        name: "Cat and Mouse",
        imgUrl: "/3_cat_and_mouse.jpg",
        artist: "JenDigitalArt",
        price: 19.99,
    },
    {
        _id: 4,
        name: "Sphynx",
        imgUrl: "/4_sphynx.jpg",
        artist: "vectronom",
        price: 24.99,
    },
    {
        _id: 5,
        name: "Cat and Dog Cuddling",
        imgUrl: "/5_cat_and_dog_cuddling.jpg",
        artist: "ractapopulous",
        price: 9.99,
    },
    {
        _id: 6,
        name: "Glowing Cat",
        imgUrl: "/6_glowing_cat.jpg",
        artist: "",
        price: 14.99,
    },
]

export { data }
