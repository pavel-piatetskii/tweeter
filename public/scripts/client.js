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

const daysAgo = function(date) {
  return Math.floor((Date.now() - date) / (1000 * 3600 * 24))
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
        <div class="date-ago">${daysAgo(data.created_at)} days ago</div>
        <div><img src="/images/tweet-footer-buttons.png"></div>
      </footer>
    </article>
  `
};

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    $('#tweet-feed').append(createTweetElement(tweet));
    applyTweetHoverEffects($('#tweet-feed article:last-child'));
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

  renderTweets(data);

  $('form').on('submit', function(event) {
    event.preventDefault();
    // console.log($(this).serialize())
    const tweet = $(this).serialize()
    $.ajax(`/tweets/`, { method: 'POST', body: tweet })
  })

})