var windowToggle = 0
var infoToggle = false

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
	setStyle("info", {"color":"#ffffff", "background-color": "#1e3466"});
}

function fetchHover() {
	setStyle("fetch-pane", {"background-color":"#1e3466", "color":"#ffffff"});
	setStyle("cache-pane", {"background-color":"#ffffff", "color":"#1e3466"});
	setStyle("title", {"color":"#1e3466"});
	setStyle("info", {"color":"#1e3466", "background-color": "#ffffff"});
}

function infoHover() {
	setStyle("info", {"background-color":"#092831", "color":"#ffffff"});
}

function infoHoverOut() {
	if(windowToggle == 1) {
		setStyle("info", {"background-color":"#1e3466", "color":"#ffffff"});
	} else {
		setStyle("info", {"background-color":"#ffffff", "color":"#1e3466"});
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
	setStyle("info", {"color":"#ffffff", "background-color": "#1e3466"});
	setStyle("cache-heading", {"opacity":"0", "visibility":"hidden"});
	setStyle("fetch-heading", {"opacity":"0", "visibility":"hidden"});
	setStyle("cache-text", {"opacity":"1"});
	setStyle("cache-form", {"display":"block"});
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
	setStyle("title", {"color":"#ffffff", "left":"calc(100% - 10em)"});
	setStyle("info", {"color":"#1e3466", "background-color": "#ffffff"});
	setStyle("fetch-heading", {"opacity":"0", "visibility":"hidden"});
	setStyle("cache-heading", {"opacity":"0", "visibility":"hidden"});
	setStyle("cache-text", {"opacity":"0"});
	setStyle("cache-form", {"display":"none"});
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
	} else {
		infoToggle = false
		document.getElementById("cache-pane").addEventListener("click", cacheClick);
		document.getElementById("fetch-pane").addEventListener("click", fetchClick);
		setStyle("cache-pane", {"visibility":"visible"});
		setStyle("fetch-pane", {"visibility":"visible"});
		setStyle("title", {"visibility":"visible"});
		setStyle("info-pane", {"top":"-51em"})
	}
}

async function main() {
	document.getElementById("cache-pane").addEventListener("mouseover", cacheHover);
	document.getElementById("fetch-pane").addEventListener("mouseover", fetchHover);
	document.getElementById("info").addEventListener("mouseover", infoHover);
	document.getElementById("info").addEventListener("mouseleave", infoHoverOut);
	document.getElementById("info").addEventListener("click", infoClick);
	document.getElementById("cache-pane").addEventListener("click", cacheClick);
	document.getElementById("fetch-pane").addEventListener("click", fetchClick);
}

main()
