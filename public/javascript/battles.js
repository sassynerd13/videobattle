$(document).ready(function() {
  $('.add-battle').submit(function(e) {
    e.preventDefault();
    createBattle();
  });

  $('.add-video').on('click', function(e){
    that = this.parentNode;
    console.log(e.target);
  });

});



function createBattle(name) {
	var name = $('.add-battle .name').val(),
	    id;

	// check if exists
	battles.orderByChild('name').equalTo(name).on('value', function(snap) {
  	console.log(snap)
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


  var replacement;
  if ( service == 'youtube' ) {
    var url = 'http://youtu.be/' + id;
    replacement = "<a href='" + url + "'>" + url + "</a>";
  } else if ( service == 'ziggeo' ) {
    replacement = '<ziggeo ziggeo-video="' + id + '" ziggeo-width=320 ziggeo-height=240></ziggeo>';
  }

  $(that).html( replacement );
  if ( service == 'youtube' ) embedly_replace_links(that);

  $('.modal-body .begin').removeClass('hidden');
  $('.search-youtube').addClass('hidden');

  $('.modal').removeClass('in').addClass('out');
  $('.begin').show()



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

var thisbattle;
var thissnap;
function showBattles() {
  battles.orderByChild('name').limitToLast(3).on('value', function(snap) {
    console.log(snap)
    thissnap = snap;
    for (key in snap.val()) { 
      var battle = snap.val()[key];
      thisbattle = battle;
      var img;
      for (key in battle.videos) {
        var video = battle.videos[key];
        console.log(video)
        img = $('<img>').attr('src', video.thumbnail)
      } 
      var item = $('<div>').addClass('item');
      var name = $('<h1>').addClass('name').html(battle.name);
      item.append(img).append(name); console.log(item)
      $('.carousel-inner').append(item);

      $('.item img').click(function(e) {
        var name = $(e.target).parent().find('.name').html();
        createBattle(name);
      });
    }
  });
}