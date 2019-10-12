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
  console.log(data)
}

function storeThought(m) { 
  database.ref("messages/" + (m.date)).set(m); 
}
