const hexInput = document.getElementById("hex-input");
const rgbInputOne = document.getElementById("rgb-input-1");
const rgbInputTwo = document.getElementById("rgb-input-2");
const rgbInputThree = document.getElementById("rgb-input-3");
const hexOutput = document.getElementById("hex-output");
const rgbOutput = document.getElementById("rgb-output");

hexInput.addEventListener("focus", () => {
  hexInput.value = "#";
});

hexInput.addEventListener("input", () => {
  const input = hexInput.value;
  hexOutput.style.backgroundColor = input;
  if (input === "") {
    input.value = "#";
    document.getElementById("hex-error").innerText = "";
  }
  if (input.split("").length == 7) {
    //Calculate our colour
    //Check if we have any invalid characters
    const regex = /^#(?:(?:[\da-f]{3}){1,2}|(?:[\da-f]{4}){1,2})$/i;
    if (regex.test(input)) {
      document.getElementById("hex-error").innerText = "";
      calculateRGB(input);
    } else {
      document.getElementById("hex-error").innerText =
        "Your color contains incorrect characters";
    }
  }
});

rgbInputOne.addEventListener("focus", () => {
  rgbInputOne.value = "";
});

rgbInputTwo.addEventListener("focus", () => {
  rgbInputTwo.value = "";
});

rgbInputThree.addEventListener("focus", () => {
  rgbInputThree.value = "";
});

rgbInputOne.addEventListener("input", () => {
  const input = rgbInputOne.value;
  if (input.length >= 2 || input === 0) {
    //This means we can try and work out the value
    validateRgb(input);
  }
});

rgbInputTwo.addEventListener("input", () => {
  const input = rgbInputTwo.value;
  if (input.length >= 2 || input === "0") {
    //This means we can try and work out the value
    validateRgb(input);
  }
});

rgbInputThree.addEventListener("input", () => {
  const input = rgbInputThree.value;
  if (input.length >= 2 || input == 0) {
    validateRgb(input);
  }
});

//Need to think about value of 0

const calculateRGB = (input) => {
  const splitInput = input.split("");
  let newArr = [];
  let rgb;

  //Convert hex to numbers
  for (var i = 1; i < splitInput.length; i++) {
    switch (splitInput[i]) {
      case "A":
      case "a":
        newArr.push(10);
        break;
      case "B":
      case "b":
        newArr.push(11);
        break;
      case "C":
      case "c":
        newArr.push(12);
        break;
      case "D":
      case "d":
        newArr.push(13);
        break;
      case "E":
      case "e":
        newArr.push(14);
        break;
      case "F":
      case "f":
        newArr.push(15);
        break;
      default:
        newArr.push(splitInput[i]);
        break;
    }
  }

  const rgb1 = parseInt(newArr[0]) * 16 + parseInt(newArr[1]);
  const rgb2 = parseInt(newArr[2]) * 16 + parseInt(newArr[3]);
  const rgb3 = parseInt(newArr[4]) * 16 + parseInt(newArr[5]);

  rgbInputOne.value = rgb1;
  rgbInputTwo.value = rgb2;
  rgbInputThree.value = rgb3;
  hexOutput.style.backgroundColor = input;
  rgbOutput.style.backgroundColor = input;
};

const calculateHex = (a, b, c) => {
  let numCalcA, numCalcB, numCalcC;

  if (parseInt(a)) {
    numCalcA = (parseInt(a) / 16).toFixed(2).split(".");
  } else {
    numCalcA = (parseInt(0) / 16).toFixed(2).split(".");
  }

  if (parseInt(b)) {
    numCalcB = (parseInt(b) / 16).toFixed(2).split(".");
  } else {
    numCalcB = (parseInt(0) / 16).toFixed(2).split(".");
  }

  if (parseInt(c)) {
    numCalcC = (parseInt(c) / 16).toFixed(2).split(".");
  } else {
    numCalcC = (parseInt(0) / 16).toFixed(2).split(".");
  }

  numCalcA[1] = (parseFloat(`0.${numCalcA[1]}`) * 16).toFixed(0);
  numCalcB[1] = (parseFloat(`0.${numCalcB[1]}`) * 16).toFixed(0);
  numCalcC[1] = (parseFloat(`0.${numCalcC[1]}`) * 16).toFixed(0);
  const array = numCalcA.concat(numCalcB).concat(numCalcC);
  let hex = [];
  //Now convert them to hex
  for (var i = 0; i < array.length; i++) {
    switch (array[i]) {
      case "10":
        hex.push("A");
        break;
      case "11":
        hex.push("B");
        break;
      case "12":
        hex.push("C");
        break;
      case "13":
        hex.push("D");
        break;
      case "14":
        hex.push("E");
        break;
      case "15":
        hex.push("F");
        break;
      default:
        hex.push(array[i]);
    }
  }
  hexInput.value = "#" + hex.join("");
  hexOutput.style.backgroundColor = "#" + hex.join("");
  rgbOutput.style.backgroundColor = "#" + hex.join("");
};

const validateRgb = (input) => {
  if (parseInt(input) > 255) {
    document.getElementById("rgb-error").innerText =
      "Values cannot be higher than 255";
  } else if (parseInt(input) < 0) {
    document.getElementById("rgb-error").innerText =
      "Values cannot be lower than 0";
  } else {
    document.getElementById("rgb-error").innerText = "";
    rgbOutput.style.backgroundColor = `rgb(${rgbInputOne.value},${rgbInputTwo.value},${rgbInputThree.value})`;
    calculateHex(rgbInputOne.value, input, rgbInputThree.value);
  }
};

//Code for copy buttons
const rgbButton = document.getElementById("rgb-button");
const hexButton = document.getElementById("hex-button");
//rgb-notification

rgbButton.addEventListener("click", () => {
  var itemToCopy = document.createElement("textarea");
  document.body.appendChild(itemToCopy);
  itemToCopy.value = `${rgbInputOne.value}, ${rgbInputTwo.value}, ${rgbInputThree.value}`;
  itemToCopy.select();
  itemToCopy.setSelectionRange(0, 999999);
  document.execCommand("copy");
  document.body.removeChild(itemToCopy);
  document.getElementById("rgb-notification").innerText =
    "RGB value copied to your clipboard";
  setTimeout(() => {
    document.getElementById("rgb-notification").innerText = "";
  }, 2000);
});

hexButton.addEventListener("click", () => {
  var itemToCopy = document.createElement("textarea");
  document.body.appendChild(itemToCopy);
  itemToCopy.value = hexInput.value;
  itemToCopy.select();
  itemToCopy.setSelectionRange(0, 999999);
  document.execCommand("copy");
  document.body.removeChild(itemToCopy);
  document.getElementById("hex-notification").innerText =
    "Hex value copied to your clipboard";
  setTimeout(() => {
    document.getElementById("hex-notification").innerText = "";
  }, 2000);
});
