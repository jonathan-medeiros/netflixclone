import React, { useEffect, useState } from "react";


import { Container,
        ContainerImg,
         ModalImg,
         ModalTitle,
         ModalInfo,
         ModalPoints,
         ModalYear,
         ModalSeasons,
         ModalGenres    

} from './styled';

export default ( {movie} ) => {

    const [movieName, setMovieName] = useState("Nome filme");
    const [path, setPath] = useState("");

    useEffect(() => {
        movie.original_name ? setMovieName(movie.name) : setMovieName(movie.title);
        setPath(movie.poster_path);
    })

    return (

        <Container>
            <ContainerImg>
                <ModalImg src={"https://image.tmdb.org/t/p/w300" + path} />    
            </ContainerImg>
            

            <ModalTitle> 
                {movieName}
            </ModalTitle>

            <ModalInfo>
                <ModalPoints>
                    3 pontos
                </ModalPoints>

                <ModalYear>
                    2022
                </ModalYear>
                    
                <ModalSeasons>
                    1 temporada
                </ModalSeasons>
            </ModalInfo>

            <ModalGenres>
                Gêneros: Grama, Terror
            </ModalGenres>
            
        </Container>

    )

}