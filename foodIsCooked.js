/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function(kind, internalTemp, doneness) {
  let flag = false;
  switch (kind) {
    case 'chicken':
        flag = (internalTemp >= 165)? true: false;
      break;
    case 'beef':
      switch (doneness) {
        case 'rare':
          flag = (internalTemp >= 125)? true: false;
          break;
        case 'medium':
          flag = (internalTemp >= 138)? true: false;
          break;
        case 'well':
          flag = (internalTemp >= 155)? true: false;
          break;
        default:
          break;  
      }  
      default:
        break;
    }
    return flag;
 }




// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be true
