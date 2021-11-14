# Who Sings ?
Are you prepared on music? <br>
Expecially, are you prepared on lyrics? <br> 
Test yourself with this quiz game! Guess the artists by given lyrics and improve yourself!

***All data are provided by Musixmatch APIs***

## Features
<ul>
  <li> Play locally with your friends. All data are client-stored using IndexedDB technology</li>
  <li> Login with username </li>
  <li> See your 10 latest games </li>
  <li> See the high scores </li>
  <li> Play with music genres choosen by you</li>
</ul>

## Game Mode
Every game is created according to the music genres defined on the gameConfig.json file, with the musixmatch ***genres id***. A genre will e randomly extracted from the list.

***To improve the gameplay (expecially the questions answers) had been involved the artist.related.get api but some artists don't have them. TO FIX***

## Technologies
<ul>
  <li>React.js</li>
  <li>Material UI</li>
  <li>Indexed DB</li>
  <li>Redux (for login)</li>
  <li>Other JS modules</li>
</ul>

## Configuration

***gameConfig.json***
<ul>
  <li> <b>Music Genres</b>: you can add your favorites genres to the gameConfig.json file at the key "musicGenres". </li>
  <li> <b>Total Questions</b>: you can add the number of questions for every game to the gameConfig.json file at the key "totalQuestions". </li>
  <li> <b>db Version</b>: if the client indexedDB is giving you problems, just change the dbVersion at the key "dbVersion". </li>
</ul>

***.env***
<ul>
  <li>REACT_APP_MUSIXMATCH_API_KEY: Here you can add your own MusixMatch API key</li>
  <li>REACT_APP_PROXY_URL: Here you can add your own Proxy Url. ***This is necessary because of the Musixmatch APIs Cors policies***</li>
</ul>


## Installation
The dipendencies manager is ***yarn***.
Just do a ***yarn install***.

## Preview
<b>Mobile</b>
<br>
![mobile1](https://user-images.githubusercontent.com/28901666/141699628-092d248a-af88-476a-b8fc-9c5c7098b84a.png)
![game2](https://user-images.githubusercontent.com/28901666/141699643-d4fa79a0-5922-4d76-b8b9-c7466d71f269.png)

<br>
<b>Desktop</b>
<br />
![desk1](https://user-images.githubusercontent.com/28901666/141699080-43d4251a-d2ef-4436-b8fc-ca657d3146dd.png)
![game1](https://user-images.githubusercontent.com/28901666/141699338-0b5ed147-c2cf-4abc-9840-33df252f35dd.png)
![hiscores](https://user-images.githubusercontent.com/28901666/141699349-7693cdc8-d139-4ba7-b564-ef08c3d62399.png)



