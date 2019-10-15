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

/*
function createThought(msg) {
	var out = ""
	for(var i = 0; i < msg.length; i++) {
		if(msg.charCodeAt(i) > 31 && msg.charCodeAt(i) < 128) {
			out += msg.charAt(i);
		}
	}
	return {
		"message": out,
		"upvotes": 0,
		"downvotes": 0
	};
}
*/

function gotData(data) {
	console.log(data);
}

function storeThought(m) { 
  //database.ref("messages/" + (m.date)).set(m); 
  console.log(m.message);
}

function thoughtSuccess(m) {
	var errorElem = document.getElementById("error-text")
	errorElem.innerHTML = m
	errorElem.style.color = "#99ff99"
}

function thoughtError(n, e) {
	var errorElem = document.getElementById("error-text")
	errorElem.innerHTML = e
	errorElem.style.color = "#ff9999"
}

//us-central1-thoughtcache.cloudfunctions.net/submitThought

function httpGetAsync(theUrl, callbackSuccess, callbackError) {
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

document.getElementById("cache-submit").addEventListener("mousedown", function() {
	var errorElem = document.getElementById("error-text") 
	errorElem.innerHTML = "Submitting thought..."
	errorElem.style.color = "#ffffff"
	errorElem.style.visibility = "visible"
	var text = document.getElementById("cache-text").value
	console.log(text.length)
	if(text.length > 200) {
		errorElem.innerHTML = "Thought is too long, maximum 200 characters (" + text.length + ")"
		errorElem.style.color = "#ff9999"
		return
	} else if(text.length < 4) {
		errorElem.innerHTML = "Thought is too short, minimum 4 characters (" + text.length + ")"
		errorElem.style.color = "#ff9999"
		return
	} else {
		//var out = createThought(text)
		//storeThought(out)
		httpGetAsync(("https://us-central1-thoughtcache.cloudfunctions.net/submitThought?message=" + text), thoughtSuccess, thoughtError)
    	//errorElem.innerHTML = "Your thought has been submitted"
    	//errorElem.style.color = "#99ff99"
    }
});