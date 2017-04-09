$(document).ready(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 190
        }, 1000);
        return false;
      }
    }
  });
  //navigation
  $(window).resize(function() {
  var more = document.getElementById("js-navigation-more");
  if ($(more).length > 0) {
    var windowWidth = $(window).width();
    var moreLeftSideToPageLeftSide = $(more).offset().left;
    var moreLeftSideToPageRightSide = windowWidth - moreLeftSideToPageLeftSide;

    if (moreLeftSideToPageRightSide < 330) {
      $("#js-navigation-more .submenu .submenu").removeClass("fly-out-right");
      $("#js-navigation-more .submenu .submenu").addClass("fly-out-left");
    }

    if (moreLeftSideToPageRightSide > 330) {
      $("#js-navigation-more .submenu .submenu").removeClass("fly-out-left");
      $("#js-navigation-more .submenu .submenu").addClass("fly-out-right");
    }
  }
});

$(document).ready(function() {
  var menuToggle = $("#js-mobile-menu").unbind();
  var navLink = $(".nav-item");
  $("#js-navigation-menu").removeClass("show");
  navLink.on("click", function() {
    $("#js-navigation-menu").removeAttr("style");
  });


  menuToggle.on("click", function(e) {
    e.preventDefault();
    $("#js-navigation-menu").slideToggle(function(){
      if($("#js-navigation-menu").is(":hidden")) {
        $("#js-navigation-menu").removeAttr("style");
      }
    });
  });
}); 

  $("#video-upload-modal").on("change", function() {
    if ($(this).is(":checked")) {
      $("body").addClass("modal-open");
    } else {
      $("body").removeClass("modal-open");
    }
  });
$(".open-modal").on("click", function() {
    $("#video-upload-modal").prop('checked', true);
  });
  $(".modal-close, .close-modal").on("click", function() {
    $(".modal-state:checked").prop("checked", false).change();
  });

  $(".modal-inner").on("click", function(e) {
    e.stopPropagation();
  });

  $(".dropdown-button").click(function() {
    var $button, $menu;
    $button = $(this);
    $menu = $button.siblings(".dropdown-menu");
    $menu.toggleClass("show-menu");
    $menu.children("li").click(function() {
      $menu.removeClass("show-menu");
      $button.html($(this).html());
    });
  });


  //Contact 
    
 $('#contact-form').submit(function(event) {

     $('.form-error').remove();
     $('.contact-loader').removeClass('hide');

     var formData = {
         'name': $('input[name="contact-name"]').val(),
         'email': $('input[name="contact-email"]').val(),
         'message': $('textarea[name="contact-message"]').val()
     };

     //HTML for appending error messages
     var errorStart = '<div class="form-error fade-in"><ul><li><i class="fa fa-exclamation-circle" aria-hidden="true"></i> ';
     var errorStartMessage = '<div class="form-error form-error--textarea fade-in"><ul><li><i class="fa fa-exclamation-circle" aria-hidden="true"></i> ';
     var errorEnd = '</li></ul></div>';

     //check for empty required fields and show error messages
     if (formData.name === "") {
         $('#contact-fields-name-field').append(errorStart + 'Please enter a name' + errorEnd);
     }
    
     if ($('input[name="contact-email"]').val() === "") {
         $('#contact-fields-emailAddress-field').append(errorStart + 'Please enter an email' + errorEnd);
     }

     if ($('textarea[name="contact-message"]').val() === "") {
         $('#contact-fields-message-field').append(errorStartMessage + 'Please enter a message' + errorEnd);
     }

     if (formData.name === "" ||
         formData.email === "" ||
         formData.message === ""){
         $('.contact-loader').addClass('hide');
         return false;
     }

     //validate email address and show error message if needed
     function isValidEmailAddress(emailAddress) {
         var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
         return pattern.test(emailAddress);
     };

     if (!isValidEmailAddress(formData.email)) {
         //valid email required
         $('#contact-fields-emailAddress-field').append(errorStart + 'Please enter a valid email' + errorEnd);
         $('.contact-loader').addClass('hide');
         return false;
     }

     var url = '/input/create_ticket.php';

     // process the form
     $.ajax({
         type: 'POST',
         url: url,
         data: formData
     })

     .done(function(data) {

         console.log('success', data);
         //clear the form if successful
         $(':input', '#contact-form')
             .not(':button, :submit, :reset')
             .val('');
         //show success message
         $('#contact-success').append('<div class="flash-success fade-in"><span>' + 'Thank you we will be in touch.' + '</span></div>');

         $('.contact-loader').addClass('hide');
     })

     .fail(function(data) {
         console.log('fail', data);
         $('#contact-success').remove();
         $('.contact-loader').addClass('hide');
     });
     event.preventDefault();
 });
});
