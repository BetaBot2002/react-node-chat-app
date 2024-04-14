import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'
import { Colors } from '../../Utils/CSS-Variables'

const UserListItem = ({user, handleClick }) => {
  
    return (
      <Box
        onClick={handleClick}
        cursor="pointer"
        bg={Colors.theme_lavender}
        _hover={{
          background:  Colors.theme_dark_lavender,
          color: Colors.theme_light,
        }}
        w="100%"
        display="flex"
        alignItems="center"
        color="black"
        px={3}
        py={2}
        mb={2}
        borderRadius="lg"
      >
        <Avatar
          mr={2}
          size="sm"
          cursor="pointer"
          name={user.name}
          src={user.profilePic}
        />
        <Box>
          <Text>{user.name}</Text>
          <Text fontSize="xs">
            <b>Email : </b>
            {user.email}
          </Text>
        </Box>
      </Box>
    )
  }
  

export default UserListItem
