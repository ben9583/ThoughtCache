const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

function createThought(msg) {
	return {
		"message": msg,
		"upvotes": 0,
		"downvotes": 0
	};
}

exports.upvote = functions.https.onRequest(async (request, response) => {
	response.set('Access-Control-Allow-Origin', '*');

	if(request.query.id != "") {
		const id = request.query.id

		admin.database().ref('messages/' + id + '/upvotes').once('value', function(snap){
			admin.database().ref('messages/' + id + '/upvotes').set(parseInt(snap.val()) + 1)
		});
	}

	response.status(200).send();
});

exports.downvote = functions.https.onRequest(async (request, response) => {
	response.set('Access-Control-Allow-Origin', '*');

	if(request.query.id != "") {
		const id = request.query.id

		admin.database().ref('messages/' + id + '/downvotes').once('value', function(snap){
			admin.database().ref('messages/' + id + '/downvotes').set(parseInt(snap.val()) + 1)
		});
	}

	response.status(200).send();
});

exports.fetchThought = functions.https.onRequest(async (request, response) => {
	response.set('Access-Control-Allow-Origin', '*');

	admin.database().ref('messages/').once('value', function(snap){
		var out = JSON.parse(JSON.stringify(snap.val()));

		var thoughtArr = [];

		for (var key in out) {
			if (out.hasOwnProperty(key)) {
				thoughtArr.push(key);
			}
		}
		var randChoice = Math.floor(Math.random() * thoughtArr.length);

		out[thoughtArr[randChoice]]["id"] = thoughtArr[randChoice]

		response.status(200).send(out[thoughtArr[randChoice]]);
	});

});

exports.submitThought = functions.https.onRequest(async (request, response) => {
	response.set('Access-Control-Allow-Origin', '*');

	const message = request.query.message
	var out = ""
	for(var i = 0; i < message.length; i++) {
		if(message.charCodeAt(i) > 31 && message.charCodeAt(i) < 128) {
			out += message.charAt(i);
		}
	}

	if(out.length > 200) {
		response.status(400).send("Thought is too long, maximum 200 characters (" + out.length + ")");
		return
	} else if(out.length < 4) {
		response.status(400).send("Thought is too short, minimum 4 characters (" + out.length + ")");
		return
	} else {
		admin.database().ref("messages/" + ((new Date()).getTime())).set(createThought(out)); 
		response.status(200).send("Your thought has been submitted");
	}
});

exports.purgeThoughts = functions.https.onRequest(async (request, response) => {
	const time = new Date() / 1000;

	if(request.query.key != "9a94d0f0d1ace739cd201e93bac69420addbcef") {
		response.status(403).send("Unauthorized")
		return
	}

	admin.database().ref('messages').on('value', function(snap) {
		snap.forEach(function (snap2) {
			var when = snap2.key;
			console.log(time + " " + when)
			if((parseInt(when)/1000) + 604800 < time) {
            	// more than a week old
            	console.log("deleted")
            }
        });
    });

	response.status(200).send("Older thoughts have been purged.");
});