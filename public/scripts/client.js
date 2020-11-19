/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Aragorn",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@TheKing"
    },
    "content": {
      "text": "In a hole in the ground there lived a hobbit"
    },
    "created_at": 1600720039778
  },
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const timeAgo = function(date) {
  const timeMap = { 
    'year' : 24 * 60 * 60 * 1000 * 365,
    'month' : 24 * 60 * 60 * 1000 * 30.42,
    'day' : 24 * 60 * 60 * 1000,
    'hour' : 60 * 60 * 1000,
    'minute' : 60 * 1000,
    'order': ['year', 'month', 'day', 'hour', 'minute']
  }
  const delta = Math.floor((Date.now() - date));
  for (const unit of timeMap.order) {
    const num = Math.floor(delta / timeMap[unit]);
    if (num >= 1) return `${num} ${unit}${(num === 1) ? '' : 's'} ago`
  }
  return 'now';
  //return Math.floor((Date.now() - date) / (1000 * 3600 * 24))
}

const createTweetElement = function(data) {
  const { user, content, created_at } = data;

  return `
    <article>
      <header>
        <div class="author-name"><img src="${user.avatars}">${user.name}</div>
        <div class="author-account">${user.handle}</div>
      </header>
      <p>${content.text}</p>
      <footer>
        <div class="date-ago">${timeAgo(data.created_at)}</div>
        <div><img src="/images/tweet-footer-buttons.png"></div>
      </footer>
    </article>
  `
};

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    $('#tweet-feed').prepend(createTweetElement(tweet));
    applyTweetHoverEffects($('#tweet-feed article:first-child'));
  }
}

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
}

$(document).ready(function() {

  // Validation of input form contents
  const validTweet = function() {
    const tweetLength = $('#tweet-text').val().length;
    if ( tweetLength === 0) {
      alert('The tweet form cannot be empty!');
      return false;
    }
    if ( tweetLength > 140 ) {
      alert('The tweet cannot be more than 140 characters long!');
      return false;
    }
    return true;
  };
  
  // Load existing tweets
  const loadTweets = function() {
    $.ajax('/tweets/', { method: 'GET' })
      .then(function(res) {
        renderTweets(res);
      })
  }

  loadTweets();

  // Actions after the new tweet submition
  $('form').on('submit', function(event) {
    event.preventDefault();
    const tweet = $(this).serialize();
    
    if (validTweet) {
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
});