import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const ChatContext = createContext({
    currentConversation: null,
    setCurrentConversation: () => { },
})

export const ChatProvider = ({ children }) => {
    const [currentConversation, setCurrentConversation] = useState(null);
    return (
        <ChatContext.Provider
            value={{
                currentConversation,
                setCurrentConversation
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

ChatProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export const useChatContext = () => useContext(ChatContext);