const output = document.getElementById("output-text");
const encodeInput = document.getElementById("encode-input");
const decodeInput = document.getElementById("decode-input");
const shiftElement = document.getElementById("shift");
shiftElement.value = 3;

let shiftValue = shiftElement.value;

const bigLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ";
let bigLettersCiphered = "";
let cipherText = "";
let decodedText = "";
let charIndex = 0;

decodeInput.addEventListener("input", (e) => {
	decodeInputDetected(e.target.value);
});

encodeInput.addEventListener("input", (e) => {
	encodeInputDetected(e.target.value);
});

let ctrlKeyHeldDown = false;
encodeInput.addEventListener("keypress", (event) => {
	ctrlKeyHeldDown = event.key === "Control";
	if (ctrlKeyHeldDown) console.log("Control key");
});

encodeInput.addEventListener("keyup", (event) => {
	event.key === "Control";
});

// TODO: FIKS DETTE OGSÅ
encodeInput.addEventListener("keydown", (event) => {
	if (ctrlKeyHeldDown && event.key === "Backspace") {
		console.log("Control and backspace");
	} else if (event.key === "Backspace") {
		let a = cipherText;
		let b = a.length > 0 ? a.slice(0, a.length - 2) : a.slice(0, a.length);
		cipherText = b;

		if (cipherText.length < 1) {
			cipherText = "";
			output.innerText = cipherText;
		}
		console.log("Backspace");
	}
});

decodeInput.addEventListener("keydown", (event) => {
	if (ctrlKeyHeldDown && event.key === "Backspace") {
		console.log("Control and backspace");
	} else if (event.key === "Backspace") {
		let a = decodedText;
		let b = a.length > 0 ? a.slice(0, a.length - 2) : a.slice(0, a.length);
		decodedText = b;
		if (decodedText.length < 1) {
			decodedText = "";
			output.innerText = decodedText;
		}
		console.log("Backspace");
	}
});

shiftElement.addEventListener("change", (e) => {
	let val = e.target.value;
	val = parseInt(val);
	shiftLetters(val);

	resetHtmlFields();
});


function shiftLetters(shift) {
	bigLettersCiphered = "";
	[...bigLetters].forEach((element, index) => {
		let i = (index + shift) % bigLetters.length;
		bigLettersCiphered += bigLetters[i];
	});

	console.log("Shifted alphabet: ", bigLettersCiphered);
}
shiftLetters(3);

function getNewLetterIndex(letter, option) {
	if (option === "decode") {
		return bigLettersCiphered.indexOf(letter);
	} else if (option === "encode") {
		return bigLetters.indexOf(letter);
	}
}

function copyToClipboard() {
	navigator.clipboard
		.writeText(cipherText.trimStart())
		.catch((err) => console.log(err));
}

function clearOtherTextarea(encode) {
	if (encode) {
		decodeInput.innerText = "";
	} else {
		encodeInput.innerText = "";
	}
}

function encodeInputDetected(input) {
	clearOtherTextarea(true);
	if (input) {
		input = input.toUpperCase();
	} else return;

	// Only change the last char
	let inputChar = input[input.length - 1];
	if (inputChar === " ") {
		cipherText += " ";
		return;
	} else if (!inputChar.match(/^[A-ZÆØÅ]/)) {
		console.log("YAY");
		return;
	}

	let newChar = bigLetters[getNewLetterIndex(inputChar, "decode")];
	inputChar = newChar;
	cipherText += inputChar;
	output.innerText = cipherText;
}

function decodeInputDetected(input) {
    const decode = input.toUpperCase();
    let decoded = "";
    [...decode].forEach((element, index) => {
        if (element === " ") {
			decoded += " ";
			return;
		} else if (!element.match(/^[A-ZÆØÅ]/)) {
			return;
        }
        decoded += bigLettersCiphered[getNewLetterIndex(element, "encode")];
    });
	output.innerText = decoded;
}

function getShiftValue() {
	return shiftElement.value;
}

function resetHtmlFields() {
	output.innerText = "";
	encodeInput.value = "";
	decodeInput.value = "";
	cipherText = "";
}
