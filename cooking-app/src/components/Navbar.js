import { Link } from "react-router-dom"

// components
import SearchBar from "./SearchBar"

// styles
import "./Navbar.css"

export default function Navbar() {
    return (
        <div className="navbar">
            <nav>
                <Link to="/" className="logo">
                    <h1>Cooking App</h1>
                </Link>
                <SearchBar />
                <Link to="/create" className="btn">
                    Create Recipe 
                </Link>
            </nav>
        </div>
    )
}