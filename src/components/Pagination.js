import React from 'react'
import { SimpleGrid, Button } from "@chakra-ui/react";

const Pagination = ({ goToNextPage, goToPrevPage, pokemon }) => {
  return (
    <SimpleGrid columns={2} gap={4}>
      { pokemon.length > 11 &&
        <>
          <Button disabled={goToPrevPage ? false : true } colorScheme="red" onClick={goToPrevPage}>Previous</Button>
          <Button disabled={goToNextPage ? false : true} colorScheme="blue" onClick={goToNextPage}>Next</Button>
        </>
      }
    </SimpleGrid>
  )
}

export default Pagination
