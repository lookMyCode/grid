let navOffsetTop      = $('nav').offset().top,
countBool             = true,
regExpName            = /[a-z]{3,16}/i,
regExpEmail           = /[a-z0-9_-]{2,16}@[0-9a-z_-]+\.[a-z]{2,5}/i,
regExpPhone           = /\+?[0-9]{6,16}/;

//PROLOADER

$(window).on('load', function(){
  window.timerID = window.setInterval(function(){
    $('#preloader').fadeOut(800);
    window.clearInterval(window.timerID);
  }, 1000);
});

// RESPONSIVE NAVIGANION

toCustomizeMenu();

$(window).on('resize', function() {
  toCustomizeMenu();
});

$('#header-button').on('click', function() {
  $('nav').slideToggle(300);
});

// FIXED NAVIGATION, COUNTS and BUTTON TO TOP

$(window).on('scroll', function() {
  toFixNav();

  toFixHeaderAndNav();

  if( $(this).scrollTop() > $('#counts').offset().top - $(counts).outerHeight() && countBool ) {
    countBool = false;
    toAnimateCounts();
  }

  buttonToTop();
});

// VALIDATE FORM

$('.input-name').on('blur', function(){
  toValidateInput(regExpName, $(this));
});

$('.input-email').on('blur', function(){
  toValidateInput(regExpEmail, $(this));
});

$('.input-phone').on('blur', function(){
  toValidateInput(regExpPhone, $(this));
});

$('.button-form').on('click', toValidateForm);

// ANIMATION LINK

$('a').click(function() {
  var elementClick = $(this).attr('href')
  var destination = $(elementClick).offset().top;
  jQuery('html:not(:animated),body:not(:animated)').animate({
    scrollTop: destination
  }, 800);
  return false;
});

// CREATE FORM AFTER CLICK

$('#created_form_wrap').fadeOut();

$('.cards_bottom > span').on('click', function() {
  $('#created_form_wrap').fadeIn(800);
});

$('.close_form').on('click', function() {
  $('#created_form_wrap').fadeOut(800);
});

// FUNCTIONS

function windowSize() {
  return $(window).outerWidth();
}

function toCustomizeMenu() {
  if( windowSize() <= 767 ) {
    $('nav').slideUp();
  } else {
    $('nav').slideDown();
  }
}

function toFixNav() {
  if( windowSize() > 767 && $(this).scrollTop() >= navOffsetTop) {
    $('nav').addClass('fixed_menu');
  } else {
    $('nav').removeClass('fixed_menu');
  }
}

function toFixHeaderAndNav() {
  if( windowSize() <= 767 && $(this).scrollTop() >= $('header').outerHeight() + 20 ) {
    $('header').css({
      'position': 'fixed',
      'top': 0,
      'left': 0
    });
    $('nav').css({
      'position': 'fixed',
      'top': $('header').outerHeight(),
      'left': 0
    });
  } else {
    $('header').css('position', 'static');
  }
}

function toAnimateCounts() {
  $('.count').each(function(){
    $(this).prop('Counter', 0).animate({
      Counter:$(this).text()
    }, {
      duration: 3000,
      easing: 'swing',
      step: function(now) {
        $(this).text(Math.ceil(now));
      }
    });
  });
}

function toValidateInput($regExp, $input) {  
  if( $regExp.test($input.val()) == false ) {
    $input.css('borderColor', '#f33');
    return false;
  } else {
    $input.css('borderColor', '#3f3');
    return true;
  }
}

function toValidateForm() {
  toValidateInput(regExpName, $('.input-name'));
  toValidateInput(regExpEmail, $('.input-email'));
  toValidateInput(regExpPhone, $('.input-phone'));

  if(
    toValidateInput(regExpName, $('.input-name')) &&
    toValidateInput(regExpEmail, $('.input-email')) &&
    toValidateInput(regExpPhone, $('.input-phone'))
  ) {
    $('.form-info').removeClass('form-false').addClass('form-true');
  } else {
    $('.form-info').removeClass('form-true').addClass('form-false');
  }

  $('.form-false').html('Please Follow Error Messages and Complete as Required');
  $('.form-true').html('Thank you for your submission :)');

  if( $('.form-info').hasClass('form-false') ) {
    $('.input-name')
    .add('.input-email')
    .add('.input-phone')
    .add('.form-info').animate({
      'marginLeft': '-10px'
    }, 100).animate({
      'marginLeft': '10px'
    }, 100).animate({
      'marginLeft': '-10px'
    }, 100).animate({
      'marginLeft': '10px'
    }, 100).animate({
      'marginLeft': '-10px'
    }, 100).animate({
      'marginLeft': '10px'
    }, 100).animate({
      'marginLeft': '-10px'
    }, 100).animate({
      'marginLeft': '10px'
    }, 100).animate({
      'marginLeft': '-10px'
    }, 100).animate({
      'marginLeft': '0'
    }, 100);
  }
}

function buttonToTop() {
  if( $(this).scrollTop() > 300 ) {
    $('#button_to_top').css({
      'bottom': '20px',
      'opacity': 1
    });
  } else {
    $('#button_to_top').css({
      'bottom': '-80px',
      'opacity': 0
    });
  }
}