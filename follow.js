(function () {
  function OurForm(confirmationText) {
    var ourForm = this;
  
    var rootDiv = document.createElement('div');
    rootDiv.id = 'LiUnfollow';
    rootDiv.style = "width: 300px; height: auto; background: #f6f7f9; z-index: 9999999999; position: fixed; top: calc(50% - 100px); right: calc(50% - 150px); border: 1px solid #ced0d4; border-radius: 2px; font-family: \'Gill Sans\', \'Gill Sans MT\', \'Myriad Pro\', \'DejaVu Sans Condensed\', Helvetica, Arial, \'sans-serif\'; font-size: medium; font-weight: normal;";
    rootDiv.innerHTML = '<div style="color: aliceblue; background-color: #005E93; border-bottom: 1px solid #ced0d4; padding: 7.5px; text-align: center;">' +
      '    LinkedIn Unfollower' +
      '</div>' +
      '<div name="Confirmation">' +
      '    <div style="font-size: 14px; color: #4b4f56; margin: 7.5px; display: block; cursor: default;">' + confirmationText + '</div>' +
      '    <div style="background-color: #005E93; border-top: 1px solid #ced0d4; padding: 7.5px;">' +
      '        <button type="button" name="Start" ' +
      '        style="background-color: #f6f7f9; color: #4b4f56; border: 1px solid #ced0d4; padding: 0 8px; line-height: 27.5px; font-weight: normal; font-family: \'Gill Sans\', \'Gill Sans MT\', \'Myriad Pro\', \'DejaVu Sans Condensed\', Helvetica, Arial, \'sans-serif\'; font-size: 14px;" ' +
      '        >Yes</button>' +
      '        <button name="Close" ' +
      '        style="background-color: #f6f7f9; color: #4b4f56; border: 1px solid #ced0d4; padding: 0 8px; line-height: 27.5px; font-weight: normal; font-family: \'Gill Sans\', \'Gill Sans MT\', \'Myriad Pro\', \'DejaVu Sans Condensed\', Helvetica, Arial, \'sans-serif\'; font-size: 14px; margin-left: 7.5px;" ' +
      '        >No</button>' +
      '    </div>' +
      '</div>' +
      '<div name="Working" style="display: none;">' +
      '    <div name="Message" style="font-size: 14px; color: #4b4f56; margin: 7.5px; cursor: default; display: block;"></div>' +
      '    <div style="background-color: #005E93; border-top: 1px solid #ced0d4; padding: 7.5px;">' +
      '        <button name="Close" ' +
      '        style="background-color: #f6f7f9; color: #4b4f56; border: 1px solid #ced0d4; padding: 0 8px; line-height: 27.5px; font-weight: normal; font-family: \'Gill Sans\', \'Gill Sans MT\', \'Myriad Pro\', \'DejaVu Sans Condensed\', Helvetica, Arial, \'sans-serif\'; font-size: 14px;" ' +
      '        >Stop</button>' +
      '    </div>' +
      '</div>' +
      '<div name="Finished" style="display: none;">' +
      '    <div name="Message" style="font-size: 14px; color: #4b4f56; margin: 7.5px; cursor: default; display: block;"></div>' +
      '    <div style="background-color: #005E93; border-top: 1px solid #ced0d4; padding: 7.5px;">' +
      '        <button name="Close" ' +
      '        style="background-color: #f6f7f9; color: #4b4f56; border: 1px solid #ced0d4; padding: 0 8px; line-height: 27.5px; font-weight: normal; font-family: \'Gill Sans\', \'Gill Sans MT\', \'Myriad Pro\', \'DejaVu Sans Condensed\', Helvetica, Arial, \'sans-serif\'; font-size: 14px;" ' +
      '        >Close</button>' +
      '    </div>' +
      '</div>';
    var confirmationDiv = rootDiv.querySelector('[name=Confirmation]');
    var workingDiv = rootDiv.querySelector('[name=Working]');
    var finishedDiv = rootDiv.querySelector('[name=Finished]');
  
    ourForm.onStart = function() {};
    confirmationDiv.querySelector('[name=Start]').addEventListener('click', function(e) {
      confirmationDiv.style.display = 'none';
      workingDiv.style.display = 'block';
      ourForm.onStart();
    });
    confirmationDiv.querySelector('[name=Close]').addEventListener('click', function(e) {
      close();
    });
  
    ourForm.onAbort = function() {};
    workingDiv.querySelector('[name=Close]').addEventListener('click', function(e) {
      ourForm.onAbort();
      ourForm.finished();
    });
  
    finishedDiv.querySelector('[name=Close]').addEventListener('click', function(e) {
      close();
    });
  
    ourForm.setProgressMessage = function(messageText) {
      workingDiv.querySelector('[name=Message]').innerText = messageText;
    };
  
    ourForm.setProgressHTML = function(messageText) {
      workingDiv.querySelector('[name=Message]').innerHTML = messageText;
    };
  
    ourForm.finished = function() {
      confirmationDiv.style.display = 'none';
      workingDiv.style.display = 'none';
      finishedDiv.querySelector('[name=Message]').innerText = workingDiv.querySelector('[name=Message]').innerText;
      finishedDiv.style.display = 'block';
    };
  
    ourForm.show = function() {
      document.body.appendChild(rootDiv);
    };
  
    function close() {
      document.body.removeChild(rootDiv);
    }
    ourForm.distroy = function() {
      document.body.removeChild(rootDiv);
    }
  }

  window.follow_all = function (follow, wait, limit) {
    
    let forma_welcome_text = `<p>Start applying action on this page? Note: There is delay of ${wait}ms between action, and has a limit of ${limit} number of actions.</p>`
    var forma = new OurForm(forma_welcome_text)
    forma.show()
    forma.onStart = function(){
      search_and_scroll_fun()
      
    }

    function search_and_scroll_fun() {

      var profiler = setInterval(profiler_fun, wait)
      var scroller = setInterval(scroller_fun, 5000)

      forma.onAbort = function(){
        clearInterval(profiler)
        clearInterval(scroller)
      }

      var end_profile_num = document
                              .getElementsByClassName('ProfileCard-content')
                              .length
      var current_profile_num = 0

      function profiler_fun() {
        if (current_profile_num < end_profile_num && current_profile_num < limit) {

          var profile = document
                          .getElementsByClassName('ProfileCard-content')[current_profile_num]
          var button = profile
                        .getElementsByClassName('user-actions-follow-button js-follow-btn follow-button')[0]                 
          var button_txt = button
                            .innerText
          var split = button_txt
            .split(" ")[0] // "Follow" or "Unfollow"

          if (split === follow && split === 'Follow') {
            button.click()
            let message = `<p>Accounts followed: ${current_profile_num}.</p>`
            forma.setProgressHTML(message)
          }else if(split === follow && split === 'Following'){
            button.click()
            let message = `<p>Accounts unfollowed: ${current_profile_num}.</p>`
            forma.setProgressHTML(message)
          }

          current_profile_num += 1
        }
      }

      function scroller_fun() {
        window
          .scrollBy(0, document
                        .body
                        .scrollHeight)

        setTimeout(() => {
          end_profile_num = document
                              .getElementsByClassName('ProfileCard-content')
                              .length

        }, 5000)

      }
    }

    
  }

  window.like_all = function (wait, limit) {

    var inputs = document.getElementsByClassName('HeartAnimation');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i]
        .click()
    }

  }
  window.retweet_all = function (wait, limit) {
    $('.ProfileTweet-actionButton.js-actionButton.js-actionRetweet')
      .click();
  }
})()