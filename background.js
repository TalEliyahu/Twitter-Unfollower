var actionsByMsgs = {
	follow_followers: {
		url: 'https://twitter.com/followers',
		code: 'follow_followers();',
	},
	unfollow_all: {
		url: '',
		code: 'unfollow_all();',
	},
	follow_all: {
		url: '',
		code: 'follow_all();',
	},
	like_all: {
		url: '',
		code: 'like_all();',
	},
	retweet_all: {
		url: '',
		code: 'retweet_all();',
	},
	unfollow_unfollowers: {
		url: 'https://twitter.com/following/',
		code: 'withdraw();',
	},
};

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (sender.id !== chrome.runtime.id)
		return;

	var action = actionsByMsgs[request.msg];
	if (!action){
		return console.log('Unexpected request message: "' + request.msg + '"');
	}
	
	if( action.code === 'follow_followers();')	{
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function(tabs) {
			chrome.tabs.update(tabs[0].id, {url: action.url}, function(updatedTab) {
				function injectScript() {
					chrome.tabs.executeScript(
						updatedTab.id, 
						{file: 'follow.js'}, 
						function(executedScriptResults) {
							// Get limit and call witdraw(limit)
							
							chrome.storage.sync.get(['wait', 'limit'], function(result){
								var wait = result.wait;
								if(typeof wait === 'undefined'){
									wait = '800';
								}
								var limit = result.limit;
								if(typeof limit === 'undefined'){
									limit = '1000';
								}
								var call_function = `follow_all('Follow', ${wait}, ${limit})`
								console.log(call_function)
								chrome.tabs.executeScript(null, {code: call_function });
							});
							
						}
					);
				}
				if (updatedTab.status === 'complete')
					injectScript();
				else
					chrome.tabs.onUpdated.addListener(function listener(updatedTabId, changeInfo, tab) {
						if (updatedTabId === updatedTab.id && changeInfo.status === 'complete') {
							chrome.tabs.onUpdated.removeListener(listener);
							injectScript();
						}
					});
			});
		});
	}

	if( action.code === 'unfollow_all();') {
		chrome.tabs.executeScript(null, {file: 'follow.js'}, (executedScriptResults)=>{
			// Get limit and call witdraw(limit)
			chrome.storage.sync.get(['wait', 'limit'], function(result){
				var wait = result.wait;
				if(typeof wait === 'undefined'){
					wait = '800';
				}
				var limit = result.limit;
				if(typeof limit === 'undefined'){
					limit = '1000';
				}
				var call_function = `follow_all('Following', ${wait}, ${limit})`
				console.log(call_function)
				chrome.tabs.executeScript(null, {code: call_function });
			});
		})
		return
	}	
	
	if( action.code === 'follow_all();') {
		chrome.tabs.executeScript(null, {file: 'follow.js'}, (executedScriptResults)=>{
			// Get limit and call witdraw(limit)
			chrome.storage.sync.get(['wait', 'limit'], function(result){
				var wait = result.wait;
				if(typeof wait === 'undefined'){
					wait = '800';
				}
				var limit = result.limit;
				if(typeof limit === 'undefined'){
					limit = '1000';
				}
				var call_function = `follow_all('Follow', ${wait}, ${limit})`
				console.log(call_function)
				chrome.tabs.executeScript(null, {code: call_function });
			});
		})
		return
	}	

	if( action.code === 'like_all();') {
		chrome.tabs.executeScript(null, {file: 'follow.js'}, (executedScriptResults)=>{
			// Get limit and call witdraw(limit)
			chrome.storage.sync.get(['wait', 'limit'], function(result){
				var wait = result.wait;
				if(typeof wait === 'undefined'){
					wait = '800';
				}
				var limit = result.limit;
				if(typeof limit === 'undefined'){
					limit = '1000';
				}
				var call_function = `like_all(${wait}, ${limit})`
				chrome.tabs.executeScript(null, {code: call_function });
			});
		})
		return
	}			

	if( action.code === 'retweet_all();')	{
		chrome.tabs.executeScript(null, {file: 'follow.js'}, (executedScriptResults)=>{
			// Get limit and call witdraw(limit)
			chrome.storage.sync.get(['wait', 'limit'], function(result){
				var wait = result.wait;
				if(typeof wait === 'undefined'){
					wait = '800';
				}
				var limit = result.limit;
				if(typeof limit === 'undefined'){
					limit = '1000';
				}
				var call_function = `retweet_all(${wait}, ${limit})`
				chrome.tabs.executeScript(null, {code: call_function });
			});
		})
		return
	}
	
	if( action.code === 'withdraw();')	{
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function(tabs) {
			chrome.tabs.update(tabs[0].id, {url: action.url}, function(updatedTab) {
				function injectScript() {
					chrome.tabs.executeScript(
						updatedTab.id, 
						{file: 'unfollow.js'}, 
						function(executedScriptResults) {
							// Get limit and call witdraw(limit)
							
							chrome.storage.sync.get(['wait', 'limit'], function(result){
								var wait = result.wait;
								if(typeof wait === 'undefined'){
									wait = '800';
								}
								var limit = result.limit;
								if(typeof limit === 'undefined'){
									limit = '1000';
								}
								var call_function = `withdraw(${wait}, ${limit})`
								chrome.tabs.executeScript(updatedTab.id, {code: call_function });
							});
						}
					);
				}
				if (updatedTab.status === 'complete')
					injectScript();
				else
					chrome.tabs.onUpdated.addListener(function listener(updatedTabId, changeInfo, tab) {
						if (updatedTabId === updatedTab.id && changeInfo.status === 'complete') {
							chrome.tabs.onUpdated.removeListener(listener);
							injectScript();
						}
					});
			});
		});
	}
	
});
