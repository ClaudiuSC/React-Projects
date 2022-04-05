import { useFetch } from "../../hooks/useFetch"
import { useParams } from "react-router-dom"

// styles
import "./Recipe.css"

export default function Recipe() {
    const { id } = useParams()
    const url = `http://localhost:3000/recipes/${id}`

    const { data: recipe, isPending, error} = useFetch(url)

    return (
        <div className="recipe">
            {isPending && <p className="loading">Recipe is loading, please be patient</p>}
            {error && <p className="error">Error loading recipe, try again later</p>}
            {recipe && <>
                    <h1 className="page-title">{recipe.title}</h1>
                    <p className="cooking-time">Cooking time is {recipe.cookingTime}</p>
                    <ul>
                        {recipe.ingredients.map((item, index) => 
                            <li key={index}>{item}{index < recipe.ingredients.length-1 ? "," : "."}</li>)}
                    </ul>
                    <p>{recipe.method}</p>
                </>}
        </div>
    )
}