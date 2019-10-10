/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

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

 const renderTweets = function(data) {
   for (let eachTweet of data) {
     const $tweet = createTweetElement(eachTweet);
    //  console.log($tweet);
     $('#tweets-container').prepend($tweet);
   }

 }

// renderTweets(data);

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
// The button click action
  $(".tweetButton").click(function(event) {
    event.preventDefault();
    let $form = $("form").serialize();
    let $formField = $(".textBox").val();
    let $formFieldLength = $(".textBox").val().length;
    if ($formField === "") {
      console.log("XX")
      $("#incompleteTweet").show("slow");
      return;
    } else {
      $("#incompleteTweet").hide("slow");
    }
    if ($formFieldLength > 140) {
    $("#oversizedTweet").show("slow");
    return;
    } else {
      $("#oversizedTweet").hide("slow");
    }
    if ($formFieldLength > 0 && $formFieldLength <= 140) {
      $("#incompleteTweet").hide("slow");
      $("#oversizedTweet").hide("slow");
    }
    createATweet($form);
    loadTweets();
  })
  loadTweets();

  $(".arrow").click(function () {
    $("#slide").slideToggle("slow");
    $(".textBox").focus();
  })

})
