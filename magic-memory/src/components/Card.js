import "./Card.css"

export default function Card({ card, handleChoice, flipped, disabled }) {
    const cardCover = "../img/cover.png"

    return (
        <div 
            className="card" 
            id={card.id}
            style={{pointerEvents: `${disabled ? "none" : "auto"}`}}
        >
            <div className={flipped ? "flipped" : ""}>
                <img src={card.src} className="front" alt="card front"/>
                <img 
                    src={cardCover} 
                    onClick={() => !flipped && handleChoice(card)} 
                    className="back" 
                    alt="card back"
                />
            </div>
        </div>
    )
}