const getSender=(loggedUser,users)=>{
    return users[0]?.id === loggedUser?.id ? users[1] : users[0];
}

export {
    getSender
}