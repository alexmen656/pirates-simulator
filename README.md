# Pirates Simulator
This project is a multiplayer strategy game where players build bases, deploy ships, and collect resources to compete for the top spot on the leaderboard. With dynamic mechanics, such as increasing costs and rare resources, players must strategize to optimize their progress. The game is designed for real-time interaction and provides an engaging, competitive experience.

## Features
- Dynamic Base Placement: Players can strategically place bases on the map to collect resources within a specified radius.
- Resource Collection System: Includes common resources like Gold and Stones, as well as rare resources like Diamonds, Emeralds, and Rubies.
- Ship Mechanics: Players can purchase and deploy ships that autonomously collect nearby resources.
- Dynamic Costs: The cost of new ships increases as more are purchased, adding a layer of strategy.
- Leaderboard: A real-time leaderboard displays the top players based on their coin count.
- Multi-language Support: English, German, and Spanish interfaces for an inclusive user experience.
- Live Chat: Players can communicate and strategize in real-time.
- Statistical Tracking: Displays player stats, such as number of global bases, and ships owned.
- Interactive Animations: Special animations for finding rare resources like Rubies.

## How to Use

1. Read the Documentation:
- Before diving into the game, read the documentation (which you will find on the Start page) carefully to understand all features and mechanics.

2. Start the Game:
- Enter a username and click "Start" to begin.

3. Place Bases:

- Hold Shift and click on the map to place a base.

4. Collect Resources:

- Watch as your ships and bases collect resources within their respective radii.

5. Build Ships:

- Click the "+Ship" button to purchase a ship. Costs increase dynamically after the first three ships.

6. Monitor Progress:

- Check your stats and the leaderboard to see your ranking and achievements.

7. Communicate:

- Use the live chat to interact with other players.

## Tech Stack

- **Frontend**: Vue.js, MapKit JS (Apple Maps)
- **Event Bus**: Mitt (for communication between components)
- **Other Libraries**: i18n (for multi-language support)
- **Backend**: PHP
- **Database**: Mysql 

## Feedback
- If you have any feedback, feel free to contact me via Slack.
  
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Next Update(s):
- Ship Upgrades for more range
- Stats: How many Gold and Diamonds you have collected
- New types of things to collect
- PVP mode
- Trading collected things
- Special effects
- Special things to collect
