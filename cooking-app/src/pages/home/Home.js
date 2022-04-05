import { useFetch } from "../../hooks/useFetch"

// styles
import "./Home.css"

// components
import RecipeList from "../../components/RecipeList"

export default function Home() {
    const url = "http://localhost:3000/recipes"

    const { data, isPending, error } = useFetch(url)

    return (
        <div className="home">
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {data && <RecipeList recipes={data}/>}
        </div>
    )
}