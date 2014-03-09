(function(onMessage){
	"use strict";

	var streams = [];

	onMessage.addListener(
		function(request, sender, sendResponse){
			console.log("Message recieved");
			console.log(request);
			if(request === "SendStreams")
				sendResponse({streams: streams});
			else
				streams.push(request);
		}
	);


})(chrome.runtime.onMessage);