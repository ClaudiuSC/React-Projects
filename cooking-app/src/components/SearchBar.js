import { useState } from "react"
import { useHistory } from "react-router-dom"

// styles
import "./SearchBar.css"

export default function SearchBar() {
    const [query, setQuerry] = useState("")
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
       
        history.push(`/search?q=${query}`)
        setQuerry("")
    }

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Search: </span>
                    <input 
                        type="text"
                        onChange={(e) => setQuerry(e.target.value)}
                        value={query}
                    />
                </label>
            </form>
        </div>
    )
}