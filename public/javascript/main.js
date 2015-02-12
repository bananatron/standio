$( document ).ready(function() {
      var fb = new Firebase('https://scorching-inferno-1799.firebaseio.com/');
      console.log( "dom ready - jquery live!" );
      var form_date = $("#form_date").text().replace( /([/])/g, "_" );
  
      fb.on("value", function(data) {
        var name = data.val() ? data.val().name : "";
        
        
        $( ".booked_by" ).each(function( index ) {
          div_hour = $(this).parent().children( ".timestamp" ).text().replace(/\s/g, '').substring(0,1);
          ref = new Firebase("https://scorching-inferno-1799.firebaseio.com/" + form_date + "/" + div_hour);

          ref.on("value", function(snapshot) {
            fb_booked_by = (snapshot.child('name').val())
              console.log(fb_booked_by);
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
          if (fb_booked_by !== null) {
            $(this).text(fb_booked_by);
          }
          
          //$(this).parent().parent().children( ".timestamp" ).text().replace(/\s/g, '').substring(0,1);
        });
        //alert("My name is " + name);
      });
  
      
      $( ".write-link" ).click(function(link) {
        var form_user = $("#form_user").val();
        if (form_user == ""){ 
          sweetAlert("Hey there buddy", "You need to put your name in.", "error"); 
          link.preventDefault();
        } else {
        
          //this.match('write/:hour/:user/:date' (Date in format of 10_10_1988)
          var a_href = ($(this).attr('href'));
          //var form_date = $("#form_date").text().replace( /([/])/g, "_" );
          var current_hour = $(this).parent().parent().children( ".timestamp" ).text().replace(/\s/g, '').substring(0,1);
          //var new_href = a_href.replace( "_user_", form_user ) ;
          //var new_href = new_href.replace( "_date_", form_date ) ;
          
          ref = new Firebase("https://scorching-inferno-1799.firebaseio.com/"+form_date+"/"+current_hour);
          ref.set({
            //date: form_date, 
            name: form_user, 
            //hour: current_hour
           });
          
          
//           fb.push({
//             form_date: {
//               name: "Default Name",
//               hour: form_hour
//             }
//           });
          
//           var usersRef = ref.child("users");
//           usersRef.set({
//             alanisawesome: {
//               date_of_birth: "June 23, 1912",
//               full_name: "Alan Turing"
//             },
//             gracehop: {
//               date_of_birth: "December 9, 1906",
//               full_name: "Grace Hopper"
//             }
//           });
          
          //var final_href = a_href.replace( "_date_", new_date );
          //sweetAlert(new_href);
          //$(this).attr("href", new_href)
          link.preventDefault();
          
          
        }
      });
      
      $( ".cancel-link" ).click(function(link) {
        var form_user = $(this).parent().parent().children( ".booked_by" ).text();
        
        if (form_user == "OPEN"){ 
          sweetAlert("Whoah nelly!", "You can't cancel an open slot.", "error"); 
          link.preventDefault();
        } else {
          var current_hour = $(this).parent().parent().children( ".timestamp" ).text().replace(/\s/g, '').substring(0,1);
          div_hour = $(this).parent().children( ".timestamp" ).text().replace(/\s/g, '').substring(0,1);
          
          ref = new Firebase("https://scorching-inferno-1799.firebaseio.com/" + form_date + "/" + current_hour);

          ref.on("value", function(snapshot) {
            ref.child('name').remove();
            $(this).parent().parent().children( ".booked_by" ).text("OPEN");
            
          });
          $(this).parent().parent().children( ".booked_by" ).text("OPEN");
          
          
          
          //this.match('write/:hour/:user/:date' (Date in format of 10_10_1988)
          //var a_href = ($(this).attr('href'));
          
          //var form_date = $("#form_date").text().replace( /([/])/g, "_" );
          
          
          //var new_href = a_href.replace( "_user_", form_user ) ;
          //var new_href = new_href.replace( "_date_", form_date ) ;
          //var final_href = a_href.replace( "_date_", new_date );
          //sweetAlert(new_href);
          //$(this).attr("href", new_href)
          
        }
      });

});
