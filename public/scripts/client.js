/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


 /**
  * Check if the tweet fits the 1-140 chars requirement.
  * If check fails - slide down an appropriade error message
  * @param {*} str - tweet text
  */
 const validTweet = function(str) {

  const tweetLength = str.length;
  if ( str.length === 0) {
    $('mark').text('The tweet form cannot be empty!').slideDown();
    setTimeout(() => $('mark').slideUp(), 4000)
    return false;
  }
  if ( str.length > 140 ) {
    $('mark').text('The tweet is too long!').slideDown();
    setTimeout(() => $('mark').slideUp(), 4000)
    return false;
  }
  return true;

};


/**
 * Load tweets currently existing in db
 */
const loadTweets = function() {

  $.ajax('/tweets/', { method: 'GET' })
    .then(function(res) {
      renderTweets(res);
    })

};


/**
 * Show shadow effect and reveal the user account
 * when hovering over a separate tweet in the feed
 * @param {*} $tweet - a particular tweet to apply effects to
 */
const applyTweetHoverEffects = function($tweet) {

  $tweet.hover(function() {
    $(this).css('box-shadow', '10px 10px 0 0 lightsteelblue');
    $(this).children('header')
           .children('div.author-account')
           .css('color', 'lightsteelblue');
  },function() {
    $(this).css('box-shadow', '');
    $(this).children('header')
           .children('div.author-account')
           .css('color', '#f4f1ec');
  })

};


/**
 * Calculate the time difference between the current moment and a given one.
 * Returns result as n minutes/hours/days/months/years ago,
 * supports singular form of units.
 * If difference is less than a minute - returns 'now'
 * @param {*} date - a Date (in ms) to calculate a difference with
 */
const timeAgo = function(date) {

  const timeMap = { 
    'year' : 24 * 60 * 60 * 1000 * 365,
    'month' : 24 * 60 * 60 * 1000 * 30.42,
    'day' : 24 * 60 * 60 * 1000,
    'hour' : 60 * 60 * 1000,
    'minute' : 60 * 1000,
    'order': ['year', 'month', 'day', 'hour', 'minute']
  };

  const delta = Math.floor((Date.now() - date));
  for (const unit of timeMap.order) {
    const num = Math.floor(delta / timeMap[unit]);
    if (num >= 1) return `${num} ${unit}${(num === 1) ? '' : 's'} ago`
  }
  return 'now';

};


/**
 * Replace 'dangerous' characters which could possibly
 * be a part of malicious code with special char HTML codes
 * @param {*} str - untrusted text string to disarm
 */
const disarm = function(str) {

  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;

};


/**
 * Compose a new tweet element for the feed using
 * a particular tweet-related data from the server
 * @param {*} data
 *  */
const createTweetElement = function(data) {

  const { user, content, created_at } = data;

  return `
    <article>
      <header>
        <div class="author-name"><img src="${user.avatars}">${user.name}</div>
        <div class="author-account">${user.handle}</div>
      </header>
      <p>${disarm(content.text)}</p>
      <footer>
        <div class="date-ago">${timeAgo(data.created_at)}</div>
        <div><img src="/images/tweet-footer-buttons.png"></div>
      </footer>
    </article>
  `
};


/**
 * Load a set of tweets received as an array of database objects
 * @param {*} tweets - array of objects
 */
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    $('#tweet-feed').prepend(createTweetElement(tweet));
    applyTweetHoverEffects($('#tweet-feed article:first-child'));
  }
};


/**
 * Actions after the new tweet submition attempt
 * 1. Stop the 'tweet' button from submitting
 * 2. Validate tweet text for length 1-140 chars
 * 3. Send a new tweet text to the server
 * 4. Load the tweets db from the server
 * 5. Render the last db entry (the new tweet) without resreshing the feed
 */
const submitNewTweet = function() {
  
  $('form').on('submit', function(e) {
    e.preventDefault();
    const tweet = $(this).serialize();
    
    if (validTweet($('#tweet-text').val())) {
      $('#tweet-text').val('')
      $.ajax(`/tweets/`, { method: 'POST', data: tweet })
  
      .then(function() {
        return $.ajax(`/tweets/`, { method: 'GET'})
      })
      // tweets are date-sorted, so take last one to add to the page
      .then(function(tweets) {
        renderTweets( [ tweets.pop() ] );
      })
    } 
  })

};


$(document).ready(function() {

  loadTweets();
  submitNewTweet();

});