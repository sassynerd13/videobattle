var ziggeo;
$(document).ready(function() {
  $('.ziggeo-upload').on("click", function() {
    $('.begin').hide()
    $('.zig').append(
      "<div class='zig2'><ziggeo ziggeo-width=320 ziggeo-height=240></ziggeo></div>")
  });

  ZiggeoApi.Events.on("submitted", function(data) {
    addVideo('ziggeo', data.video.token, 'img.gif' );
    $('.zig2').remove();
  });
});
