# Connect-four-game

## Table of contents / Tabla de contenidos

- [Overview / Resumen](#overview)
- [Built With / Hecho con](#built-with)
- [Development / Desarrollo ](#features)
- [Contact / Contacto](#contact)
- [Acknowledgements / Agradecimientos](#acknowledgements)

## Overview / Resumen

- https://jprioses-connect-four.netlify.app/

It's a straightforward game - you just choose how you want to play and start playing. If you choose to play with the CPU, you will always be playing as the red team. Each player has 30 seconds to make a move; otherwise, the other player wins. Every disk you place will drop to the lowest part of the grid column. The one who place 4 disk in row no matter if horizontally, vertically or diagonally.

This project is tagged as advanced in Frontend Mentor and is intended for premium users, so I         couldn't see the complete challenge. However, I decided to make it with the tools I had. I did this  project to prove my logic, knowledge, and my problem-solving approach at that moment.

In this project, I needed to create an app that allowed users to play with another person or with the machine. So, I decided to first make it for two people and then add some logic for the machine to play as the second player by joining it with the first logic.

To start, I looked at the public images and began to make vectors and designs with Figma on my own. To ensure that the game met all the requirements of the challenge, I found a link from someone else and examined their interactions and designs.

"I needed to use custom hooks and useEffect to handle state. The useEffect hook was especially important because it helped me connect the logic, timers, and states to the components."

## Built with / Hecho con

- Create-react-app https://create-react-app.dev/

    I used it to intiallize the project with React (A few days later I saw the news that CRA will not be supported anymore)

- React https://es.reactjs.org/ 

    As the Frontend library, I used React with react-dom and used some React hooks like, useState, useEffect, and customHook.

- React-router-dom https://reactrouter.com/en/main

    I wanted a way to handle routes in my app, and this library is very useful for this kind of project.

- Framer-motion https://www.framer.com/motion/

    I needed to animate the disk drop from the top when a column is clicked.

- Netlify https://www.netlify.com

    Needed to deploy and publish project with free hosting and domain.

- Figma https://www.figma.com

    I used Figma to make all vectors and images.

## Development / Desarrollo 

1. I created the main component with 3 links to other components and styled them.

2. I wrapped the entire app in react-router and assigned specific paths to the parent components. This app has only 3 paths: '/', '/game', and '/rules'.

3. I created the Game component with all its elements and three child components (Grid, Timer, and Winner). The Grid component has the disks and a grid split into 6 columns made with SVG and rect HTML tags. Its purpose is to listen to clicks and trigger a function that sends a specific column number to a custom hook called usePlay. After that, I rendered the entire new grid adding the motion component to the new disk in the grid. The Timer component has the setInterval function inside a useEffect hook to create the timer. The Winner component listens for when there is a winner to stop the timer and render the winner.

4. The usePlay custom hook is responsible for saving and changing the state of the current player, the grid (which is a 7x6 matrix full of zeros), the sum of the wins of each player, the pause of the game, the initial timer, the winning play, and the functions to set a new disk to the grid, update the grid, verify if the last move was a winning position, and change players.

5. The useCpuPlay custom hook only analyzes the entire grid and checks for patterns in some function. It populates an empty array with an object that contains the prior moves from 6 to -1. 6 prior means a winning move for the CPU, 5 prior means a winning move for player 1, 4 prior means an almost win for the CPU, 3 prior means an almost win for player 1, 2 prior means a possible win with 2 more plays, 1 means a possible win with 3 more plays, prior 0 means there is no possible win with that move for anyone, -1 prior means there is a possible win for player 1 with that move. Each prior has its column array, which contains the numbers of the columns to make the move. Finally, a function checks the prior and selects a random value from the column, but it will check for the greatest prior first. It will return the column number, which will be passed to the setnewdisk function inside the usePlay hook.

6. Finally, I saved the cpu state into local storage to persist it after refresh.

## Contact / Contacto

You can contact me:
- Mail -> jprioses@outlook.com
- Linkedin -> https://www.linkedin.com/in/jprioses/

You can see my porftolio:
- https://jprioses.github.io/Personal-React-Portfolio/

## Acknowledgements / Agradecimientos

- https://webguy83.github.io/connect-four-react/
- https://webguy83.github.io/connect-four-react/
- https://blog.bitsrc.io/5-methods-to-persisting-state-between-page-reloads-in-react-8fc9abd3fa2f
- https://dev.to/zhiyueyi/how-to-create-a-simple-react-countdown-timer-4mc3