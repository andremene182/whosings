# Who Sings ?
Are you prepared on music? <br>
Test yourself with this quiz game! Guess the artists by given lyrics and improve yourself!

***All data are provided by Musixmatch APIs*** 
<br>
***Preview on firebase hosting:*** 
https://whosings-ecf10--whosings-qhxri4n1.web.app/

## Features
<ul>
  <li> Play locally: all data are client-stored using IndexedDB technology</li>
  <li> Login with username </li>
  <li> See your 10 latest games </li>
  <li> See the high scores </li>
  <li> Play with music genres choosen by you</li>
</ul>

## Game Mode
Every game is created according to the music genres defined on the gameConfig.json file, with the musixmatch ***genres id***. A genre will be randomly extracted from the list.

## Technologies
<ul>
  <li>React.js</li>
  <li>Material UI</li>
  <li>Indexed DB</li>
  <li>Redux (for login)</li>
  <li>Other JS modules</li>
</ul>

## Configuration

***Modify the gameConfig.json***
<ul>
  <li> <b>Music Genres</b>: you can add your favorites genres to the gameConfig.json file at the key "musicGenres". </li>
  <li> <b>Total Questions</b>: you can add the number of questions for every game to the gameConfig.json file at the key "totalQuestions". </li>
  <li> <b>db Version</b>: if the client indexedDB is giving you problems, just change the dbVersion at the key "dbVersion". </li>
</ul>

***Create the .env file and add these keys***
<ul>
  <li>REACT_APP_MUSIXMATCH_API_KEY: Here you have add your own MusixMatch API key</li>
  <li>REACT_APP_PROXY_URL: Here you can add your own Proxy Url. ***This is necessary because of the Musixmatch APIs Cors policies***</li>
</ul>

## Installation
Just ***yarn***:
