import React from 'react';
import io from 'socket.io-client'

export const CTX = React.createContext();

const initState = {
    allChats: {
        General: [ ],
        Other: [ ]
    },
    user: `user${Math.random(100).toFixed(2)*100}`
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
        default:
           return state;
    }
}

let socket;

//closure alert!
const sendChatAction = (value) => {
    socket.emit('message', value);
}


export default function Store(props) {
    
    const [contextState, dispatch] = React.useReducer(reducer, initState);

    if(!socket) {
        socket = io(':3001');
        socket.on('message', (chat) => {
            dispatch({type: 'RECEIVE_MESSAGE', payload: chat});
        });
    }

    const addTopic = (newTopic) => {
        dispatch({type: 'ADD_TOPIC', payload: {newTopic}});
    }

    console.log('contextstate\n' + JSON.stringify(contextState));
    const {allChats, user} = contextState;

    console.log('allchats\n' + JSON.stringify(allChats));
    console.log('user\n' + user);
    return(
        <CTX.Provider value={{allChats, user, addTopic, sendChatAction}}>
            {props.children}
        </CTX.Provider>
    )
}