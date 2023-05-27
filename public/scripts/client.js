/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$("document").ready(function() {
  $(".error-message").hide();

  const renderTweets = function(tweets) {
    $("#tweets-container").empty();

    for (const tweet of tweets) {
      let tweetElement = createTweetElement(tweet);
      $("#tweets-container").prepend(tweetElement);
    }
  };

  const createTweetElement = function(tweet) {
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const $tweet = `<article class="article-tweet-header">
  <header class="user">
    <span class="iconName">
      <span>
      <img class="avatar" alt="profile-picture" src=${tweet.user.avatars}/>
      </span>
      <h3 class="userName">${tweet.user.name}</h3>
    </span>
      <h3 id="user">${tweet.user.handle}</h3>
  </header>
  
    <p class="oldTweet">${escape(tweet.content.text)}</p>
    <footer>
      <div>${timeago.format(tweet.created_at)}</div>

      <div>
        <i class="fa-solid fa-flag customButton"></i>
        <i class="fa-solid fa-retweet customButton"></i>
        <i class="fa-solid fa-heart customButton"></i>
      </div>
    </footer>
  </article>`;

    return $tweet;
  };

  // renderTweets(data);
  const loadTweets = function() {
    $.get("/tweets").then(function(data) {
      renderTweets(data);
    });
  };

  $(".create-tweet").on("submit", function(event) {
    event.preventDefault();
    $(".error-message").hide();

    const newTweet = $("#tweet-text").val();
    // If the tweet input is empty
    if (newTweet === "" || newTweet === null) {
      if ($(".error-message").first().is(":hidden")) {
        return $(".error-message")
          .text("⚠️THE TWEET AREA IS EMPTY!⚠️")
          .slideDown("slow");
      }
    }

    // When the tweet exceeds 140 chars
    if (newTweet.length > 140) {
      if ($(".error-message").first().is(":hidden")) {
        return $(".error-message")
          .text("⚠️THE TWEET EXCEEDS 140 CHARACTER LIMIT!⚠️")
          .slideDown("slow");
      }
    } else {
      $.post("/tweets", $(".create-tweet").serialize()).then(() => {
        $("#counter").text("140");
        $(".error-message").hide();

        $(this)
          .find("input[type='text']")
          .val(() => {
            return $(this).attr("placeholder");
          });
        this.reset();

        loadTweets();
      });
    }
  });

  loadTweets();
});
