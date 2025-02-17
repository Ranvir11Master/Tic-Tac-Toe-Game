let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;//playerX, playrtO
let count = 0; //To track the Draw

const winPatterns = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8],
];


//Reset Game Button function
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  msg.innerText = "";
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("Button was click")
      if(turnO) {
        box.innerText = "O";
        box.style.color = "#F26419";
        turnO = false
      } else {
        box.innerText = "X";
        box.style.color = "#2F4858";
        turnO = true;
      }
      box.disabled = true;
      count++;

      let isWinner = checkWinner();

      if(count === 9 && !isWinner) {
        drawGame();
      }


  });
});

//When the Game is Draw
const drawGame = () => {
  msg.innerText = `Game was a Draw.`;
  msg.style.color = "#2F4858";
  msgContainer.classList.remove("hide");
  disableBoxes();
}


//After winning game Enable the Button for click
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
}

const showWinner = (Winner) => {
  msg.innerText = `Congratulations, winner is ${Winner}`;
  msg.style.color = "#33658A";
  msgContainer.classList.remove("hide");
  disableBoxes();
}

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "")  {
      if (pos1 === pos2 && pos2 === pos3) {
        console.log(`Winner is ${pos1}`);
        showWinner(pos1);
        return true;
      }
    }

  }
  return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
