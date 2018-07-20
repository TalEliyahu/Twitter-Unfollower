You will be greeted with this window that has clear instructions. One thing to notice is the gray mechanical wheel button that we suggest to visit before you run any of this extension features.

![N|Solid](https://i.imgur.com/TwoUx7P.png)
# Listed Features!
  - Follow up
  - Un-follow all
  - Follow all
  - Like all!
  - Retweet all!
  - Unfollow unfollowers

##### Follow up
This opens new in same window, the `/followers` Twitter page and triggers the automatic follow script, that will run using the configuration you have set in option setup (mechanical wheel button).

Working logic can be found in : `follow.js` with a method `follow_all`. Loops through every profile, checks if it has button with a text `Follow` and clicks on it.

##### Un-follow all & Follow all
When you are on some page that has listings of profiles (when searching for something for example), you can chose one of those two methods and start applying it to the page. If You chose `Follow all`, then you will follow all profiles that are the page. 

Note: These features will automatically scroll down the page to look for more profiles.
Working logic can be found in: `following.js` with a method `follow_all`.  Loops through every profile, checks if it has button with a text `Follow` or `Following` depending on what you have chose to and clicks on it. 

##### Like all & Retweet all
When you are on some page that has tweets of other people, you can like them all and retweet them all, automatically. Those options will not automatically scroll your page down, and do that for infinite time, will just do that operation for every tweet present `currently` on the page.

Working logic can be found in: `following.js` with a method `like_all` or `retweet_all`. Loop through every tweet on page and clicks on Like or Retweet button. No wait time is aplied here. 

##### Unfollow unfollowers
As soon as you click the extension icon, it takes you to your twitter account's following section. A confirmation pops up, if you click OK the page starts to scroll down and load all the people you follow. After all the users are loaded it counts how many people don't follow you back instantly and prints out the number and as how many of these people you want to unfollow. You can always click the cancel button to cancel the process and that's it! Now you can unfollow those who don't follow you back!

Working logic can be found in: `unfollow.js` with a method `withdraw`. Opens in same tab `/followers` page and searches the people that has `Follows you` info bar in the profile. If it doesn't, the click method is applied on the button `Following` which makes them being `Unfollowed`. 
Note: This will automatically scroll down the page, unless you stop it or it reaches the end of the list. 

