import React, { useEffect, useState } from "react";

import { Container, TitleMovie, ImageMovie, ImgArea } from './styled';


export default ( {movie} ) => {

    const [movieName, setMovieName] = useState("Nome filme");
    const [moviePath, setMoviePath] = useState("");

    useEffect(() => {
        movie.original_name ? setMovieName(movie.name) : setMovieName(movie.title);
        setMoviePath("https://image.tmdb.org/t/p/w300" + movie.poster_path);
    })

    return (

        <Container>
            <TitleMovie>
                Filme Selecionado: {movieName}
            </TitleMovie>

            <ImgArea>
                <ImageMovie src={moviePath}/>
            </ImgArea>
            
        </Container>

    )

}