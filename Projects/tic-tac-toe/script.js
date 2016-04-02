// Helpers
(function (global) {
    
    // Game constructor, contains players and state
    function Game() {
        
        // AI player
        this.AI;
        
        // human player: the user
        this.human;
        
        // current state of the game
        this.currState;
        
        // gets score of a end state for minimax algo
        // sets score depending on the number of moves made by AI
        this.getScore = function () {
            
            // score when AI wins
            if ( this.currState.status === 'AI wins!' ) {
                return 10 - this.currState.AIMovesCount;
            }
            
            // score when user wins
            if ( this.currState.status === 'You win!' ) {
                return this.currState.AIMovesCount - 10;
            }
            
            // score when status is draw or in process
            return 0;
        }
    }
    
    // Player constructor to create a human player and an AI player
    function Player(kind, sign) {
        
        // human or AI
        this.kind = kind;
        
        // X or O
        this.sign = sign;
        
        // number of games won
        this.score = 0;
        
        // next move Player will make
        this.nextMove;
    }
    
    Player.prototype = {
        
        // updates the nextMove property of Plyaer
        updateNextMove: function (game, boxIndex) {
            
            var self = this;
            
            // if Player is the user then nextMove is the index of the box he clicked on
            if ( self.kind === 'human' ) {
                self.nextMove = boxIndex;
            }
            
            // if Player is AI then randomly pick the next move
            if ( self.kind === 'AI' ) {
                
//                minimax(game, game.currState);
                
                var emptyBoxesArr = game.currState.getEmptyBoxes(),
                    nextBoxIndex;

                nextBoxIndex = Math.floor( Math.random() * emptyBoxesArr.length )
                self.nextMove = emptyBoxesArr[nextBoxIndex];
            }
        },
        
        // Player plays, current game's state grid/status/turn get updated
        play: function (state, AISign) {
            
            var self = this;
                
            state.updateGrid(self.nextMove, self.sign);

            if ( self.kind === 'AI' ) {
                state.AIMovesCount++;
            }

            state.updateStatus(AISign);
            state.updateTurn();
        }
    }
    
    // fills the box in the DOM passed as parameter with content
    function fillBox (box, content) {
            
        box.html(content);
    }
    
    // State constructor: constructs a new state or a state based on an oldState
    function State(oldState) {
        
        // if oldState is specified, the new state gets its properties from oldState
        if ( oldState ) {
            
            this.grid = oldState.grid;
            this.turn = oldState.turn;
            this.AIMovesCount = oldState.AIMovesCount;
            this.status = oldState.status;
            this.isEnd = oldState.isEnd;
        }
        else {
            
            // array representing the tic-tac-toe grid in the DOM
            this.grid = new Array(9);
            // which signs will play next
            this.turn = '';
            // count of moves made by AI
            this.AIMovesCount = 0;
            // status of game based in grid
            this.status = '';
            // state is an end state, game is over
            this.isEnd = false;
        }
        
        // messages when game is a draw/ a win/running
        this.drawMessage = 'It\' a draw!';
        this.AIWinnerMessage = 'AI wins...';
        this.humanWinnerMessage = 'You win!';
        this.runningMessage = 'In process';
    }
    
    State.prototype = {
        
        // updates the array representing the grid
        updateGrid: function (boxIndex, sign) {
            
            var self = this;
            
            // update grid array with sign
            self.grid[boxIndex] = sign;
        },
        
        // update which sign's turn it is
        updateTurn: function () {
            
            var self = this;
            
            self.turn = self.turn === 'X' ? 'O' : 'X';
        },
        
        // get status of the game: states the winner / it's a draw / it's still running
        getStatus: function (AISign) {
            
            // only gets game's end state if game is over
            var winningCombinationsArr = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],
                self = this,
                message;
            
            // for each winning combination, check if the grid contains one 
            // return the winner if it does
            for (var i = 0; i < winningCombinationsArr.length; i++) {

                var combination = winningCombinationsArr[i];

                if (self.grid[combination[0]] === self.grid[combination[1]] &&
                    self.grid[combination[1]] === self.grid[combination[2]] &&
                    self.grid[combination[0]] !== undefined) {
                    
                    message = self.grid[combination[0]] === AISign ? self.AIWinnerMessage : self.humanWinnerMessage;
                    return message;
                }
            }
            
            // for each box in grid check if one is empty 
            // if one is, game is still in process
            for (var j = 0; j < self.grid.length; j++) {
                
                if (self.grid[j] === undefined) {
                    
                    return self.runningMessage;
                }
            }
            
            return self.drawMessage;
        },
        
        // update game state's status by using @getStatus
        // updates isEnd property depending on status
        updateStatus: function (AISign) {
            
            var self = this;
            
            self.status = self.getStatus(AISign);
            
            if ( self.status !== self.runningMessage ) {
                self.isEnd = true;
            }
        },
        
        // returns empty boxes indexes
        getEmptyBoxes: function () {
            
            var emptyBoxesArr = [],
                self = this;
            
            // for each box in grid, included it in emptyBoxesArr if it's empty
            for (var i = 0; i < self.grid.length; i++) {
                
                if ( self.grid[i] === undefined ) {
                    emptyBoxesArr.push(i);
                }
            }
            
            return emptyBoxesArr;
        }
    };
    
    // minimax, not working yet
    function minimax (game, state) {

        if ( state.isEnd ) {
            return game.getScore(state);
        }
        
        var availableMoves = state.getEmptyBoxes(),
            bestScore,
            currentScore;
        
        if ( state.turn === game.AI.sign ) {
            
            bestScore = -Infinity;
            
            availableMoves.forEach(function (move) {
                
                var possibleState = new State(state);
                
                game.AI.nextMove = move;
                game.AI.play(possibleState, game.AI.sign);
                
                currentScore = minimax(game, possibleState);
                console.log(move);
                if ( currentScore > bestScore ) {
                    
                    bestScore = currentScore;
                    game.AI.nextMove = move;
//                    console.log(bestScore);
                }
            });
            
            return bestScore;
        }
        else {
            
            bestScore = +Infinity;
            
            availableMoves.forEach(function (move) {
                
                var possibleState = new State(state);
                
                game.human.nextMove = move;
                game.human.play(possibleState, game.human.sign);
                
                currentScore = minimax(game, possibleState);
                
                if ( currentScore < bestScore ) {
                    
                    bestScore = currentScore;
                    game.human.nextMove = move;
                }
            });
            
            return bestScore;
        }
    }
    
    // have the methods available on the global object
    global.State = State;
    global.Player = Player;
    global.minimax = minimax;
    global.Game = Game;
    global.fillBox = fillBox;
    
}(window));

$(document).ready(function() {
    
    var game = new Game(),
        drawsCount = 0,
        overlayModalContent = $('div.modal').html();
    
    // when overlay sign clicked, create human player and AI
    // hide overlay and remove background transparency
    $('div.overlay').on('click', 'a.sign', function () {
        
        var humanSign = $(this).text().trim(),
            AISign = humanSign === 'X' ? 'O' : 'X';
        
        // if game already started, just update players's sign
        if ( game.currState ) {
            
            game.human.sign = humanSign;
            game.AI.sign = AISign;
        } 
        else {
            
            game.human = new Player('human', humanSign);
            game.AI = new Player('AI', AISign);
        }
        
        // create new state and X starts to play
        game.currState = new State();
        game.currState.turn = 'X';
        
        // remove background transparency and hide overlay
        $('div.container').css('opacity', '1');
        $('div.overlay').hide();
        
        // if user chose O then AI starts playing
        if ( game.currState.turn === game.AI.sign ) {
            
            var boxId; 
            
            // update AI's next move and play it
            game.AI.updateNextMove(game);
            game.AI.play(game.currState, game.AI.sign);
            
            boxId = '#box-' + game.AI.nextMove;
            
            // fill box in DOM with AI's sign
            fillBox($(boxId), game.AI.sign);
        }
    });
    
    // when user clicks on a box, let him and AI play
    $('div.box').click(function () {
        
        var boxId = '#' + $(this).attr('id'),
            boxIndex = boxId[boxId.length - 1];
        
        // let user play only if game is in process and it's user's turn
        if ( !game.currState.isEnd && $(boxId).text().trim() === '' && game.currState.turn === game.human.sign ) {
            
            game.human.updateNextMove(game, boxIndex);
            game.human.play(game.currState, game.AI.sign);
            
            fillBox($(boxId), game.human.sign);
        }
        
        // let AI play only if game is in process and it's AI's turn
        if ( !game.currState.isEnd && game.currState.turn === game.AI.sign ) {
            
            game.AI.updateNextMove(game);
            game.AI.play(game.currState, game.AI.sign);
            
            boxId = '#box-' + game.AI.nextMove;
            
            fillBox($(boxId), game.AI.sign);
        }
        
        // if game is over display winner and suggest to start a new game
        // update score
        if ( game.currState.isEnd ) {
            
            if ( game.currState.status === game.currState.humanWinnerMessage ) {
                
                game.human.score++;
                $("span#score-human").html(game.human.score);
            }
            else if ( game.currState.status === game.currState.AIWinnerMessage ) {
                
                game.AI.score++;
                $("span#score-AI").html(game.AI.score);
            } 
            else if ( game.currState.status === game.currState.drawMessage ) {
                
                drawsCount++;
                $("span#draws").html(drawsCount);
            }
            
            // suggest to start a new game
            $('div.modal').html('<section>' + game.currState.status + '</section><section><a href="#" class="btn" id="new-game">Start New Game</a></section>');
            
            // show overlay and dim background
            $('div.container').css('opacity', '0.3');
            $('div.overlay').show();
        }
    });
    
    // if user chooses to start a new game
    // display overlay for user to pick with which sign to start
    $('div.overlay').on('click', 'a#new-game', function () {
       
        $('div.modal').html(overlayModalContent);
        $('div.box').html('');
    });
});