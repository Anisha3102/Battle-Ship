const mainPage = document.querySelector(".page");
const dialogBox = document.querySelector(".dialog-box-loss");
const dialogBoxWin = document.querySelector(".dialog-box-win");
const dialogCloseButton = document.querySelector(".dialog-close-button-loss");
const dialogCloseButtonWin = document.querySelector(".dialog-close-button-win");
const resetButton = document.querySelector(".reset-button");
const dialogPara = document.querySelector(".dialog-para-loss");
const dialogParaWin = document.querySelector(".dialog-para-win");
const allGrids = document.querySelectorAll(".cell");
const mainGrid = document.querySelector(".main-grid");

let boatsFound = 0;
let totalClicks = 0;

// This random Array will decide which 5 positions will have image of boat
const generateRandomArray = () => {
  const length = 16;
  const array = Array(length).fill(0);

  let count = 0;
  while (count < 5) {
    const randomIndex = Math.floor(Math.random() * length);
    if (array[randomIndex] === 0) {
      array[randomIndex] = 1;
      count++;
    }
  }

  return array;
};

const assignImage = (allGrids) => {
  const arr = generateRandomArray();
  console.log(arr);
  allGrids.forEach((cell, ind) => {
    if (arr[ind] === 1) {
      const boatElement = document.createElement("img");
      boatElement.setAttribute(
        "src",
        "https://ik.imagekit.io/d9mvewbju/Course/BigbinaryAcademy/battleship-image_e6bWCZ1w4.png"
      );
      boatElement.setAttribute("data-type", "boat");
      boatElement.style.width = "60px";
      boatElement.style.height = "60px";
      boatElement.style.display = "none";
      cell.appendChild(boatElement);
    } else {
      const seaElement = document.createElement("img");
      seaElement.setAttribute(
        "src",
        "https://ik.imagekit.io/d9mvewbju/Course/BigbinaryAcademy/seamless-pattern-waves-various-shades-blue-vector-underwater-design-96891651_aSd5pmbaM.webp"
      );
      seaElement.setAttribute("data-type", "sea");
      seaElement.style.width = "60px";
      seaElement.style.height = "60px";
      seaElement.style.display = "none";
      cell.appendChild(seaElement);
    }
  });
};

assignImage(allGrids);

const handleClick = (e) => {
  if (e.target.classList.contains("cell")) {
    if (totalClicks < 8) {
      const image = e.target.firstChild;
      if (image && image.style.display === "none") {
        image.style.display = "block";
        totalClicks++;

        if (image.dataset.type === "boat") {
          boatsFound++;
          if (boatsFound === 5) {
            dialogBoxWin.showModal();
            mainGrid.removeEventListener("click", handleClick);
          }
        }
      }
      if (totalClicks === 8 && boatsFound < 5) {
        dialogBox.showModal();
        mainGrid.removeEventListener("click", handleClick);
      }
    }
  }
};

mainGrid.addEventListener("click", handleClick);

const handleClickOfButton = () => {
  allGrids.forEach((cell) => {
    if (cell.firstChild) cell.removeChild(cell.firstChild);
  });
  totalClicks = 0;
  boatsFound = 0;
  assignImage(allGrids);
  mainGrid.addEventListener("click", handleClick);
};

const handleClickOfDialogButton = () => {
  dialogBox.close();
  allGrids.forEach((cell) => {
    cell.firstChild.style.display = "block";
  });
};

const handleClickOfDialogButtonWin = () => {
  dialogBoxWin.close();
};

resetButton.addEventListener("click", handleClickOfButton);
dialogCloseButton.addEventListener("click", handleClickOfDialogButton);
dialogCloseButtonWin.addEventListener("click", handleClickOfDialogButtonWin);
