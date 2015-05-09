    // Comment
    function search_videos() {
      search_youtube();
      // search_vimeo();
      // search_vine();
    }

    // Comment
    function append_video(video){
      var add_button  = "<button onclick='add_video(\'youtube\',\'" + video.id + "\',\'" + video.thumbnail + "\')'>Select This Video</button>";
      var embed_video = video.url;
      $('#videos-result').append( "<div class='youtube_item'>" + add_button + embed_video + "</div>");
    }

    // Comment
    function add_video( service, id, thumbnail ) {
      // call firebase
      // close modal
      // call_method to refresh
    }

    /****************************************

                  YouTube API

    ****************************************/

    // Search for a specified string.
    function search_youtube() {
      var q = $('#query').val();
      var request = gapi.client.youtube.search.list({
                 q:  q,
              part: 'snippet',
        maxResults: 15
      });

      request.execute(function(response) {
        var embeds = youtube_videos_parser( response.result.items );
        for ( var i = 0; i < embeds.length; i++ ){
          append_video( embeds[i] )
        }
        embedly_replace_links('#videos-result a');
      });
    }

    // After the API loads, call a function to enable the search box.
    function handleAPILoaded() {
      console.log('here2');
      $('.search-button').attr('disabled', false);
    }

    // Loads Youtube API
    function googleApiClientReady(){
      console.log('here1');
      gapi.client.setApiKey('AIzaSyDdWLhqPFaTcBdYzx-_doKlZnT5lQwnyMc');
      gapi.client.load('youtube','v3',function(){ handleAPILoaded() });
    };

    // Comment here
    function youtube_videos_parser(items) {
      var embeds = [];
      for ( var i = 0; i < items.length; i++ ) {
        var item = items[i];
        if ( typeof item.id !== 'undefined' ) {
          embeds[i] = {
            id: item.id.videoId,
            url: youtube_video_embed(item),
            thumbnail: item.snippet.thumbnails.high.url
          }
        }
      }
      return embeds;
    }

    // Comment here
    function youtube_video_embed(item) {
      var video_id    = item.id.videoId;
      var video_title = item.snippet.title;
      var url         = "http://youtu.be/" + video_id;
      return "<a href='" + url + "' target='_new'>" + url + "</a>";
    }


    /****************************************

                  Vine API

    ****************************************/

    // Search for a specified string.
    function search_vine() {
      var q = $('#query').val();
      var url = 'https://api.vineapp.com/timelines/tags/' + q;

      var request = $.getJSON( url, function(response) {
        embeds.concat( vine_videos_parser( response.records ) );
      });
    }

    // Comment here
    function vine_videos_parser(items) {
      var embeds = [];
      for ( var i = 0; i < items.length; i++ ) {
        var item = items[i];
        if ( typeof item.id !== 'undefined' ) {
          embeds[i] = vine_video_embed(item);
        }
      }
      return embeds;
    }

    // Comment here
    function vine_video_embed(item) {
      var video_id    = item.postId;
      var video_title = item.description;
      var url         = item.permalinkUrl;
      return "<a href='" + url + "' target='_new'>" + url + "</a>";
    }


    /****************************************

                  Embed.ly API

    ****************************************/

    // Comment here
    $.embedly.defaults.key = '0a99733c2dd844ff8b20b19b2b850de2';

    // Comment here
    function embedly_replace_links(dom) {
      $(dom).hide();
      $('#result-loading').show();

      $(dom).embedly({
        query: {maxwidth:100},
        display: function(obj){

          // Overwrite the default display.
          if (obj.type === 'video' || obj.type === 'rich'){

            // Figure out the percent ratio for the padding. This is (height/width) * 100
            var ratio = ((obj.height/obj.width)*100).toPrecision(4) + '%'

            // Wrap the embed in a responsive object div. See the CSS here!
            var div = $('<div class="responsive-object">').css({
              paddingBottom: ratio
            });

            // Add the embed to the div.
            div.html(obj.html);

            // Replace the element with the div.
            $(this).replaceWith(div);
          }
      },
      done: function(results){
        $('#result-loading').hide();
        $(dom).show();
      }
    });
  }
