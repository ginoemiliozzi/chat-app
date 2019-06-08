import React from 'react';
import io from 'socket.io-client'

export const CTX = React.createContext();

const initState = {
        General: [ ],
        Other: [ ]
}

const reducer = (state, action) => {
    switch(action.type){
        case 'RECEIVE_MESSAGE':
            const {from, msg, topic} = action.payload;
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {  from, msg }
                ]
            }
        case 'ADD_TOPIC':
            const { newTopic } = action.payload;
            if(!(newTopic in state)) {
                return {
                    ...state,
                    [newTopic] : []
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


const user = 'user' + Math.random(100).toFixed(2)*100;

export default function Store(props) {
    
    const [allChats, dispatch] = React.useReducer(reducer, initState);

    if(!socket) {
        socket = io(':3001');
        socket.on('message', (chat) => {
            dispatch({type: 'RECEIVE_MESSAGE', payload: chat});
        });
    }

    const addTopic = (newTopic) => {
        dispatch({type: 'ADD_TOPIC', payload: {newTopic}});
    }

    return(
        <CTX.Provider value={{allChats, addTopic, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )
}