 chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
 	chrome.tabs.query({active: true, url: "https://vk.com/*"}, function (tab) { 
		var tab = tab[0];	
	 	if(tab && tabId == tab.id)
	 		chrome.tabs.sendMessage(tab.id, changeInfo.audible);
	 	});
  })
