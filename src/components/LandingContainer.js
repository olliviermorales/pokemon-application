import React, { useState, useEffect } from 'react';
import { Container } from "@chakra-ui/react";
import PokemonCards from "./PokemonCards";
import Pagination from "./Pagination";
import axios from 'axios';

const LandingContainer = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=12&offset=24");
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);
  
  const goToNextPage = () => {
    setCurrentPageUrl(nextPageUrl);
  }

  const goToPrevPage = () => {
    setCurrentPageUrl(prevPageUrl);
  }

  const loadPokemon = async (data) => {
    const pokemonData = await Promise.all(data.map(async pokemon => {
      const pokemonRecord = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      return pokemonRecord;
    }))
    setPokemonData(pokemonData);
  }

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const res = await axios.get(currentPageUrl);
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.next);
      setLoading(false);
      await loadPokemon(res.data.results.map((p) => p.name));
    };
    fetchData();
  }, [currentPageUrl])
  return (
    <Container maxW="container.xl" paddingY={20}>
      <PokemonCards isLoading={loading} pokemon={pokemonData}/>
      <Pagination isLoading={loading} goToNextPage={nextPageUrl ? goToNextPage : null} goToPrevPage={prevPageUrl ? goToPrevPage : null} />
    </Container>
  )
}

export default LandingContainer
