$(document).ready(function() {
  $('.add-youtube').on("click", function() {
    $('.modal-body .begin').addClass('hidden');
    $('.search-youtube').removeClass('hidden');
  });

  $('form.search-youtube').submit(function(e) {
  	e.preventDefault();
    search_youtube();
  });
});
