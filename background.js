chrome.action.onClicked.addListener(function(tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currentUrl = tabs[0].url;
        var channelName = extractUsername(currentUrl);

        var apiUrl = 'https://kick.com/api/v1/channels/' + channelName;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.playback_url) {
                    chrome.tabs.create({ url: data.playback_url });
                } else {
                    console.error("playback_url not found in API response");
                }
            })
            .catch(error => {
                console.error("Error fetching API data:", error);
            });
    });
});

function extractUsername(url) {
    var match = url.match(/kick\.com\/([^/]+)/);
    return match ? match[1] : null;
}