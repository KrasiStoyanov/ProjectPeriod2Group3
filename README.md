# ProjectPeriod2Group3
### Getting started
------
1. Install Git in order to use GitHub https://git-scm.com/downloads.
2. Copy the HTTPS link after clicking the green **Clone or download** button and open cmd/power shell/etc. somewhere you would like to clone the repository.
3. Write `git clone [link you copied]` and press enter
4. Install [NodeJS](https://nodejs.org/en/) (NodeJS comes with `npm` so you don't need to install it manually)
   * You need NodeJS for running your server as well as all plugins which you install using `npm`.
   * You install packages/plugins using `npm`. You write that in the **command prompt (cmd)/power shell/etc**.
   * When you need to install a package you just write `npm install [package name]` (**NOTE**: this way you only install the package in the folder you are in; some packages need to be installed globally; if needed so, please read the documentation [NPM](https://docs.npmjs.com/)).
   * If you have already got a `package.json` in your project and it has a list with the packages that the project is using, then you only need to run `npm install`.
   * If you want to install new packages you will need to read the documentation to fully understand the different ways you can do it [NPM](https://docs.npmjs.com/).
5. Install `gulp` globally - `npm install --global gulp-cli`
6. Open the cmd/power shell/etc. in the root folder of the project and type in `npm install`
   * That way you will install all the packages/plugins you need in order to run the project.
7. Type in the cmd/power shell/etc. `gulp development`
   * After typing this, gulp will start running a local server which can be accessed at http://localhost:8080. However, just to be sure what the exact address is, it is always displayed after the server has started.
   * No only the server, but all other tasks that gulp needs to run in order to compile the code you are writing, etc. is also going through that command.
   * If you wish to see where these tasks are, you can open the `gulpfile.js` file in the root folder
8. Open the browser and navigate to the server's address

### File structure
------
```
├── build
├── node_modules
├── src
│   ├── css
│   │   └── style.css
│   ├── js
│   |   ├── card-types
│   |   |   ├── ...
│   |   ├── challenges
│   |   |   ├── ...
│   |   ├── constants
│   |   |   ├── ...
│   |   ├── data
│   |   |   ├── ...
│   |   ├── decks
│   |   |   ├── ...
│   |   ├── player
│   |   |   ├── ...
│   |   ├── render
│   |   |   ├── ...
│   |   ├── selection
│   |   |   ├── ...
│   |   ├── states
│   |   |   ├── ...
│   |   ├── validators
│   |   |   ├── ...
│   |   ├── game.js
│   │   └── main.js
├── .babelrc
├── gulpfile.js
├── index.html
├── package.json
└── phaser.min.js
```

1. `build` is the folder where the compiled code is placed.
2. `node_modules` is the folder with all the installed npm packages
3. `card-types` is the folder with the cards skeleton
3. `challenges` is the folder with the challenge stages
4. `constants` is the folder with all the global types and values stored in several variables, which could be accessed in every file if needed
5. `data` is the folder where all the data objects for our game are stored
6. `decks` is the folder with the code which returns the complete decks with all cards in them
7. `player` is the folder with the actual player class and all his functionality
7. `render` is the folder with all the rendering files
7. `selection` is the folder with the user selection - drag and dropping, clicking, etc.
7. `states` is the folder with all the states in the game
8. `validators` is the folder with all the validator helpers
9. `game.js` for now is the file containing all the code for the game
10. `main.js` is the file that combines all the modules
11. `gulpfile.js` is the file for the gulp settings - server setup and the tasks setup as well
12. `index.html` is the index html file
13. `package.json` is the file with the list of all the packages you need to install using `npm`
14. `phaser.min.js` is Phaser
