/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */


 const getDeck = () => {
  const deck = [];
  const suits = ["hearts", "spaders", "clubs", "diamonds"]; 
  const dvalue = [null, "2", "3", "4","5","6", "7", "8", "9", "10", "Ace", "Jack", "Queen", "King"];
  const value = [null, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 10, 10, 10];

  for (let index = 0; index < suits.length; index++ ){
    //create an array of 13 objects
    for (let j=1; j<=13; j++){
      //push a card object to the deck
        // special cases for when j > 10
      const displayVal = "";
      const card = {
        val : value[j],
        displayVal: dvalue[j],
        suits: suits[index],
        };
        deck.push(card); 
    }
  }
  return deck;
}


// CHECKS
const deck = getDeck();
console.log(deck);
console.log(`Deck length equals 52? ${deck.length === 52}`);

const randomCard = deck[Math.floor(Math.random() * 52)];

const cardHasVal = randomCard && randomCard.val && typeof randomCard.val === 'number';
console.log(`Random card has val? ${cardHasVal}`);

const cardHasSuit = randomCard && randomCard.suits && typeof randomCard.suits === 'string';
console.log(`Random card has suit? ${cardHasSuit}`);

const cardHasDisplayVal = randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string';
console.log(`Random card has display value? ${cardHasDisplayVal}`);