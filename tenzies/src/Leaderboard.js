import React from "react"

export default function Leaderboard(props) {
    const results = props.results.sort((a,b) => a.rounds - b.rounds)

    const leaderboard = results.slice(0, 10).map((item,index) => 
            <div className="leaderboard--line" key={index}>
                <strong>{index + 1}</strong>
                <span>No. of rounds - <strong>{item.rounds}</strong></span>
                <span>Time - <strong>{item.time}</strong></span>
            </div>)

    return (
        <div className="leaderboard">
            <h3>Best {leaderboard.length} results by no. of rounds</h3>
            {leaderboard}
        </div>
    )
}