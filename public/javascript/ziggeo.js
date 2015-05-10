var ziggeo;
$(document).ready(function() {
  $('.add-video').on('click', function() {
    that = this;
    console.log(that)
  });

  $('.ziggeo-upload').on("click", function() {
    $('.begin').hide()
    $('.zig').append(
      "<div class='zig2'><ziggeo ziggeo-width=320 ziggeo-height=240></ziggeo></div>")
  });

  ZiggeoApi.Events.on("submitted", function(data) {
    $(that).replaceWith('<ziggeo ziggeo-video="' + data.video.token + '" ziggeo-width=320 ziggeo-height=240></ziggeo>');
    addVideo('ziggeo', data.video.token, data.image);
    $('.modal').removeClass('in').addClass('out');
    $('.begin').show();
    $('.zig2').remove();
  });
});