function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function setStyle(objId, propertyObject) {
	var elem = document.getElementById(objId);
	for (var property in propertyObject)
    	elem.style[property] = propertyObject[property];
}

function cacheHover() {
	setStyle("cache-pane", {"background-color":"#1e3466", "color":"#ffffff"});
	setStyle("fetch-pane", {"background-color":"#ffffff", "color":"#1e3466"});
	setStyle("title", {"color":"#ffffff"});
	setStyle("info", {"color":"#1e3466"});
}

function fetchHover() {
	setStyle("fetch-pane", {"background-color":"#1e3466", "color":"#ffffff"});
	setStyle("cache-pane", {"background-color":"#ffffff", "color":"#1e3466"});
	setStyle("title", {"color":"#1e3466"});
	setStyle("info", {"color":"#ffffff"});
}

function infoHover() {
	setStyle("info", {"color":"#2a55a3"});
}

function infoPeekIn() {
	setStyle("cache-pane", {"width":"6%"});
	setStyle("fetch-pane", {"width":"94%"});
	setStyle("info", {"opacity":"0", "visibility":"hidden"});
}

function cachePeekIn() {
	setStyle("cache-pane", {"width":"6%"});
	setStyle("fetch-pane", {"width":"94%"});
	setStyle("info", {"opacity":"0", "visibility":"hidden"});
}

function cachePeekOut() {
	setStyle("cache-pane", {"width":"5%"});
	setStyle("fetch-pane", {"width":"95%"});
	setStyle("info", {"opacity":"0", "visibility":"hidden"});
}

function fetchPeekIn() {
	setStyle("fetch-pane", {"width":"6%"});
	setStyle("cache-pane", {"width":"94%"});
	setStyle("info", {"opacity":"0", "visibility":"hidden"});
}

function fetchPeekOut() {
	setStyle("fetch-pane", {"width":"5%"});
	setStyle("cache-pane", {"width":"95%"});
	setStyle("info", {"opacity":"0", "visibility":"hidden"});
}

function cacheClick() {
	var cacheElem = document.getElementById("cache-pane");
	var fetchElem = document.getElementById("fetch-pane");
	cacheElem.removeEventListener("mouseover", cacheHover);
	fetchElem.removeEventListener("mouseover", fetchHover);
	cacheElem.removeEventListener("mouseenter", cachePeekIn);
	cacheElem.removeEventListener("mouseleave", cachePeekOut);
	setStyle("cache-pane", {"background-color":"#1e3466", "color":"#ffffff", "width":"95%"});
	setStyle("fetch-pane", {"background-color":"#ffffff", "color":"#1e3466", "width":"5%"});
	setStyle("title", {"color":"#ffffff", "left":"1.5%"});
	setStyle("cache-heading", {"opacity":"0", "visibility":"hidden"});
	setStyle("fetch-heading", {"opacity":"0", "visibility":"hidden"});
	setStyle("cache-form", {"opacity":"1", "visibility":"visible", "transition":"visibility 0s, opacity 0.5s"});
	setStyle("cache-text", {"opacity":"1"});
	fetchElem.addEventListener("mouseenter", fetchPeekIn);
	fetchElem.addEventListener("mouseleave", fetchPeekOut);
}

function fetchClick() {
	var fetchElem = document.getElementById("fetch-pane");
	var cacheElem = document.getElementById("cache-pane");
	fetchElem.removeEventListener("mouseover", fetchHover);
	cacheElem.removeEventListener("mouseover", cacheHover);
	fetchElem.removeEventListener("mouseenter", fetchPeekIn);
	fetchElem.removeEventListener("mouseleave", fetchPeekOut);
	setStyle("fetch-pane", {"background-color":"#1e3466", "color":"#ffffff", "width":"95%"});
	setStyle("cache-pane", {"background-color":"#ffffff", "color":"#1e3466", "width":"5%"});
	setStyle("title", {"color":"#ffffff", "left":"78.5%"});
	setStyle("fetch-heading", {"opacity":"0", "visibility":"hidden"});
	setStyle("cache-heading", {"opacity":"0", "visibility":"hidden"});
	setStyle("cache-form", {"opacity":"0", "visibility":"hidden", "transition":"visibility 0.5s, opacity 0.5s"});
	cacheElem.addEventListener("mouseenter", cachePeekIn);
	cacheElem.addEventListener("mouseleave", cachePeekOut);
}

function infoClick() {
	var infoElem = document.getElementById("info");
	infoElem.removeEventListener("mouseover", infoHover);
	infoElem.removeEventListener("mouseenter", infoClick);
	setStyle("cache-pane", {"visibility":"hidden"});
	setStyle("fetch-pane", {"visibility":"hidden"});
	setStyle("title", {"visibility":"hidden"});
	setStyle("info-pane", {"visibility":"visible"});
}

async function main() {
	document.getElementById("cache-pane").addEventListener("mouseover", cacheHover);
	document.getElementById("fetch-pane").addEventListener("mouseover", fetchHover);
	document.getElementById("info").addEventListener("mouseover", infoHover);
	document.getElementById("info").addEventListener("click", infoClick);
	document.getElementById("cache-pane").addEventListener("click", cacheClick);
	document.getElementById("fetch-pane").addEventListener("click", fetchClick);
}

main()
