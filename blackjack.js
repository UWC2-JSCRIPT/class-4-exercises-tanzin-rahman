/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */

const blackjackDeck = shuffle(getDeck());

/***
 * Shuffles the whole card deck 1000 times
 * makes it ready to be drawned from random card deck.
 */

 function shuffle(deck)
 {
     // for 100 turns
     // switch the values of two random cards
     for (let i = 0; i < 1000; i++)
     {
         let location1 = Math.floor((Math.random() * deck.length));
         let location2 = Math.floor((Math.random() * deck.length));
         let tmp = deck[location1];

         deck[location1] = deck[location2];
         deck[location2] = tmp;
     }
     return deck;
 }

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */

class CardPlayer {
  constructor(name){
    this.name = name;
    this.hand = [];
  }
  drawCard = () =>{
    const card = blackjackDeck.pop();
    this.hand.push(card)
   }
};

//CREATE TWO NEW CardPlayers

const dealer = new CardPlayer('Mamun');
const player = new CardPlayer('Lina');



  /**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */ 

   const isAce_inHand = (hand) => {
    let aceCheck = false; 
    aceCheck = hand.some((card) => card.displayVal == "Ace" && card.val === 11)  
    return aceCheck;
   }

   const calcPoints = (hand) => {
    // CREATE FUNCTION HERE
    let totalScore = 0;

    hand.forEach(element => {
      totalScore += element.val;
    });

    if(isAce_inHand(hand) !=false && totalScore > 21){
      totalScore = totalScore - 11;
      totalScore = totalScore+1;  
    }

    let blackJackScore = {
    // Define desired object
      total: totalScore,
      isSoft: isAce_inHand(hand)
    };
    // Return it
    return blackJackScore;
  }
  
/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => {
  // CREATE FUNCTION HERE
  let dealerScore = calcPoints(dealer.hand).total;
  
  let playAgain = false;
  if(dealerScore<=16){
     playAgain = true;
  }   
  else if(dealerScore===17 && isAce_inHand(dealerHand) != false){
     playAgain = true;
  }
  else if(dealerScore>21){
      return 'Dealer went over 21 - you win!';
  }

  else{
     playAgain = false; 
  }     
  return playAgain;
}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  // CREATE FUNCTION HERE
  let str = '';
  if(playerScore > dealerScore)
  {
    str = `Player wins! ${player.name}'s score is: ${playerScore} and ${dealer.name}'s score is: ${dealerScore}`; 
  }  
  else if(playerScore === dealerScore){
    str = `There was a TIE! ${player.name}'s score is: ${playerScore} and ${dealer.name}'s score is: ${dealerScore}`; 
  }

  else{
    str = `Dealer wins! ${player.name}'s score is: ${playerScore} and ${dealer.name}'s score is: ${dealerScore}`; 
  }
  return str;
}

/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count 
 * @param {string} dealerCard 
 */
const getMessage = (count, dealerCard) => {
  return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
}

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player 
 */
const showHand = (player) => {
  const displayHand = player.hand.map((card) => card.displayVal);
  console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
}

/**
 * Runs Blackjack Game
 */
const startGame = function() {
  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();


  let playerScore = calcPoints(player.hand).total;
  showHand(player);
  while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player);
  }
  if (playerScore > 21) {
    return 'You went over 21 - you lose!';
  }
  console.log(`Player stands at ${playerScore}`);

  let dealerScore = calcPoints(dealer.hand).total;
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }
  if (dealerScore > 21) {
    return 'Dealer went over 21 - you win!';
  }
  console.log(`Dealer stands at ${dealerScore}`);

  return determineWinner(playerScore, dealerScore);
}

console.log(startGame())