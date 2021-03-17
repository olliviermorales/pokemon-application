import React, { useState } from 'react'
import { Grid, GridItem, Container, FormControl, Input,  Button } from '@chakra-ui/react';

const Search = ({ isSubmitting, getPokemon}) => {
  const [search, setSearch] = useState('');
  return (
    <Container>
        <FormControl id="pokemon">
          <Grid templateColumns="repeat(6, 1fr)" gap={4}>
            <GridItem colSpan={4}>
              <Input placeholder="Search for Pokemon" onChange={(e) => setSearch(e.target.value)} />
            </GridItem>
            <GridItem colSpan={2}>
              <Button
                width={200}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
                onClick={(e) => getPokemon(search)}
              >
                Search
              </Button>
            </GridItem>
          </Grid>
        </FormControl>
    </Container>
  )
}

export default Search
