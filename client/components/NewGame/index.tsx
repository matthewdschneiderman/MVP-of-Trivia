import React, { useState, useEffect } from "react";
import ActiveGames from './ActiveGames';
import Preferences from './Preferences';
import axios from 'axios';
import { Prefs } from './../../app';
// import { userInfo } from "node:os";
import { ProgressPlugin } from "webpack";
import { isPropertySignature } from "typescript";

interface IProps {
  handleClick: (_id: string, player: string, creating: boolean, prefs: Prefs) => void;
  change: boolean;
}


export interface Game {
  _id: string,
  user: string,
  prefs: Prefs
}

const NewGame: React.FC<IProps> = (props) => {

  const [user, setUser] = useState<string>(`player${Math.random().toFixed(5)}`);
  const [prefs, setPrefs] = useState<Prefs>({Rounds: null, Questions: null, Time: null});
  const [list, setList] = useState<Game[]>([]);
  const [change, setChange] = useState<Boolean>(false);
  

  useEffect (() => {
    getGames();
  }, [change, props.change]);

  const getGames = () => {
    axios({
      url: '/games',
      method: 'get',
      params: {
        method: 'open',
        prefs: prefs
      }
    }).then((result: any) => {
      setList(result.data);
    });
  }

  const onClick = (newPrefs: Prefs) => {
    setPrefs(newPrefs);
    setChange(!change)
  }

  return (
    <div>
      <div className="header">
        <div className="title">Elites of Trivia</div>
      </div>
    <div className='home'>
      <Preferences prefs={prefs} setPrefs={onClick}/>
      <ActiveGames list={list} handleClick={props.handleClick}/>
      {prefs.Rounds !== null && prefs.Questions !== null && prefs.Time !== null ?
      <div className='createGame' onClick={() => {
        axios({
          url: '/games',
          method: 'post',
          params: {
            method: 'create',
            user: user,
            prefs: prefs
          }
        }).then((result: any) => {
            // replace with waiting screen in new socket
            props.handleClick(result.data, user, true, prefs);
        })
        .catch(() => console.log('Error creating game'));
      }}>
        Create Game as {user}
      </div>
      : null}
    </div>
    </div>
  )
}

export default NewGame;


/*
<h1>Welcome to the Most Thrilling Experiance of Trivia!</h1>
      <h2 className="underlined">About:</h2>
      <div>
      <h3>1. 2 Player Multiple Choice Triva Game</h3>
      <h3>2. Select How Many Rounds (3, 5, 7, 10)</h3>
      <h3>3. Select How Many Questions Per Round (2, 3, 4, 5)</h3>
      <h3>4. Select A Difficulty (easy, medium, hard)</h3>
      <h3>5. Points During Round Will Be Added To Total Score After Round</h3>
      <h3>6. Winner Will Have Option To Add High Score To The LeaderBoard</h3>
      <h3>7. Enjoy The Game!</h3>
      </div>
      <h2>Click Below to Set the Options and Get Started</h2>
      <button className="btn" onClick={handleClick}>New Game</button>
      */