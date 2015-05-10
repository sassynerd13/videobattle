$(document).ready(function() {
  $('.add-battle').submit(function(e) {
    e.preventDefault();
    createBattle();
  });

  $('.add-video').on('click', function(e){
    console.log(e.target);
  });
});

var battle;

function createBattle(name) {
	var name = $('.add-battle .name').val(),
	    id;

	// check if exists
	battles.orderByChild('name').equalTo(name).on('value', function(snap) {
  	battle = snap; console.log(snap)
  	if (snap.exists()) { 
  	  for (key in snap.val()) {
  	  	id = key;
  	  } 
  	} else {
  	  database.child('battles').push({ name: name }, callback);
  	}
	});

  sessionStorage.setItem('battle', name);
  window.location = 'http://'+window.location.host+'/battle_page.html';
}

function addVideo(service,id,thumbnail) {
	console.log(service,id,thumbnail);
  var battle_name = sessionStorage.battle;

	battles.orderByChild('name').equalTo(battle_name).on('value', function(snap) {
		thisbattle = snap;
    for (key in snap.val()) {
		  var battle = new Firebase(firebase_url+'/battles/'+key);
		  battle.child('videos').child(id).set({ 
		  	service: service, thumbnail: thumbnail 
		  }, callback);    	
    }
	});    
}

var thissnap;
function showBattles() {
  battles.orderByChild('name').limitToLast(3).on('value', function(snap) {
    console.log(snap)
    thissnap = snap;
    for (battle in snap.val()) {
      var img;
      for (video in battle.videos) {
        img = $('<img>').attr(src, video.thumbnail)
      } console.log(img)
      var item = $('<div>').addClass('item');
      var name = $('<h1>').addClass('name').html(battle.name);
      item.append(img).append(name); console.log(item)
      $('.carousel-inner').append(item);
    }
  });
}


function getVideos() {
  var battle_name = sessionStorage.battle;

  battles.orderByChild('name').equalTo(battle_name).on('value', function(snap) {
    
      var battle = new Firebase(firebase_url+'/battles/'+key);
      battle.child('videos').child(id).set({ 
        service: service, thumbnail: thumbnail 
      }, callback);     
  }); 
}
