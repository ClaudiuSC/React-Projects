import { Link } from "react-router-dom"

// styles
import "./RecipeList.css"

export default function RecipeList({ recipes }) {

    if(recipes.length === 0) {
        return <div className="error">No recipes to load...</div>
    }

    return (
        <div className="recipe-list">
            {recipes.map(recipe => 
                <Link to={`/recipes/${recipe.id}`}  key={recipe.id}>
                    <div className="card">
                        <h2>{recipe.title}</h2>
                        <p>Cooking time: {recipe.cookingTime}</p>
                        <div>{recipe.method.substring(0, 100)}...</div>  
                    </div>
                </Link>            
            )}
        </div>
    )
}
