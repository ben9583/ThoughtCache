// Set the configuration for your app
var config = {
	apiKey: "AIzaSyB0DYIYlM4Qj5zKaaG1zUWKdak1oFUqFmk",
	authDomain: "thoughtcache.firebaseapp.com",
	databaseURL: "https://thoughtcache.firebaseio.com",
	storageBucket: "thoughtcache.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();
var gt = (new Date()).getTime() - Math.pow(10, 4)
var rec
var keywords = [
	"Thought is too long, maximum 200 characters",
	"Thought is too short, minimum 4 characters",
	"You're doing that too quickly; please wait about 20 seconds after posting."
]

function decodeEntities(text) {
  // this prevents any overhead from creating the object each time
	var parser = new DOMParser;
	var dom = parser.parseFromString('<!doctype html><body>' + text, 'text/html');
	return dom.body.textContent;
}

function gotData(data) { // obtained data from server
	rec = ""
}

function gotSuccess(m) {
	var thoughtElem = document.getElementById("thought-text")
	//var upvotes = document.getElementById("upvote")
	//var downvotes = document.getElementById("downvote")

	m = JSON.parse(m)

	// thoughtElem.style["color"] = "#ffffff"
	thoughtElem.innerHTML = m["message"]
	//upvotes.innerHTML = m["upvotes"]
	//downvotes.innerHTML = m["downvotes"]
}

function gotError(n, e) {
	var thoughtElem = document.getElementById("thought-text")
	//var upvotes = document.getElementById("upvote")
	//var downvotes = document.getElementById("downvote")

	thoughtElem.style["color"] = "#aaaa00"
	thoughtElem.innerHTML = "An error has occurred. Click one of the vote buttons to try again or reload the page."
	//upvotes.innerHTML = ""
	//downvotes.innerHTML = ""

}

function thoughtSuccess(m) { // yay something good happened
	var errorElem = document.getElementById("error-text")
	errorElem.innerHTML = m
	errorElem.style.color = "#99ff99"
}

function thoughtError(n, e) { // whoops something bad happened
	var errorElem = document.getElementById("error-text")
	errorElem.innerHTML = e
	errorElem.style.color = "#ff9999"
}

var sw = true

function getXVal(theUrl, content, callbackSuccess, callbackError) { // Sends http request
	var tt = (new Date()).getTime()
	if(theUrl.indexOf(" ") > 200 || theUrl.indexOf(" ") == -1 && document.getElementById("info-val").value == "sub") {
		theUrl = decodeEntities(theUrl.replace(/x/g, "&#")) + content
	} else {
		callbackError(0, "")
		return
	}
	if(tt - Math.pow(10, 4) > gt) {
		if((getCookie("xdata") == rec || callbackSuccess == gotSuccess) && sw) {
			var i = new t(); // this is the xmlHttpRequest element that connects to the server
			i.onreadystatechange = function() { 
			    if (i.readyState == 4) {
			    	//xmlHTTP 200 means it worked
			    	if(i.status == 200) {
			    		callbackSuccess(i.responseText);
			    	} else {
			    		callbackError(i.status, i.responseText)
			    	}
			    }
			}
			if(callbackSuccess == thoughtSuccess) {
				sw = false
				i.open("GET", theUrl, true); // true for asynchronous 
				i.send();
				setTimeout(function() {
					sw = true
					asnPermValue("xdata", "", 60)
				}, 20000);
			}
		}
	}
}

function asnPermValue(cname, cvalue, exseconds) { // Assign cookie value
	var d = new Date();
	d.setTime(d.getTime() + (exseconds*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) { // Get cookie value
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function genThought() {
	newThought()
	document.getElementById("info-val").value = "sub"
	getXVal(s(), "", gotSuccess, gotError)
	document.getElementById("info-val").value = ""
}

var db = true;

function voteUp() {
	if(db) {
		db = false
		genThought()
		//to be implemented later
		setTimeout(function() {
			db = true
		}, 1500);
	}
}

function voteDown() {
	if(db) {
		db = false
		genThought()
		//to be implemented later
		setTimeout(function() {
			db = true
		}, 1500);
	}
}

function subT(e) {
	if(e.button == undefined && e.keyCode != 13) {
		return
	} else if(e != null && e.keyCode == 13) {
		document.getElementById("cache-text").disabled = true
		document.getElementById("cache-text").value = document.getElementById("cache-text").value.replace(/\n/g, " ")
		document.getElementById("cache-text").disabled = false
	}
	console.log("test")
	var errorElem = document.getElementById("error-text")
	var infoElem = document.getElementById("info-val")
	errorElem.innerHTML = "Submitting thought..."
	errorElem.style.color = "#ffffff"
	errorElem.style.visibility = "visible"
	infoElem.value = "Submitting..."
	var text = document.getElementById("cache-text").value
	if(text.length > 200) { // Too long
		errorElem.innerHTML = keywords[0] + " (" + text.length + ")."
		errorElem.style.color = "#ff9999"
		return
	} else if(text.length < 4) { // Too short
		errorElem.innerHTML = keywords[1] + " (" + text.length + ")."
		errorElem.style.color = "#ff9999"
		return
	} else if(getCookie("xdata") == rec && infoElem.value == "Submitting..." && sw) { // All good
		infoElem.value = "sub" // more spam stuff
		getXVal(r(), text, thoughtSuccess, thoughtError) // THE ACTUAL SUBMIT TO SERVER FUNCTION
		asnPermValue("xdata", text, 60) // set spam-prevention cookie
		document.getElementById("cache-text").value = ""
	} else { // Too frequent
		errorElem.innerHTML = keywords[2]
		errorElem.style.color = "#ff9999"
	}
	infoElem.value = ""
}


document.getElementById("upvote-button").addEventListener("click", voteUp);
document.getElementById("downvote-button").addEventListener("click", voteDown);

document.getElementById("cache-submit").addEventListener("mousedown", subT);

window.onload = (function() {
	main()
	document.getElementById("info-val").value = "sub"
	getXVal(s(), "", gotSuccess, gotError)
	document.getElementById("info-val").value = ""
});