(function(){
  window.like_all = function(wait, limit){
    
    var inputs = document.getElementsByClassName('HeartAnimation');
    for(var i=0; i<inputs.length;i++) 
    { 
      inputs[i].click()
    }
    
  }
  window.retweet_all = function(wait, limit){
    $('.ProfileTweet-actionButton.js-actionButton.js-actionRetweet').click();
  }
})()