import React from 'react';
import io from 'socket.io-client'

export const CTX = React.createContext();

const initState = {
        topic1: [ ],
        topic2: [ ]
}

const reducer = (state, action) => {
    const {from, msg, topic} = action.payload;
    switch(action.type){
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {  from, msg }
                ]
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



    return(
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )
}