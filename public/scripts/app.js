/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
              
                <div class="tweet" name="text" >${tweet.content.text}</div>
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

 const renderTweets = function(data) {
   for (let eachTweet of data) {

     const $tweet = createTweetElement(eachTweet);
    //  console.log($tweet);
     $('#tweets-container').append($tweet);
   }

 }

// renderTweets(data);

$("document").ready(function() {
  $(".tweetButton").click(function(event) {
    event.preventDefault();
    let $form = $("form").serialize();
    let $formField = $(".textBox").val();
    if ($formField === "") {
      alert("Please enter your tweet");
      return;
    } else if ($formField.length > 140) {
      alert("You have entered more than 140 character");
      return;
    }
    
    console.log($formField);
  })

  const loadTweets = async () => {
    try{
      const response = await $.ajax({
        url: `/tweets`,
        type: 'GET',
        dataType: 'JSON'
      })
      renderTweets(response);
    } catch (error) {
      console.error(error);
    }
  }
  loadTweets();
})
