import React, { useState } from 'react';
import { useToast, Container, List, ListItem, Box, Button, Image, Stack, Badge, VStack, SimpleGrid, HStack, Text, Input} from '@chakra-ui/react';
import { StarIcon } from "@chakra-ui/icons";

const getStorage = (name = '') => JSON.parse(localStorage.getItem(name));

const MyTeamContainer = () => {
  const toast = useToast();
  const [team, setTeam] = useState(getStorage('pokemon_data') || []);
  console.log(team);
  const removeFromStorage = (name = '', value = {}) => {
    const newTeam = team.filter(p => p.id !== value.id)
    setTeam(newTeam);
    localStorage.setItem(name, JSON.stringify(newTeam));
    const pokeName = value.name.toUpperCase();
    toast({
      title: "Pokemon Removed.",
      description: `${pokeName} was successfully removed from your team!`,
      status: "warning",
      duration: 9000,
      isClosable: true,
      position: "top-right"
    })
  }

  return (
    <Container maxW="container.xl" paddingY={10}>
      <Text align="center" fontSize="6xl">Your Pokemon Team</Text>
      <SimpleGrid columns={team.length > 0 ? 3 : 1} padding={20} spacing={10}>
        { team.length > 0 ?
          team?.map((p => {
            return (
              <Box maxW="500px" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Button colorScheme="red" onClick={() => removeFromStorage("pokemon_data", p)}>
                    Remove From Team
                </Button>
                <Image height={150} align="center" marginX="auto" src={p?.sprites?.front_default} alt="" />
                <Box
                  fontWeight="semibold"
                  lineHeight="tight"
                  isTruncated
                  align="center"
                  textTransform="uppercase"
                >
                  <Text textColor="blue.500" fontSize="2xl">{p?.name}</Text>
                </Box>
                <Box p="6">
                  <Box d="flex" alignItems="baseline">
                    <Stack direction="row">
                      {
                        p?.types?.map((x) => {
                          const { name } = x?.type
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
                        p?.abilities?.map((x) => {
                          const { name } = x?.ability
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
                    Weight: {p?.weight}
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
                    Height: {p?.height}
                    <Box as="span" color="gray.600" fontSize="sm">
                      ft
                    </Box>
                  </Box>
                </Box>
              </Box>
            )
          })) : <Text align="center" fontSize="4xl" fontWeight="light">No Pokemon Yet, Please Pick Your Pokemon</Text>}
      </SimpleGrid>
    </Container>
  )
}

export default MyTeamContainer
