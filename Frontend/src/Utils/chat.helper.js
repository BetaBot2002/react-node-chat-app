const getSender = (loggedUser, users) => {
    return users[0]?.id === loggedUser?.id ? users[1] : users[0];
}

const isSameSender = (messages, currentMessage, index, loggedUserId) => {
    return (
        index < messages.length - 1 &&
        (messages[index + 1].sender.id !== currentMessage.sender.id ||
            messages[index + 1].sender.id === undefined) &&
        messages[index].sender.id !== loggedUserId
    );
};

const isLastMessage = (messages, index, loggedUserId) => {
    return (
        index === messages.length - 1 &&
        messages[messages.length - 1].sender.id !== loggedUserId &&
        messages[messages.length - 1].sender.id
    );
};

const isSameSenderMargin = (messages, currentMessage, index, loggedUserId) => {
    if (
        index < messages.length - 1 &&
        messages[index + 1].sender.id === currentMessage.sender.id &&
        messages[index].sender.id !== loggedUserId
    )
        return 33;
    else if (
        (index < messages.length - 1 &&
            messages[index + 1].sender.id !== currentMessage.sender.id &&
            messages[index].sender.id !== loggedUserId) ||
        (index === messages.length - 1 && messages[index].sender.id !== loggedUserId)
    )
        return 0;
    else return "auto";
};

const isSameUser = (messages, currentMessage, index) => {
    return index > 0 && messages[index - 1].sender.id === currentMessage.sender.id;
};

export {
    getSender,
    isSameSender,
    isLastMessage,
    isSameSenderMargin,
    isSameUser
}