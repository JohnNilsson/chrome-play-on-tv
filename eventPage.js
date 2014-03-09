(function(console,$runtime,$declarativeWebRequest,$pageAction,$tabs){
	"use strict";

	function installRequestFilter(){
		$declarativeWebRequest.onRequest.removeRules(undefined, function(){
			$declarativeWebRequest.onRequest.addRules([{
				conditions:[
					new $declarativeWebRequest.RequestMatcher({
						contentType: ["video/mp4"],
						stages: [ "onHeadersReceived"]
					})
				],
				actions: [
					new $declarativeWebRequest.SendMessageToExtension({
						message: ""
					})
				]
			}]);
		});
	}

	function onRequestMatch(details){
		var tabId = details.tabId,
			url   = details.url;

		if(tabId >= 0)
		{
			$pageAction.show(tabId);
			$tabs.sendMessage(tabId,url);
		}
	}

	$runtime.onInstalled.addListener(installRequestFilter);
	$declarativeWebRequest.onMessage.addListener(onRequestMatch);
})(
	console,
	chrome.runtime,
	chrome.declarativeWebRequest,
	chrome.pageAction,
	chrome.tabs
);
