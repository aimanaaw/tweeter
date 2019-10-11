/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// The escape function ensures a user does not enter malicious code
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
// This function creates a tweet element
 const createTweetElement = function(tweet) {
   const HTMLmarkup =`
   <article class="tweetHeader">
              <header>
                <div>
                <span class="face">
                <img src="${tweet.user.avatars}"></span>
                <span class="userID"> ${tweet.user.handle}</span>
                </div>
                <div>
                <span class="userName">${tweet.user.name}</span>
                </div>

              </header>
              
                <div class="tweet" name="text" >${escape(tweet.content.text)}</div>
                <footer>
                  <div>
                  <span class="tweetDate">${tweet.created_at}</span>
                  <span class="tweetIcons">
                  <img src="/images/flag.png">
                  <img src="/images/like.png">
                  <img src="/images/retweet.png">
                  </span>
                  </div>
                </footer>
            </article>`
            return HTMLmarkup;
 }
// This function called the createTweetElement for every tweet stored in the database. It loops over the data stored and generates a tweet. The tweets are pushed to the top so they are displayed from most recent to the older tweets
 const renderTweets = function(data) {
   for (let eachTweet of data) {
     const $tweet = createTweetElement(eachTweet);
     $('#previousTweetsContainer').prepend($tweet);
   }
 }


$("document").ready(function() {
// The POST Request
  const createATweet = async (data) => {
    try{
      const response = await $.ajax( {
        url: `/tweets`,
        type: 'POST',
        data
      })
      renderTweets(response);
      } catch (error) {
        console.error(error);
      }
    }
    // The GET Request
      const loadTweets = async () => {
        try{
          const response = await $.ajax({
            url: `/tweets`,
            type: 'GET',
            dataType: 'JSON'
          })
          // console.log(response);
          renderTweets(response);
        } catch (error) {
          console.error(error);
        }
      }
// The button click action to compose a tweet
  $(".tweetButton").click(function(event) {
    event.preventDefault();
    let $form = $("form").serialize();
    let $formField = $(".textBox").val();
    let $formFieldLength = $(".textBox").val().length;
    if ($formField === "") {
      $("#incompleteTweet").slideDown("slow");
      return;
    } else {
      $("#incompleteTweet").slideUp("slow");
    }
    if ($formFieldLength > 140) {
    $("#oversizedTweet").slideDown("slow");
    return;
    } else {
      $("#oversizedTweet").slideUp("slow");
    }
    if ($formFieldLength > 0 && $formFieldLength <= 140) {
      $("#incompleteTweet").slideUp("slow");
      $("#oversizedTweet").slideUp("slow");
    }
    createATweet($form);
    loadTweets();
    $(".textBox").val('');
    $(".counter").text('140');
  })
  loadTweets();
// The button that is responsible for displaying the tweet composition box
  $("#doubleArrow").click(function () {
    $("#slide").slideToggle("slow");
    $(".textBox").focus();
  })

})
