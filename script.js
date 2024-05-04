var enterButton = document.getElementById("enter");
var deleteButtons = document.getElementsByClassName("delete");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var li = document.querySelectorAll("li");

function inputLength() {
	return input.value.length;
}

function createButton() {
  var button = document.createElement("button");
  button.classList.add("delete");
  button.appendChild(document.createTextNode("Delete item"));
  return button;
}

function createListElement() {
	var li = document.createElement("li");
  var newButton = createButton();
  li.addEventListener("click", toggleClick(li));
	li.appendChild(document.createTextNode(input.value));
  li.appendChild(newButton);
	ul.appendChild(li);
	input.value = "";
}

function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
    addDeleteListener();
	}
}

function deleteListAfterClick(button) {
  return function () {
    button.parentElement.style.display = 'none';
  }
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
    addDeleteListener();
	}
}

function addDeleteListener() {
  var li = document.querySelectorAll("li");
    for (let i=0; i<li.length; i++) {
      deleteButtons[i].addEventListener("click", deleteListAfterClick(deleteButtons[i]));
    };
}

function toggleClick(item) {
  return function () {
    item.classList.toggle("done");
  }
}

enterButton.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

for (let i=0; i<li.length; i++) {
  li[i].addEventListener("click", toggleClick(li[i]));
  var newButton = createButton();
  li[i].appendChild(newButton);
}

addDeleteListener();
