import React from "react"
import "./index.css"
import IntroPage from "./IntroPage"
import MainPage from "./MainPage"

export default function App() {
  const [renderPage, setRenderPage] = React.useState(false)

  function showMain() {
    setRenderPage(!renderPage)
  }

  return (
    <div className="app--container">
        {renderPage ?
          <MainPage /> :
          <IntroPage handleClick={showMain}/>
        }
    </div>
  );
}

