$(document).ready(function() {
  $('.add-battle').submit(function(e) {
  	e.preventDefault();
  	createBattle();
  });

});

function createBattle(name) {
	var name = $('.add-battle .name').val();
	// check if exists
	battles.orderByChild('name').equalTo(name).on('value', function(snap) {
  	if () {  

  	} else {
  		database.child('battles').push({ name: name }, callback);
  	}
	});

  sessionStorage.setItem('battle', name);
  window.location = window.location.href+'/battle_page.html'
}
