$(document).ready(function() {
	$('.carousel').carousel({
        interval: 5000 //changes the speed
    })

database.on('value', function(snap){
  var data = snap.val()
  // data.battles
  debugger

  var currentBattles = $('.carousel-inner').children();
  i = 0
  currentBattles.each(function(){
    // this.attr(src, )
    i++;
  });
})

});