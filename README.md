# Who Sings ?
Are you prepared on music? <br>
Test yourself with this quiz game! Guess the artists by given lyrics and improve yourself!

***All data are provided by Musixmatch APIs*** 
<br>

**Preview on firebase hosting:**
https://whosings-ecf10--whosings-qhxri4n1.web.app/

## Features
- Play locally: all data are client-stored using IndexedDB technology
- Login with username 
- See your 10 latest games 
- See the high scores 
- Play with music genres choosen by you

## Game Mode
Every game is created according to the music genres defined on the gameConfig.json file, with the musixmatch ***genre id***. 
A genre will be randomly extracted from the list.

## Technologies
- React.js
- Material UI
- Indexed DB
- Redux (for login)
- Other JS modules

## Configuration

**gameConfig.json parameters**
  - **musicGenres** : here you can add your favorites genres. For every genre you have to add its musixMatch genre id. *Default: pop, pop rock, indie pop*
  - **Total Questions**: here you can choose the number of total questions. *Default: 5*
  - **db Version**: if the client indexedDB is giving you problems, here you can change its version. *Default: 1*

**.env parameters**

  - **REACT_APP_PROXY_URL**: Here you can add your own Proxy Url. ***This is necessary because of the Musixmatch APIs Cors policies***

## Installation
Just ***yarn***.
