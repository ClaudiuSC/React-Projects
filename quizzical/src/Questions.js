import React from "react"
import { decode } from "he"

export default function Questions(props) {
    const renderResponses = props.answers.map(item =>  {
        let className = item.isSelected ? "selected" : ""
        
        if(!props.gameStatus) {
            if(item.isCorrect) {
                className = "correct"
            }   else if(item.isSelected && !item.isCorrect) {
                className = "incorrect"
            }
        }

        return <span 
            onClick={() => props.handleClick(item.id, item.parentId)} 
            id={item.id}
            key={item.id}
            className={className}
        >
            {decode(item.answer)}
        </span>
        })
    return (
        <div className="question">
            <h3>{decode(props.question)}</h3>
            <div>
                {renderResponses}
            </div>
        </div>
    )
}