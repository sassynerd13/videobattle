$(document).ready(function() {
  checkSession();
	$('.login-twitter').click(signInWithTwitter);
	$('.logout').click(logOut);
});


// https://www.firebase.com/docs/web/guide/login/twitter.html
function signInWithTwitter() {
  database.authWithOAuthPopup("twitter", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully", authData);
      saveOrRetrieveUser(authData);
    }
  });	
}

function saveOrRetrieveUser(data) {
	var uid = data.uid, // twitter:uid
	    token = data.token; 
  // see if user already exists
  var currentUser = new Firebase(firebase_url+'/users/'+uid);
  currentUser.on('value', function(snap) {
    console.log(snap.val())
    if (snap.exists()) {
      window.alert('Welcome back ' + snap.val().name);
      $('.login-twitter').addClass('hidden');
      $('.logout').removeClass('hidden');
      var profile = data.twitter.cachedUserProfile;
      saveSession({name: profile.name, picture: profile.profile_image_url},uid);
    } else {
      saveUser(data);
    }
  });  
}

function saveUser(data) { 
	console.log('save user')
  var profile = data.twitter.cachedUserProfile,
  		id = data.uid,
      name = profile.name,
      location = profile.location,
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

function saveSession(user,id) {
  sessionStorage.setItem('username', user.name);
  sessionStorage.setItem('picture', user.picture);
  sessionStorage.setItem('user_id', id);    
}

function checkSession() {
	if (sessionStorage.name.length === 0) {
		$('.login-twitter').removeClass('hidden');
	} else {
		$('.logout').removeClass('hidden');
	}
}

function logOut() {
	sessionStorage.setItem('username', '');
	sessionStorage.setItem('picture', '');
	sessionStorage.setItem('user_id', '');
  window.location.reload();
}
