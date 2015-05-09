var ziggeo;
$(document).ready(function() {
  $('.ziggeo-upload').on("click", function() {
    //replace modal contents to Ziggeo recorder
      $('.modal-body').replaceWith(
        "<ziggeo ziggeo-width=320 ziggeo-height=240></ziggeo>")
  });
  ZiggeoApi.Events.on("submitted", function (data) {
      ziggeo = data;
      // initialize new ziggeo player
          //<ziggeo ziggeo-video=""
            // ziggeo-width=320
            // ziggeo-height=240>
          //</ziggeo>
      // set ziggeo-video=data.video.token
      //close submission modal object
      // replace .addvideo button (by target) w/ the ziggeo player created
    });
});

