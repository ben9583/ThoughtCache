function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function dropClick() {
	document.getElementsByClassName("drop")[0].removeEventListener("click", dropClick);
	document.getElementsByClassName("fetch")[0].style.display = "none";
	document.getElementsByClassName("drop")[0].style["background-color"] = "#24272e";
	document.getElementsByClassName("drop")[0].style.color = "#ffffff";
	document.getElementById("title").style.color = "#ffffff"
	console.log("bruh2")
	this.style.width = "100%"
}

function fetchClick() {
	document.getElementById("title").style.transition = "color 0.5s";
	document.getElementsByClassName("fetch")[0].removeEventListener("click", fetchClick);
	document.getElementsByClassName("fetch")[0].removeEventListener("click", dropClick);
	document.getElementsByClassName("drop")[0].style.display = "none"
	console.log("bruh2")
	this.style.width = "100%"
	document.getElementById("title").style.color = "#ffffff"
}

async function main() {
	document.getElementsByClassName("drop")[0].addEventListener("click", dropClick);
	document.getElementsByClassName("fetch")[0].addEventListener("click", fetchClick);
}

main()