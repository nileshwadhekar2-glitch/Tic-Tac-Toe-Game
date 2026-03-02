let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // true = O turn, false = X turn
let count = 0; // moves count

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Reset Game
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Box Click
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        count++;

        checkWinner();
    });
});

// Disable All Boxes
const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// Enable All Boxes
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Show Winner
const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Show Draw
const showDraw = () => {
    msg.innerText = `😎 Game was a Draw!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Check Winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }

    if (count === 9) {
        showDraw();
    }
};

// Buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);