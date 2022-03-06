import React from "react"
import Questions from "./Questions"
import {nanoid} from "nanoid"
import Loading from "./Loading"

export default function MainPage() {
    const [questions, setQuestion] = React.useState([])
    const [startGame, setStartGame] = React.useState(true)
    const [score, setScore] = React.useState(0)

    function getAllQuestions(data) {
        const allQuestions = data.map(item => {
            const allAnswers = [item.correct_answer, ...item.incorrect_answers]
            return getOneQuestion(item.question, allAnswers, item.correct_answer)
        })
        setQuestion(allQuestions)
    }

    function getOneQuestion(questionToReceive, answersToReceive, correctAnswer) {
        const questionId = nanoid()

        const answersArray = answersToReceive.map(item => ({
            answer: item, 
            isSelected: false, 
            id: nanoid(),
            parentId: questionId,
            isCorrect: false
        }))

        return {
            question: questionToReceive,
            answers: answersArray,
            correct: correctAnswer,
            id: questionId
        }
    }

    function selectQuestion(childId, parentId) {
        startGame &&
        setQuestion(prevQuestions => prevQuestions.map(question => {
            if(parentId === question.id) {
                const newAnswers = question.answers.map(answer => {
                    if(childId === answer.id) {
                        return {...answer, isSelected: true}
                    } else {
                        return {...answer, isSelected: false}
                    }
                })
                return question.answers = {...question, answers: [...newAnswers]}
            } else {
                return question
            }
        }))
    }
    
    function checkAnswers() {
        if(checkIfAllAreSelected()) {
            setQuestion(prevQuestions => prevQuestions.map(question => {
                // validate correct answers to determine classNames in <Question />
                const check = question.answers.map(answer => {
                        if(question.correct === answer.answer) {
                            // count correct answers
                            if(answer.isSelected) {
                                setScore(prevScore => prevScore + 1)
                            }
                            return {...answer, isCorrect: true}
                        } else {
                            return {...answer}
                        }
                    })
                    return question.answers = {...question, answers: [...check]}
                }))
            setStartGame(false)
        }
    }

    function newGame() {
        setStartGame(true)
        setScore(0)
        setQuestion([])
    }

    // function that checks if user made all the selections with the scope of preventing checkAnswers() to run
    function checkIfAllAreSelected() {
        let count = 0
        questions.forEach(item => item.answers.forEach(item => 
            item.isSelected ? count = count + 1 : count))
        if(count === 5) {
            return true
        }
    }
    
    React.useEffect(() => {
        if(startGame) {
            fetch("https://opentdb.com/api.php?amount=5")
                .then(res => res.json())
                .then(data => {
                    const questionsData = data.results
                    getAllQuestions(questionsData)
                })
        }
    }
    , [startGame])

    const allQuestions = questions.map(item => {
        return <Questions 
            handleClick={selectQuestion} 
            question={item.question}
            answers={item.answers}
            key={item.id}
            id={item.id}
            correct={item.correct}
            gameStatus={startGame}
    />})
    
    return (
        <div className="main--page">
            <div>{allQuestions.length > 0 ? allQuestions : <Loading />}</div>
            <div>
                {!startGame && <span className="score">You scored {score}/5 correct answers</span>}
                {startGame ? <button onClick={checkAnswers}>Check answers</button> : 
                            <button onClick={newGame}>New quizz</button>}
            </div>
        </div>
    )
}