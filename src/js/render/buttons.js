let game

function displayPauseButton(gameobject){
    game=gameobject;
    let pauseButton = game.add.sprite(game.world.width-10,10,'pauseButton');
    pauseButton.anchor.x = 1;
    pauseButton.scale.setTo(0.3,0.3);
  
};

export {displayPauseButton}