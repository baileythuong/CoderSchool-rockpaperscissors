import React from 'react';

export default function ChoiceCard(props) {
    
    return (
        <div className={`choice-card ${props.winner}`}>
            <h1>{props.title}</h1>
            <img src={props.imgURL} alt={props.title}/>
        </div>
    )
}
