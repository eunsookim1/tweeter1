$("document").ready(function (e) {
  //Calls up when the DOM (document object model) is ready
  const maxChars = 140;
  
  //TextBox Event
  // eslint-disable-next-line space-before-blocks
  $("#tweet-text").keypress(function (e) {
    let tweetText = $("#tweet-text").val();
    let totalChars = tweetText.length;
    let remainingChars = maxChars - totalChars;
    //If the remaining characters are still greater than zero
    if (remainingChars > 0) {
      $("#counter").text(remainingChars);
      $("#counter").text(remainingChars).css("color", "#545149");
    } else {
      $("#counter").text(remainingChars);
      $("#counter").css("color", "red");
    }
  });
});
