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

function createThought(msg) {
  return {
    "message": msg,
    "date": (new Date()).getTime(),
    "upvotes": 0,
    "downvotes": 0
  };
}

function gotData(data) {
  console.log(data);
}

function storeThought(m) { 
  database.ref("messages/" + (m.date)).set(m); 
}

document.getElementById("cache-submit").addEventListener("mousedown", function() {
  var errorElem = document.getElementById("error-text") 
  errorElem.innerHTML = "Submitting thought..."
  errorElem.style.visibility = "visible"
  var text = document.getElementById("cache-text").value
  console.log(text.length)
  if(text.length > 200) {
    errorElem.innerHTML = "Thought is too long, maximum 200 characters (" + text.length + ")"
    errorElem.style.color = "#ff9999"
    return
  } else {
    var out = createThought(text)
    storeThought(out)
    errorElem.innerHTML = "Your thought has been submitted"
    errorElem.style.color = "#99ff99"
  }
});