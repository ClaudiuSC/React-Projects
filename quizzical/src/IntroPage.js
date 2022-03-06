import React from "react"

export default function IntroPage(props) {

    return (
        <div className="intro--page">
            <h1>Quizzical</h1>
            <p>Test your knowledge with some quizzes</p>
            <button onClick={props.handleClick}>Start quiz</button>
        </div>
    )
}