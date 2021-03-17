import React, { useState } from 'react';
import { useToast, List, ListItem, Box, Button, Image, Stack, Badge, VStack, SimpleGrid, Flex, Spinner, Text} from '@chakra-ui/react';
import { StarIcon } from "@chakra-ui/icons";
const getStorage = (name = '') => JSON.parse(localStorage.getItem(name));

const PokemonCards = ({ pokemon, isLoading }) => {
  const toast = useToast();
  const [team, setTeam] = useState(getStorage('pokemon_data') || []);
  const teamIsFull = team.length >= 6;
  const storeStorage = (name = '', value = {}) => {
    setTeam(prev => [...prev, value]);
    localStorage.setItem(name, JSON.stringify([...team, value]));
    const pokeName = value.name.toUpperCase();
    toast({
      title: "Pokemon added.",
      description: `${pokeName} was successfully added to your team!`,
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right"
    })
  }
  
  return (
    <>
      <Text align="center" marginTop="10" fontSize="6xl">Choose Your Pokemon</Text>
      {
        isLoading ?
        <Flex align="center" justify="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex> : null
      }
      <SimpleGrid columns={pokemon?.length > 0 ? 3 : 1} padding={20} spacing={10}>
        { pokemon?.length > 0 ?
          pokemon?.map((p => {
            const { data } = p;
            const isOnTeam = team?.some((t) => t?.id === data?.id);
            return (
              <Box maxW="500px" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Button colorScheme={isOnTeam ? "green" : teamIsFull ? "blue" : "yellow"} disabled={isOnTeam || teamIsFull } onClick={() => storeStorage("pokemon_data", data)}>
                    {isOnTeam ? "Already In Team" : teamIsFull ? "Team Full" : "Add To Team"}
                </Button>
                <Image height={150} align="center" marginX="auto" src={data.sprites.front_default} alt="" />
                <Box
                  fontWeight="semibold"
                  lineHeight="tight"
                  isTruncated
                  align="center"
                  textTransform="uppercase"
                >
                  <Text textColor="blue.500" fontSize="2xl">{data.name}</Text>
                </Box>
                <Box p="6">
                  <Box d="flex" alignItems="baseline">
                    <Stack direction="row">
                      {
                        data.types.map((x) => {
                          const { name } = x.type
                          return (
                            <Badge borderRadius="full" px="2" spacing={4} colorScheme="red">
                              {name}
                            </Badge>
                          )
                        })
                      }
                    </Stack>
                  </Box>
                  {}
                  <Box
                    my="2"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    Abilities
                    <VStack align="start">
                      {
                        data.abilities.map((x) => {
                          const { name } = x.ability
                          return (
                            <List>
                              <ListItem>
                                <StarIcon color="blue.500" mx="4" />{name}
                              </ListItem>
                            </List>
                          )
                        })
                      }
                    </VStack>
                  </Box>
    
                  <Box
                    my="2"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    Weight: {data.weight}
                    <Box as="span" color="gray.600" fontSize="sm">
                      lbs
                    </Box>
                  </Box>
                  <Box
                    my="2"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    Height: {data.height}
                    <Box as="span" color="gray.600" fontSize="sm">
                      ft
                    </Box>
                  </Box>
                </Box>
              </Box>
            )
          })) : <Text align="center" fontSize="4xl" fontWeight="light">No Pokemon Found</Text>}
      </SimpleGrid>
    </>
  )
}

export default PokemonCards
