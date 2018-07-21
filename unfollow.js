
(function() {
	

	window.withdraw = function(wait, limit) {
		function OurForm(confirmationText) {
			var ourForm = this;
		
			var rootDiv = document.createElement('div');
			rootDiv.id = 'LiUnfollow';
			rootDiv.style = "width: 300px; height: auto; background: #f6f7f9; z-index: 9999999999; position: fixed; top: calc(50% - 100px); right: calc(50% - 150px); border: 1px solid #ced0d4; border-radius: 2px; font-family: \'Gill Sans\', \'Gill Sans MT\', \'Myriad Pro\', \'DejaVu Sans Condensed\', Helvetica, Arial, \'sans-serif\'; font-size: medium; font-weight: normal;";
			rootDiv.innerHTML = '<div style="color: aliceblue; background-color: #005E93; border-bottom: 1px solid #ced0d4; padding: 7.5px; text-align: center;">' +
				'    Twitter Unfollower' +
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
		
		let TotalUnfollowed = 0;
		let aborted;
		var forma = new OurForm('Do the search')
		
		forma.show()
		forma.onStart = function() {
			CheckPageEnd(0);
			forma.setProgressMessage('Scrolling')
			var ScrollToBottom = setInterval(function() {
				window.scrollBy(0, 50);
			}, 15);
		
		
			function CheckPageEnd(LastHeight) {
				forma.onAbort = function() {
					aborted = true
					forma.setProgressHTML('Aborthed')
					clearInterval(ScrollToBottom);
		
				};
		
				var CurrentHeight = document.body.scrollHeight;
				if (!(CurrentHeight > LastHeight)) {
					clearInterval(ScrollToBottom);
		
		
				} else setTimeout(function() {
					CheckPageEnd(CurrentHeight);
					let UnfollowButton = document.getElementsByClassName('Grid-cell u-size1of2 u-lg-size1of3 u-mb10')
					TotalUnfollowed = UnfollowButton.length
					if (!aborted) {
						forma.distroy()
						// Creating new form
		
						iterateOver(UnfollowButton)
					}
				}, 3000);
			}
		
			function iterateOver(elements) {
				let num_to_unfollow = 0
		
				for (let profile_card of elements) {
		
					if (profile_card
						.querySelector('.FollowStatus') === null) {
						// user doesnt follow you, so click on unfollow button
						num_to_unfollow += 1
						let button = profile_card
							.querySelector('.user-actions-follow-button')
						
					}

					
					
		
				}
				// Creating new form 
				var forma2 = new OurForm(`<p>Number of unfollowers: ${num_to_unfollow}</p><p>I want to unfollow <input placeholder="50 for example" id="unfollow_ammout" type="text"><span>of them. Start unfollowing?</span>
		`)
		
				forma2
					.show()
					
				let aborted2 = false
				forma2.onStart = function() {
					let unfollow_ammout = document
						.getElementById('unfollow_ammout')
					unfollow_ammout = parseInt(unfollow_ammout
						.value)
		
					forma2.setProgressHTML(`<p>${num_to_unfollow} remains to unfollow. The waiting time between action is ${wait}ms, and the limit of those actions is ${limit}.</p>`)
					unfollowProccess()
		
					function unfollowProccess() {
						//Unfollow process
						//Every 2 seconds, the program will unfollow person and update the user
						var myVar = setInterval(myTimer, wait);
						var counter1 = 0
		
						function myTimer() {
							if(counter1 === limit) {
								myStopFunction()
								// Printing that the job is complete
								forma2	
									.setProgressHTML(`<p>You have reached the limit of the actions. You may close the window.</p>`)
								forma2
									.finished()
								return	
							}
							if ( (counter1 === unfollow_ammout) && (!aborted2) ) {
								myStopFunction()
								// Printing that the job is complete
								forma2	
									.setProgressHTML(`<p>The task is now complete. You may close the window.</p>`)
								forma2
									.finished()
							} else {
								// If the person doesnt follow you
		
								if (!(elements[counter1]
												.querySelector('.FollowStatus'))) {
		
									elements[counter1]
										.querySelector('.user-actions-follow-button')
										.click()
		
									forma2
										.setProgressHTML(`${counter1 + 1} person unfollwed.`)
								}
								counter1 += 1
							}
		
						}
		
						function myStopFunction() {
							clearInterval(myVar);
						}
					}
		
				}
				forma2
					.onAbort = function() {
						// Setting aborted2 to false to stop the procedure in onStart method
						
						aborted2 = true
						forma2.setProgressHTML(`You have canceled the program.`)
						forma2.finished()
					}
			}
		
		}
		
	};
})();
