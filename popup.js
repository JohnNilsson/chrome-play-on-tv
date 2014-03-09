(function(console,window,document,$runtime,$tabs){
	"use strict";

	console.debug("popup.js");

	function createStreamList(streams)
	{
		var ul = document.createElement("ul");
		ul.id = "streams";
		streams.forEach(function (stream){
			var li = document.createElement("li");
			var a = document.createElement("a");
			a.href = stream;
			a.appendChild(document.createTextNode(stream));
			li.appendChild(a);
			ul.appendChild(li);
		});
		return ul;
	}

	function renderStreams(streams)
	{
		console.debug("renderStreams");
		var old = document.getElementById("streams");
		document.body.replaceChild(createStreamList(streams),old);
	}

	window.onload = function()
	{
		console.debug("window.onload");
		$tabs.query({ active: true, currentWindow: true }, function (tabs) {
			console.debug("tabs.query");
	    	$tabs.sendMessage(tabs[0].id, "SendStreams", function (response) {
	    		console.debug("SendStreams response");
	    		renderStreams(response.streams);
	    	});
	    });
	};


})(console,window,document,chrome.runtime,chrome.tabs);