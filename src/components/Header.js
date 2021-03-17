import React from 'react';
import { Link } from "react-router-dom";
import { Menu, MenuItem, Text, Heading, Flex, Spacer } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="red.500"
      color="white"
    >
      <Flex align="center">
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          <Link to="/">
            Pokemon
          </Link>
        </Heading>
        <Heading as="h4" size="sm" marginLeft={20}>
          <Link to="/my-team">
            My Team
          </Link>
        </Heading>
      </Flex>
      <Spacer />

    </Flex>
  )
}

export default Header;
