/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// import { format } from "timeago.js";

// const days = function (date) {
//   const timeWritten = new Date(date);
//   const today = new Date();

//   const difference = today - timeWritten;
//   const totalDays = Math.ceil(difference / (1000 * 3600 * 24));
//   return totalDays;
// };

$("document").ready(function () {
  $(".error-message").hide();
  // const data = [
  //   {
  //     user: {
  //       name: "Newton",
  //       avatars: "https://i.imgur.com/73hZDYK.png",
  //       handle: "@SirIsaac",
  //     },
  //     content: {
  //       text: "If I have seen further it is by standing on the shoulders of giants",
  //     },
  //     created_at: 1461116232227,
  //   },
  //   {
  //     user: {
  //       name: "Descartes",
  //       avatars: "https://i.imgur.com/nlhLi3I.png",
  //       handle: "@rd",
  //     },
  //     content: {
  //       text: "Je pense , donc je suis",
  //     },
  //     created_at: 1461113959088,
  //   },
  // ];

  const renderTweets = function (tweets) {
    $("#tweets-container").empty();

    for (const tweet of tweets) {
      let tweetElement = createTweetElement(tweet);
      $("#tweets-container").prepend(tweetElement);
    }
  };

  const createTweetElement = function (tweet) {
    const escape = function (str) {
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
  const loadTweets = function () {
    $.get("/tweets").then(function (data) {
      renderTweets(data);
    });
  };

  $(".create-tweet").on("submit", function (event) {
    event.preventDefault();

    // If the tweet input is empty
    if ($("#tweet-text").val() === "" || $("#tweet-text").val() === null) {
      if ($(".error-message").first().is(":hidden")) {
        return $(".error-message")
          .text("⚠️THE TWEET AREA IS EMPTY!⚠️")
          .slideDown("slow");
      }
    }

    // When the tweet exceeds 140 chars
    if ($("#tweet-text").val().length > 140) {
      if ($(".error-message").first().is(":hidden")) {
        return $(".error-message")
          .text("⚠️THE TWEET EXCEEDS 140 CHARACTER LIMIT!⚠️")
          .slideDown("slow");
      }
    }

    $.post("/tweets", $(".create-tweet").serialize()).then(() => {
      $("#counter").text("140");

      $(this)
        .find("input[type='text']")
        .val(() => {
          return $(this).attr("placeholder");
        });
      this.reset();

      loadTweets();
    });
  });

  loadTweets();
});

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

// Need to input the new-tweet into data
// call the function above to push into the ordered tweet containers

// $(function () {
//   const $button = $('#load-more-tweet');
//   $button.on('click', function () {
//     $.ajax(${'#tweet-text'})
//   })
// })

// $("#load-new-tweet").bind("click", function () {
//   alert("User clicked on 'submit'");
// });
