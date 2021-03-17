import React, { useState, useEffect } from 'react';
import { Flex, Container, Input } from "@chakra-ui/react";
import PokemonCards from "./PokemonCards";
import Pagination from "./Pagination";
import axios from 'axios';

const LandingContainer = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [filter, setFilter] = useState('');
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
    const pokemonData = await Promise.all(data?.map(async pokemon => {
      const pokemonRecord = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      return pokemonRecord;
    }))
    const filtered = pokemonData.filter(pokemon => {
      return pokemon.data.name.toLowerCase().includes(filter.toLowerCase())
    })
    setPokemonData(filtered);
  }


  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const res = await axios.get(currentPageUrl);
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      setLoading(false);
      await loadPokemon(res?.data?.results?.map((p) => p.name));
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageUrl, filter]);

  return (
    <Container maxW="container.xl" paddingY={20}>
      <Flex align="center">
        <Input marginX="auto" width={500} placeholder="Search for Pokemon" onChange={(e) => setFilter(e.target.value)} />
      </Flex>
      <PokemonCards isLoading={loading} pokemon={pokemonData}/>
      <Pagination 
        pokemon={pokemonData}
        goToNextPage={nextPageUrl ? goToNextPage : null} 
        goToPrevPage={prevPageUrl ? goToPrevPage : null} 
      />
    </Container>
  )
}

export default LandingContainer
