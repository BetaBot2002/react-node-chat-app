import { Badge } from '@chakra-ui/react'
import React from 'react'
import { Colors } from '../../Utils/CSS-Variables';
import { CloseIcon } from '@chakra-ui/icons';

const UserBadgeItem = ({ user, handleDelete, admin }) => {
    return (
        <Badge
            px={2}
            py={1}
            borderRadius={"lg"}
            m={1}
            mb={2}
            variant={"solid"}
            fontSize={12}
            backgroundColor={Colors.theme_dark_lavender}
            cursor={"pointer"}
            onClick={handleDelete}
        >
            {user.name}
            <CloseIcon pl={1} />
        </Badge>
    );
};

export default UserBadgeItem
