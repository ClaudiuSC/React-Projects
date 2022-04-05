import { useState, useRef, useEffect } from "react"
import { useFetch } from "../../hooks/useFetch"
import { useHistory } from "react-router-dom"

// styles
import "./Create.css"

export default function Create() {
    const [title, setTitle] = useState("")
    const [time, setTime] = useState("")
    const [method, setMethod] = useState("")
    const [ingredient, setIngredient] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [checkIngredients, setCheckIngredients] = useState(false)
    const ing = useRef(null)
    const history = useHistory()

    const { postData, data, error } = useFetch("http://localhost:3000/recipes", "POST")

    const handleSubmit = (e) => {
        e.preventDefault()
        if(ingredients.length === 0) {
            ing.current.focus()
            setCheckIngredients(true)
            return
        }
        
        postData({title, ingredients, method, cookingTime: time + " minutes", })
    }
    
    const handleClick = () => {
        if(ingredient && !ingredients.includes(ingredient)) {
            setIngredients(prevIngredients => [...prevIngredients, ingredient])
            setIngredient("")
        } else (
            setIngredient("")
        )
        setCheckIngredients(false)
        ing.current.focus()
    }
    
    useEffect(() => {
        if(data) {
            history.push("/")
        }
    }
    ,[data, history])

    // const test = (event) => {
    //     if (event.target.validity.valueMissing) {
    //         event.target.setCustomValidity('Please, you are a true Front End Dev.');
    //       }
    // }

    // const reTest = (event) => {
    //     event.target.setCustomValidity('');
    // }

    return (
        <div className="create">

            <h2 className="page-title">Add a new recipe</h2>

            <form onSubmit={handleSubmit}>

                <label>
                    <span>Recipe title:</span>
                    <input 
                        type="text"
                        onChange={e => 
                                {
                                    setTitle(e.target.value)
                                    // reTest(e)
                                }}
                        value={title}
                        required
                        // onInvalid={test}
                        />
                </label>

                <label>
                    <span>Ingredients:</span>
                    <div className="ingredients">
                        <input 
                            type="text"
                            onChange={e => setIngredient(e.target.value)}
                            value={ingredient}
                            ref={ing}
                        />
                        <button 
                            type="button"
                            className="btn"
                            onClick={() => handleClick()}
                        >Add ingredient</button>
                    </div>
                    {ingredients.length > 0 && 
                        <div style={{fontSize: "1rem"}}>Current ingredients: 
                            {ingredients.map((item, index) => <em key={item}> {item}{index === ingredients.length - 1 ? "." : ","} </em>)}</div>}
                    {checkIngredients && 
                        <p style={{fontSize: "1rem", fontStyle: "italic", color: "red" }}>You forgot to enter the ingredients</p>}
                </label>

                <label>
                    <span>Cooking method:</span>
                    <textarea 
                        onChange={e => setMethod(e.target.value)}
                        value={method}
                        required
                    />
                </label>

                <label>
                    <span>Cooking time in minutes:</span>
                    <input 
                        type="number"
                        onChange={e => setTime(e.target.value)}
                        value={time}
                        required
                        min={1}
                        max={1440}
                        />
                </label>

                <button type="submit" className="btn">Add recipe</button>

            </form>

        </div>
    )
}