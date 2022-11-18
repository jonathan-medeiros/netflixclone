import React, { useEffect, useState } from "react";
import "./App.css";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ModalMovie from "./components/ModalMovie";

export default () => {

   const [movieList, setMovieList] = useState([]);
   const [featuredData, setFeaturedData] = useState(null);
   const [blackHeader, setBlackHeader] = useState(false);
   const [modalStatus, setModalStatus] = useState(false);
   const [movieSelected, setMovieSelected] = useState([]);

   useEffect(() => {
      const loadAll = async () => {
         //Pegando a lista Total
         let list = await Tmdb.getHomeList();
         setMovieList(list);
         // console.log(list[0].items.results.length);

         //pegando o Featured (filme em destaque)
         let originals = list.filter(i=>i.slug === 'originals');
         let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
         let chosen = originals[0].items.results[randomChosen];
         let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
         setFeaturedData(chosenInfo);
      }
      loadAll();     
   }, []);

   useEffect(()=>{
      const scrollListener = () => {
         if (window.scrollY > 10){
            setBlackHeader(true);
         }else{
            setBlackHeader(false);
         }
      }

      window.addEventListener('scroll', scrollListener);

      return () => {
         window.removeEventListener('scroll', scrollListener);
      }


   }, []);

   return (
      
      <div className="page">
         
         <Header black={blackHeader}></Header>


         {featuredData &&
            <FeaturedMovie item={featuredData}/>
         }

         <section className="lists">
            {movieList.map((item, key)=>(
               
               <MovieRow key={key} title={item.title} items={item.items} setStatus={setModalStatus} setSelected={setMovieSelected}/>
               
            ))}


         </section>

        <footer>
            Projeto construído por Jonathan no curso <span role="img" aria-label="satelite">📡</span> B7Web <br/>
            Direitos de imagem para Netflix <br/>
            Dados obtidos do site Themoviedb.org  
         </footer>

         {
            movieList.length <= 0  &&
            <div className="loading">
               <img src={require('./img/netflix.gif')} alt="Carregando"/>
            </div>

         }
         <Modal status={modalStatus} setStatus={setModalStatus}>
            {/* Filme clicado: {idFilmeModal} */}
            <ModalMovie movie={movieSelected}>

            </ModalMovie>
         </Modal>

      </div>
   )
}