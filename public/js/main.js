var windowToggle = 0
var infoToggle = false

function setStyle(objId, propertyObject) {
	var elem = document.getElementById(objId);
	for (var property in propertyObject)
    	elem.style[property] = propertyObject[property];
}

function cacheHover() {
	setStyle("cache-pane", {"background-color":"#1e3466", "color":"#ffffff"});
	setStyle("fetch-pane", {"background-color":"#ffffff", "color":"#1e3466"});
	setStyle("title", {"color":"#ffffff"});
	setStyle("info", {"color":"#1e3466", "background-color": "#ffffff", "border":"4px solid #1e3466"});
}

function fetchHover() {
	setStyle("fetch-pane", {"background-color":"#1e3466", "color":"#ffffff"});
	setStyle("cache-pane", {"background-color":"#ffffff", "color":"#1e3466"});
	setStyle("title", {"color":"#1e3466"});
	setStyle("info", {"color":"#ffffff", "background-color": "#1e3466", "border":"4px solid #ffffff"});
}

function infoHover() {
	if (infoToggle) {
		setStyle("info", {"background-color":"#1e3466", "color":"#ffffff", "border":"4px solid #1e3466"})
	} else {
		setStyle("info", {"background-color":"#ffffff", "color":"#1e3466", "border":"4px solid #ffffff"});
	}
}

function infoHoverOut() {
	// if(windowToggle == 1) {
	// 	setStyle("info", {"background-color":"#1e3466", "color":"#ffffff"});
	// } else {
	if (infoToggle) {
		setStyle("info", {"background-color":"#ffffff", "color":"#1e3466", "border":"4px solid #1e3466"});
	}
}

function infoPeekIn() {
	setStyle("cache-pane", {"width":"7%"});
	setStyle("fetch-pane", {"width":"93%"});
}

function cachePeekIn() {
	setStyle("cache-pane", {"width":"8%"});
	setStyle("fetch-pane", {"width":"92%"});
}

function cachePeekOut() {
	setStyle("cache-pane", {"width":"7%"});
	setStyle("fetch-pane", {"width":"93%"});
}

function fetchPeekIn() {
	setStyle("fetch-pane", {"width":"8%"});
	setStyle("cache-pane", {"width":"92%"});
}

function fetchPeekOut() {
	setStyle("fetch-pane", {"width":"7%"});
	setStyle("cache-pane", {"width":"93%"});
}

function upvoteHoverIn() {
	setStyle("upvote-button", {"background-color":"#00cc00"})
}

function upvoteHoverOut() {
	setStyle("upvote-button", {"background-color":"#009900"})
}

function downvoteHoverIn() {
	setStyle("downvote-button", {"background-color":"#cc0000"})
}

function downvoteHoverOut() {
	setStyle("downvote-button", {"background-color":"#990000"})
}

function newThought() {
	setTimeout(function() {
		setStyle("thought-pane", {"-webkit-transition":"top 0.5s ease 0s", "transition":"top 0.5s ease 0s", "top":"-40%"})

		setTimeout(function() {
			setStyle("thought-pane", {"-webkit-transition":"top 0s ease 0s", "transition":"top 0s ease 0s", "top":"100%"})

			setTimeout(function() {
				setStyle("thought-pane", {"-webkit-transition":"top 0.5s ease 0.5s", "transition":"top 0.5s ease 0.5s", "top":"40%"})
			}, 1000)
		}, 1000)
		console.log(2)
	}, 0) // I have no god damn reason why given 2 hours of focusing on this one thing but it does not work without setTimeout. To those who want to fix this, I wish you luck.
}

function cacheClick() {
	windowToggle = 1
	var cacheElem = document.getElementById("cache-pane");
	var fetchElem = document.getElementById("fetch-pane");
	cacheElem.removeEventListener("mouseover", cacheHover);
	fetchElem.removeEventListener("mouseover", fetchHover);
	cacheElem.removeEventListener("mouseenter", cachePeekIn);
	cacheElem.removeEventListener("mouseleave", cachePeekOut);
	setStyle("cache-pane", {"background-color":"#1e3466", "color":"#ffffff", "width":"93%"});
	setStyle("fetch-pane", {"background-color":"#ffffff", "color":"#1e3466", "width":"7%"});
	setStyle("title", {"color":"#ffffff", "left":"1.5%"});
	setStyle("info", {"visibility":"hidden", "opacity":"0"});
	setStyle("cache-heading", {"opacity":"0", "visibility":"hidden"});
	setStyle("fetch-heading", {"opacity":"0", "visibility":"hidden"});
	setStyle("cache-text", {"opacity":"1"});
	setStyle("cache-form", {"display":"block"});
	setStyle("thought-pane", {"visibility":"hidden"})
	fetchElem.addEventListener("mouseenter", fetchPeekIn);
	fetchElem.addEventListener("mouseleave", fetchPeekOut);
}

function fetchClick() {
	windowToggle = 2
	var fetchElem = document.getElementById("fetch-pane");
	var cacheElem = document.getElementById("cache-pane");
	fetchElem.removeEventListener("mouseover", fetchHover);
	cacheElem.removeEventListener("mouseover", cacheHover);
	fetchElem.removeEventListener("mouseenter", fetchPeekIn);
	fetchElem.removeEventListener("mouseleave", fetchPeekOut);
	setStyle("fetch-pane", {"color":"#ffffff", "background-color":"#1e3466", "width":"93%"});
	setStyle("cache-pane", {"background-color":"#ffffff", "color":"#1e3466", "width":"7%"});
	setStyle("title", {"color":"#ffffff", "left":"calc(100% - 44vh)"});
	setStyle("info", {"visibility":"hidden", "opacity":"0"});
	setStyle("fetch-heading", {"opacity":"0", "visibility":"hidden"});
	setStyle("cache-heading", {"opacity":"0", "visibility":"hidden"});
	setStyle("cache-text", {"opacity":"0"});
	setStyle("cache-form", {"display":"none"});
	setStyle("thought-pane", {"visibility":"visible", "top":"40%"})
	cacheElem.addEventListener("mouseenter", cachePeekIn);
	cacheElem.addEventListener("mouseleave", cachePeekOut);
}

function infoClick() {
	var infoElem = document.getElementById("info");
	if(!infoToggle) {
		infoToggle = true
		document.getElementById("cache-pane").removeEventListener("click", cacheClick);
		document.getElementById("fetch-pane").removeEventListener("click", fetchClick);
		setStyle("info-pane", {"top":"0"})
		setStyle("info", {"color":"#1e3466", "background-color":"#ffffff", "border":"4px solid #1e3466"});
		setStyle("info-text", {"visibility":"visible"})
	} else {
		infoToggle = false
		document.getElementById("cache-pane").addEventListener("click", cacheClick);
		document.getElementById("fetch-pane").addEventListener("click", fetchClick);
		setStyle("cache-pane", {"visibility":"visible"});
		setStyle("fetch-pane", {"visibility":"visible"});
		setStyle("title", {"visibility":"visible"});
		setStyle("info-pane", {"top":"-51em"})
		setStyle("info", {"color":"#ffffff", "background-color":"#1e3466", "border":"4px solid #ffffff"})
		setStyle("info-text", {"visibility":"hidden"})
	}
}

function main() {
	console.log("V1.0")

	document.getElementById("cache-pane").addEventListener("mouseover", cacheHover);
	document.getElementById("fetch-pane").addEventListener("mouseover", fetchHover);
	document.getElementById("info").addEventListener("mouseover", infoHover);
	document.getElementById("info").addEventListener("mouseleave", infoHoverOut);
	document.getElementById("info").addEventListener("click", infoClick);
	document.getElementById("cache-pane").addEventListener("click", cacheClick);
	document.getElementById("fetch-pane").addEventListener("click", fetchClick);
	document.getElementById("upvote-button").addEventListener("mouseover", upvoteHoverIn);
	document.getElementById("upvote-button").addEventListener("mouseleave", upvoteHoverOut);
	document.getElementById("downvote-button").addEventListener("mouseover", downvoteHoverIn);
	document.getElementById("downvote-button").addEventListener("mouseleave", downvoteHoverOut);
	document.getElementById("upvote-button").addEventListener("click", test);
	document.getElementById("downvote-button").addEventListener("click", test);
}

window.onload = main;
