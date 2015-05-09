$(document).ready(function() {
  $('.add-battle').submit(function(e) {
  	e.preventDefault();
  	createBattle();
  });
  $('.add-ziggeo').click(function() {});
});

function createBattle(name) {
	var name = $('.add-battle .name').val(),
	    id;
	// check if exists
	battles.orderByChild('name').equalTo(name).on('value', function(snap) {
  	console.log(snap.val())
  	if (snap.exists()) { 
  	  // for (key in battle.val()) {
  	  // 	sessionStorage.setItem('battle', battle.val()[key]);
  	  // } 
     //  console.log(battle.val()[key])
  	} else {
  	  database.child('battles').push({ name: name }, callback);
  	}
	});

  sessionStorage.setItem('battle', name);
  window.location = 'http://'+window.location.host+'/battle_page.html';
}

function generateZiggeoVideo(token_number) {
	var video = $("<ziggeo>").attr('ziggeo-video',token_number).
	            attr('ziggeo-width', 320).attr('ziggeo-height', 240);
}
