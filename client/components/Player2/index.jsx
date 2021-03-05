import React from "react";


const Player2 = (props) => {
  return (
    <div>
      <div className="player-turn"></div>
        <div className="round-track">
          <span className="span-align">Round <div>{props.currRound}</div></span>
        </div>
        <div className="name2-turn">{props.play2Stat.name}'s Turn</div>
      <div className="cards">{props.categories.map((category) => (
          <div className="card" key={category.id} onClick={() => props.selectedCategory(category.id)}><span className="card-Qs"><div>{category.id - 8}.</div> {category.name}</span></div>
        ))} 
      </div>
    </div>
  )
}

export default Player2;