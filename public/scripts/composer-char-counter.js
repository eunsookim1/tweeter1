// const countChar = function() {
//   const len = $('text').val().length;
//   $('#counter').text(len + ' characters');
// };

$('document').ready(function(e) { //Calls up when the DOM (document object model) is ready
  //alert("hello");

  //TextBox Event
  // eslint-disable-next-line space-before-blocks
  $('#tweet-text').keypress(function(e){
    let maxChars = 140;
    let tweetText = $('#tweet-text').val();
    let totalChars = tweetText.length;
    let remainingChars = maxChars - totalChars;
    //If the remaining characters are still greater than zero
    if (remainingChars > 0) {
      $('#counter').text(remainingChars);
      $('#counter').text(remainingChars).css("color", "#545149");
    
    } else {
      $('#counter').text(remainingChars);
      $('#counter').css("color", "red");
    }

  });
});


// $("#tweet-text").on('click', function() {
//   console.log(this); //The this keyword is a reference to the button
// });
// });

// $("#tweet-text").on('click', () => {
//   console.log(this); //The this keyword here refers to something else!
// });
// });