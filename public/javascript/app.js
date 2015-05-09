var firebase_url = 'https://flickering-torch-5048.firebaseio.com/';
var database = new Firebase(firebase_url);
var users = new Firebase(firebase_url+'/users');

/*
database.push({name: name, msg: msg});

database.on('child_added', function(snapshot) {
  var msg = snapshot.val();
}, function(err) {
	// error handler
});

// Save data 
 database.set('/battles/videoid/votes')
// push to a list, each item has unique id
 database.push('messages/users/<unique-user-id>/<username>')

var usersRef = database.child("users");
usersRef.set({
  alanisawesome: {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  },
  gracehop: {
    date_of_birth: "December 9, 1906",
    full_name: "Grace Hopper"
  }
});
*/
