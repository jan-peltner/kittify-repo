export default function Home() {
    return (
        <>
            <div className="w-full h-1/2 relative">
                <img
                    className="w-full h-full select-none object-cover"
                    src="./hero.png"
                    alt=""
                />
                <h2 className="absolute text-hcol text-7xl text-opacity-90 tracking-widest bottom-0 left-0 select-none">
                    KITTY ART KITTY ART KITTY ART KITTY ART.
                </h2>
            </div>
            <div id="text-container" className="flex justify-center">
                <p className="text-pcol text-lg text-center pl-5 leading-loose flex w-1/2"></p>
            </div>
        </>
    )
}
