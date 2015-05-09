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
  database.orderByChild('id').equalTo(uid).once('value', function(snapshot) {
  	console.log('welcome back', snapshot);
  	//if (snapshot.key() === null) { saveUser(data); }
  });
  
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

function saveSession(user,id) {
  document.cookie = "name="+user.handle+';picture='+user.picture
  +'; id='+id;
}

function checkSession() {
	var session = document.cookie;
	if (session.indexOf('picture=') - session.indexOf('name=') > 1) {
		$('.login-twitter').removeClass('hidden');
	}
}
