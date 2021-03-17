import React from 'react'
import { SimpleGrid, Button } from "@chakra-ui/react";

const Pagination = ({ goToNextPage, goToPrevPage }) => {
  return (
    <SimpleGrid columns={2} gap={4}>
      { goToPrevPage && <Button colorScheme="red" onClick={goToPrevPage}>Previous</Button> }
      { goToNextPage && <Button colorScheme="blue" onClick={goToNextPage}>Next</Button> }
    </SimpleGrid>
  )
}

export default Pagination
