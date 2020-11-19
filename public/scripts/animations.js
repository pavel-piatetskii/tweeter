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
  
  $('nav div').hover(function(e) { 
    $(this).children('span').animate({width: 'toggle'})
  });

};


$(document).ready(function() {

  animateLogo();
  logoOpenNewTweet();
  logoTextSlide();
  
});