$(document).ready(function() {
  $('.add-battle').submit(function(e) {
    e.preventDefault();
    createBattle();
  });

  $('.add-video').on('click', function(e){
    console.log(e.target);
  });
});

function createBattle(name) {
  var name = $('.add-battle .name').val(),
      id;
  // check if exists
  battles.orderByChild('name').equalTo(name).on('value', function(snap) {
    console.log(snap.val())
    if (snap.exists()) {
      for (key in battle.val()) {
        sessionStorage.setItem('battle', battle.val()[key]);
      }
      console.log(snap.val()[key])
      sessionStorage.setItem('battle_id', snap.val()[key]);
    } else {
      database.child('battles').push({ name: name }, callback);
    }
  });


  window.location = 'http://'+window.location.host+'/battle_page.html';
}

function addVideo(service,id,thumbnail) {
  console.log(service,id,thumbnail);
  var battleId;
  battles.orderByChild('name').equalTo(name).on('value', function(snap) {

    if (snap.exists()) {
      for (key in battle.val()) {
        console.log(battle.val()[key])
        battleId = battle.val()[key]
      }
    }
  });

  var battle = new Firebase(firebase_url+'/battles/'+battleId);
  battle.child('videos').child(id).set({
    service: service, thumbnail: thumbnail
  }, callback);
}