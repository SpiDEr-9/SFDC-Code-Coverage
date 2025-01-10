oninit();
function oninit(){
	chrome.storage.sync.get('toggle', function(data) {
		console.log('data>>>>',data);
		document.getElementById("toggle").checked=data.toggle;
	});
}
$( document ).ready(function() {
	$( document ).on("click","#toggle", function(){
		var value=document.getElementById("toggle").checked;
		chrome.storage.sync.set({'toggle': value}, function() {	
		});
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {type:"toggled"}, function(response){
				
			});
		});
	});
});
