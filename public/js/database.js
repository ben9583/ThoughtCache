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
	"Thought is too short, minimum 4 characters",
	"You're doing that too quickly; please wait about a minute after posting."
]

function gotData(data) { // obtained data from server
	console.log(data);
	rec = ""
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


function xmlTrans(theUrl, callbackSuccess, callbackError) { // Sends http request
	var tt = (new Date()).getTime()
	if(tt - Math.pow(10, 4) > gt) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() { 
		    if (xmlHttp.readyState == 4) { // && xmlHttp.status == 200
		    	//xmlHTTP 200 means it worked
		    	if(xmlHttp.status == 200) {
		    		callbackSuccess(xmlHttp.responseText);
		    	} else {
		    		callbackError(xmlHttp.status, xmlHttp.responseText)
		    	}
		    }
		}
		xmlHttp.open("GET", theUrl, true); // true for asynchronous 
		xmlHttp.send();
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

document.getElementById("cache-submit").addEventListener("mousedown", function() {
	var errorElem = document.getElementById("error-text") 
	errorElem.innerHTML = "Submitting thought..."
	errorElem.style.color = "#ffffff"
	errorElem.style.visibility = "visible"
	var text = document.getElementById("cache-text").value
	console.log(text.length)
	if(text.length > 200) { // Too long
		errorElem.innerHTML = keywords[0] + " (" + text.length + ")."
		errorElem.style.color = "#ff9999"
		return
	} else if(text.length < 4) { // Too short
		errorElem.innerHTML = keywords[1] + " (" + text.length + ")."
		errorElem.style.color = "#ff9999"
		return
	} else if(getCookie("xdata") == rec) { // All good
		asnPermValue("xdata", text, 60)
		xmlTrans(("https://us-central1-thoughtcache.cloudfunctions.net/submitThought?message=" + text), thoughtSuccess, thoughtError)
	} else { // Too frequent
		errorElem.innerHTML = keywords[2]
		errorElem.style.color = "#ff9999"
	}
});