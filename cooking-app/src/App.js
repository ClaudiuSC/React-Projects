import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// page components
import Home from "./pages/home/Home"
import Recipe from "./pages/recipe/Recipe"
import Search from "./pages/search/Search"
import Create from "./pages/create/Create"
import Navbar from './components/Navbar';

// styles
import './App.css'

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Navbar />

        <div className='app-margin'>
          <Switch>

            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/create">
              <Create />
            </Route>

            <Route path="/search">
              <Search />
            </Route>

            <Route path="/recipes/:id">
              <Recipe />
            </Route>

            <Route path="*">
              <Redirect to="/" />
            </Route>

          </Switch>
        </div>

      </BrowserRouter>
    </div>
  );
}


