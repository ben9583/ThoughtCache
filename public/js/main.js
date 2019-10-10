function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function setStyle(objId, propertyObject) {
	var elem = document.getElementById(objId);
	for (var property in propertyObject)
    	elem.style[property] = propertyObject[property];
}

function cacheHover() {
	setStyle("cache-pane", {"background-color":"#000000", "color":"#ffffff"});
	setStyle("fetch-pane", {"background-color":"#ffffff", "color":"#000000"});
	setStyle("title", {"color":"#ffffff"});
}

function fetchHover() {
	setStyle("fetch-pane", {"background-color":"#000000", "color":"#ffffff"});
	setStyle("cache-pane", {"background-color":"#ffffff", "color":"#000000"});
	setStyle("title", {"color":"#000000"});
}

function cachePeekIn() {
	setStyle("cache-pane", {"width":"6%"});
	setStyle("fetch-pane", {"width":"94%"});
}

function cachePeekOut() {
	setStyle("cache-pane", {"width":"5%"});
	setStyle("fetch-pane", {"width":"95%"});
}

function fetchPeekIn() {
	setStyle("fetch-pane", {"width":"6%"});
	setStyle("cache-pane", {"width":"94%"});
}

function fetchPeekOut() {
	setStyle("fetch-pane", {"width":"5%"});
	setStyle("cache-pane", {"width":"95%"});
}

function cacheClick() {
	var cacheElem = document.getElementById("cache-pane");
	var fetchElem = document.getElementById("fetch-pane");
	cacheElem.removeEventListener("mouseover", cacheHover);
	fetchElem.removeEventListener("mouseover", fetchHover);
	cacheElem.removeEventListener("mouseenter", cachePeekIn);
	cacheElem.removeEventListener("mouseleave", cachePeekOut);
	setStyle("cache-pane", {"background-color":"#000000", "color":"#ffffff", "width":"95%"});
	setStyle("fetch-pane", {"background-color":"#ffffff", "color":"#000000", "width":"5%"});
	setStyle("title", {"color":"#ffffff", "left":"1%"});
	setStyle("cache-heading", {"opacity":"0", "visibility":"hidden"});
	setStyle("fetch-heading", {"opacity":"0", "visibility":"hidden"});
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
	setStyle("fetch-pane", {"background-color":"#000000", "color":"#ffffff", "width":"95%"});
	setStyle("cache-pane", {"background-color":"#ffffff", "color":"#000000", "width":"5%"});
	setStyle("title", {"color":"#ffffff", "left":"81.5%"});
	setStyle("fetch-heading", {"opacity":"0", "visibility":"hidden"});
	setStyle("cache-heading", {"opacity":"0", "visibility":"hidden"});
	cacheElem.addEventListener("mouseenter", cachePeekIn);
	cacheElem.addEventListener("mouseleave", cachePeekOut);
}

async function main() {
	document.getElementById("cache-pane").addEventListener("mouseover", cacheHover);
	document.getElementById("fetch-pane").addEventListener("mouseover", fetchHover);
	document.getElementById("cache-pane").addEventListener("click", cacheClick);
	document.getElementById("fetch-pane").addEventListener("click", fetchClick);
}

main()