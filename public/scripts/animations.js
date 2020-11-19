/**
 * Animate the bird logo using slightly changing background color
 */
const animateLogo = function() {

  $('nav img').css('background-color', '#697cbb')
  setTimeout(function() {
    $('nav img').css('background-color', '#5466a1')
  }, 3000);

  setInterval(function() {
    $('nav img').css('background-color', '#697cbb')
    setTimeout(function() {
      $('nav img').css('background-color', '#5466a1')
    }, 3000);
  }, 6000);

};


/**
 * Animate the 'new tweet' section toggle with sliding effect
 */
const logoOpenNewTweet = function() {

  $('nav div').on('click', function(e) {
    $('#new-tweet').slideToggle(500);
  });

};

/**
 * Animate text 'Write new tweet' near the bird logo to slide side over hovering
 */
const logoTextSlide = function() {

  $('nav div').mouseenter(function() {
    $(this).children('span').stop();
    $(this).children('span').animate({width: 'show'}, 500);
  })

  $('nav div').mouseleave(function() {
    $(this).children('span').stop();
    $(this).children('span').animate({width: 'hide'}, 500);
  })

};


$(document).ready(function() {

  animateLogo();
  logoOpenNewTweet();
  logoTextSlide();
  
});