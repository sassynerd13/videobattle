$(document).ready(function() {
  $('.add-video').on('click', function() {
    that = this.parentNode;
    console.log(that)
  });

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

  });

  var battle = new Firebase(firebase_url+'/battles/'+battleId);
  battle.child('videos').child(id).set({
    service: service, thumbnail: thumbnail
  }, callback);
}
