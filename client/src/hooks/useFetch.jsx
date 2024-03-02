import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_GIPHY_API;
const useFetch = ({ keyword }) => {
    const [gifUrl, setGifUrl] = useState("");
    const fetchGifs = async () => {
        try {
            const response = await fetch(
                `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword
                    .split(" ")
                    .join("")}&limit=1`
            );
            const { data } = await response.json();

            setGifUrl(data[0]?.images?.downsized_medium.url);
        } catch (error) {
            setGifUrl(
                "https://giphy.com/clips/studiosoriginals-bitcoin-to-the-moon-podalienz-Mt4FDgXb9O5YwQAZ9g"
            );
        }
    };
    useEffect(() => {
        if (keyword) {
            fetchGifs();
        }
    }, [keyword]);
    return gifUrl;
};

export default useFetch;
