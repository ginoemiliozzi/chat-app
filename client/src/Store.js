import React, { useReducer } from 'react';
import io from 'socket.io-client'

export const CTX = React.createContext();

const initState = {
    allChats: {
        General: [ ],
        Other: [ ]
    },
    user: `User${Math.random(100).toFixed(2)*100}`
}

const reducer = (state, action) => {
    switch(action.type){
        case 'RECEIVE_MESSAGE':
            const {from, msg, topic} = action.payload;
            return {
                ...state,
                allChats: {
                    ...state.allChats,
                    [topic]: [
                        ...state.allChats[topic],
                        {  from, msg }
                    ]
                }
            }
        case 'ADD_TOPIC':
            const { newTopic } = action.payload;
            if(!(newTopic in state)) {
                return {
                    ...state,
                    allChats: {
                        ...state.allChats,
                        [newTopic] : []
                    }
                }
            } else {
                return state;
            }
        case 'CHANGE_USERNAME':
            const {newUserName} = action.payload;
            return {
                ...state,
                user: newUserName
            }
        default:
           return state;
    }
}

let socket;

//closure alert!
const sendChatAction = (value) => {
    socket.emit('message', value);
}


export default function Store({children}) {
    
    const [contextState, dispatch] = useReducer(reducer, initState);

    if(!socket) {
        socket = io(':3001');
        socket.on('message', (chat) => {
            dispatch({type: 'RECEIVE_MESSAGE', payload: chat});
        });
    }

    const addTopic = (newTopic) => {
        dispatch({type: 'ADD_TOPIC', payload: {newTopic}});
    }

    const changeUserName = (newUserName) => {
        dispatch({type: 'CHANGE_USERNAME', payload: {newUserName}});
    }

    const {allChats, user} = contextState;

    return(
        <CTX.Provider value={{allChats, user, addTopic, sendChatAction, changeUserName}}>
            {children}
        </CTX.Provider>
    )
}