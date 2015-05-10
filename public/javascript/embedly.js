

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
