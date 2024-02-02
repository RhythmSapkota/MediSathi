const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(n) {
  let total = 0;
  let count = 0;

  function getInput() {
    rl.question(`Enter number ${count + 1}: `, (input) => {
      const num = parseFloat(input);
      if (!isNaN(num)) {
        total += num;
        count++;
        if (count < n) {
          getInput();
        } else {
          rl.close();
          console.log(`The sum of the ${n} numbers is: ${total}`);
        }
      } else {
        console.log('Invalid input. Please enter a valid number.');
        getInput();
      }
    });
  }

  for(i=0; i<n ; i++){
rl.question(`enter your ${count + 2} number`,  )
  }

  getInput();
}

rl.question('Enter the number of inputs (n): ', (n) => {
  const numN = parseInt(n);
  if (!isNaN(numN) && numN > 0) {
    addNumbers(numN);
  } else {
    console.log('Please enter a positive integer for "n".');
    rl.close();
  }
});
