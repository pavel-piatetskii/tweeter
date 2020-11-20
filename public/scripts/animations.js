/**
 * Animate the bird logo using slightly changing shadow
 */
const animateLogo = function() {

  const delay = 2000;

  $('nav img').css('filter', 'drop-shadow(6px 6px 3px grey)');
  setTimeout(function() {
    $('nav img').css('filter', 'drop-shadow(2px 2px 0px grey)');
  }, delay);
  
  setInterval(function() {
    $('nav img').css('filter', 'drop-shadow(6px 6px 3px grey)');
    setTimeout(function() {
      $('nav img').css('filter', 'drop-shadow(2px 2px 0px grey)');
    }, delay);
  }, delay * 2);
};


/**
 * Animate the 'new tweet' section toggle with sliding effect
 */
const logoOpenNewTweet = function() {

  $('nav div').on('click', function() {
    $('#new-tweet').slideToggle(500);
    $('#tweet-text').focus();
  });

};

/**
 * Animate text 'Write new tweet' near the bird logo to slide side over hovering
 */
const logoTextSlide = function() {

  $('nav div').mouseenter(function() {
    $(this).children('span').stop();
    $(this).children('span').animate({width: 'show'}, 500);
  });

  $('nav div').mouseleave(function() {
    $(this).children('span').stop();
    $(this).children('span').animate({width: 'hide'}, 500);
  });

};


$(document).ready(function() {

  animateLogo();
  logoOpenNewTweet();
  logoTextSlide();
  
});