$(document).ready(function() {
  checkSession();
	$('.login-twitter').click(function() {
	  signInWithTwitter(); 
	  
	});

});


// https://www.firebase.com/docs/web/guide/login/twitter.html
function signInWithTwitter() {
  database.authWithOAuthPopup("twitter", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
      saveOrRetrieveUser(authData);
    }
  });	
}

function saveOrRetrieveUser(data) {
	var uid = data.uid, // twitter:uid
	    token = data.token; 
  // see if user already exists
  users.child(uid).on('value', function(snap) {
    console.log(snap.key())
  });
  saveUser(data);
}

function saveUser(data) { 
	console.log('save user')
  var profile = data.twitter.cachedUserProfile,
  		id = data.uid,
      name = profile.name,
      //location = profile.location,
      handle = profile.screen_name,
      picture = profile.profile_image_url;
  var user = { name: name, handle: handle, picture: picture };
  database.child('users').child(id).set(user, callback);
  saveSession(user,id);
}

function callback(err) {
  if (err) {
  	console.log(err);
  } else {
  	console.log('success')
  }	
}

function saveSession(user,id) { console.log(user,id)
  sessionStorage.setItem('name', user.name);
  sessionStorage.setItem('picture', user.picture);
  sessionStorage.setItem('id', id);    
}

function checkSession() {
	if (sessionStorage.name.length === 0) {
		$('.login-twitter').removeClass('hidden');
	}
}

function logOut() {
	sessionStorage.setItem('name', '');
	sessionStorage.setItem('picture', '');
	sessionStorage.setItem('id', '');
}
