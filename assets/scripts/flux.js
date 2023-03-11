document.querySelector(".text-modifier._b").addEventListener("click", () => {
	textDo("bold");
});
document.querySelector(".text-modifier._i").addEventListener("click", () => {
	textDo("italic");
});
document.querySelector(".text-modifier._u").addEventListener("click", () => {
	textDo("underline");
});
document.querySelector(".text-modifier._s").addEventListener("click", () => {
	textDo("scratch");
});

const textarea = document.querySelector(".flux-text");
const content = document.querySelector("#flux-text");

function textDo(modifier) {
	let options = {
		bold: "strong",
		italic: "em",
		underline: "u",
		scratch: "s",
	};
	let range = window.getSelection().getRangeAt(0);
	let newNode = document.createElement(options[modifier]);
	newNode.appendChild(range.extractContents());
	range.insertNode(newNode);
}

textarea.addEventListener('focus', cleanPlaceholder)
textarea.addEventListener('blur', restartPlaceholder)
restartPlaceholder()

function cleanPlaceholder() {
	if (textarea.innerHTML === "Escreva aqui...") {
		textarea.innerHTML = "";
		textarea.style.color = "#000";
	}
}

function restartPlaceholder() {
	if (textarea.innerHTML === "") {
		textarea.innerHTML = "Escreva aqui...";
		textarea.style.color = "#999";
	}
}

function updateContent() {
	content.value = textarea.innerHTML;
}

textarea.addEventListener("input", updateContent);


// Delay
const delayRange = document.querySelector('#delay-range')
const delayCount = document.querySelector('.delay-count')

function delay() {
  delayCount.textContent = delayRange.value + ' seg'
}
delayRange.addEventListener('input', delay)
delay()