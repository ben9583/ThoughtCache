function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchHover() {
	var dropElem = document.getElementsByClassName("drop")[0]
	var fetchElem = document.getElementsByClassName("fetch")[0]

	dropElem.style.width = "92%"
	fetchElem.style.width = "8%"
}

function fetchHoverOut() {
	var dropElem = document.getElementsByClassName("drop")[0]
	var fetchElem = document.getElementsByClassName("fetch")[0]

	dropElem.style.width = "94%"
	fetchElem.style.width = "6%"
}

function dropHover() {
	var dropElem = document.getElementsByClassName("drop")[0]
	var fetchElem = document.getElementsByClassName("fetch")[0]

	fetchElem.style.width = "92%"
	dropElem.style.width = "8%"
}

function dropHoverOut() {
	var dropElem = document.getElementsByClassName("drop")[0]
	var fetchElem = document.getElementsByClassName("fetch")[0]

	fetchElem.style.width = "94%"
	dropElem.style.width = "6%"
}

function dropClick() {
	var dropElem = document.getElementsByClassName("drop")[0]
	var fetchElem = document.getElementsByClassName("fetch")[0]

	dropElem.style["background-color"] = "#24272e";
	fetchElem.style["background-color"] = "#c4c4c4";
	dropElem.style.color = "#ffffff";

	document.getElementById("title").style.color = "#ffffff"
	document.getElementById("title").style.float = "left"
	document.getElementById("title").style.right = "82%"
	document.getElementsByClassName("fetch-text")[0].style.visibility = "hidden"
	document.getElementsByClassName("drop-text")[0].style.visibility = "visible"

	this.style.width = "94%"
	fetchElem.style.width = "6%"
	dropElem.classList.remove("drop-before")
	dropElem.classList.add("drop-after")
	fetchElem.classList.remove("fetch-before")
	fetchElem.classList.add("fetch-after")

	fetchElem.addEventListener("mouseenter", fetchHover)
	fetchElem.addEventListener("mouseout", fetchHoverOut)
	dropElem.removeEventListener("mouseenter", dropHover)
	dropElem.removeEventListener("mouseout", dropHoverOut)
}

function fetchClick() {
	var dropElem = document.getElementsByClassName("drop")[0]
	var fetchElem = document.getElementsByClassName("fetch")[0]

	fetchElem.style["background-color"] = "#24272e";
	dropElem.style["background-color"] = "#c4c4c4";

	document.getElementById("title").style.transition += ", color 0.5s";
	document.getElementById("title").style.right = "1%"
	document.getElementsByClassName("drop-text")[0].style.visibility = "hidden"
	document.getElementsByClassName("fetch-text")[0].style.visibility = "visible"

	this.style.width = "94%"
	dropElem.style.width = "6%"
	document.getElementById("title").style.color = "#ffffff"
	dropElem.classList.remove("drop-before")
	dropElem.classList.add("drop-after")
	fetchElem.classList.remove("fetch-before")
	fetchElem.classList.add("fetch-after")

	dropElem.addEventListener("mouseenter", dropHover)
	dropElem.addEventListener("mouseout", dropHoverOut)
	fetchElem.removeEventListener("mouseenter", fetchHover)
	fetchElem.removeEventListener("mouseout", fetchHoverOut)
}

function toggleDrop() {
	var dropElem = document.getElementsByClassName("drop")[0]
	var fetchElem = document.getElementsByClassName("fetch")[0]

	document.getElementById("title").style.color = "#000000"
	document.getElementById("title").style.float = "left"
	document.getElementById("title").style.right = "82%"
}

function toggleFetch() {
	var dropElem = document.getElementsByClassName("drop")[0]
	var fetchElem = document.getElementsByClassName("fetch")[0]

	document.getElementById("title").style.transition += ", color 0.5s";

	document.getElementById("title").style.color = "#ffffff"
	document.getElementById("title").style.float = "right"
	document.getElementById("title").style.right = "1%"
}

async function main() {
	document.getElementsByClassName("drop")[0].addEventListener("click", dropClick);
	document.getElementsByClassName("fetch")[0].addEventListener("click", fetchClick);
}

main()