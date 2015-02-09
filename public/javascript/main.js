$( document ).ready(function() {
      console.log( "dom ready - jquery live!" );
      
      $( ".write-link" ).click(function(link) {
        var form_user = $("#form_user").val();

        if (form_user == ""){ 
          sweetAlert("Hey there buddy", "You need to put your name in.", "error"); 
          link.preventDefault();
        } else {
        
          //this.match('write/:hour/:user/:date' (Date in format of 10_10_1988)
          var a_href = ($(this).attr('href'));

          var form_date = $("#form_date").text().replace( /([/])/g, "_" );

          var new_href = a_href.replace( "_user_", form_user ) ;
          var new_href = new_href.replace( "_date_", form_date ) ;
          //var final_href = a_href.replace( "_date_", new_date );
          //sweetAlert(new_href);
          $(this).attr("href", new_href)
          //link.preventDefault();
        }
      });
      
      $( ".cancel-link" ).click(function(link) {
        var form_user = $(this).parent().parent().children( ".booked_by" ).text();
        
        if (form_user == "OPEN"){ 
          sweetAlert("Whoah nelly!", "You can't cancel an open slot.", "error"); 
          link.preventDefault();
        } else {
        
          //this.match('write/:hour/:user/:date' (Date in format of 10_10_1988)
          var a_href = ($(this).attr('href'));

          var form_date = $("#form_date").text().replace( /([/])/g, "_" );

          var new_href = a_href.replace( "_user_", form_user ) ;
          var new_href = new_href.replace( "_date_", form_date ) ;
          //var final_href = a_href.replace( "_date_", new_date );
          //sweetAlert(new_href);
          $(this).attr("href", new_href)
          
        }
      });

});
