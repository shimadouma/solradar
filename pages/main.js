
function zeropad(x) {
    return (x < 10) ? '0' + x : x;
}

function remove(el) {
    var element = el.parentNode;
    element.remove();
}

var linkCount = 0;

function appendTimecodeLink(t) {
    var links = document.getElementById('links');
    var item = document.createElement('li');
    var item_id = `item-${linkCount++}`;
    item.innerHTML = `<code>${ts(t)}  </code><a href="https://youtu.be/${ytid}?t=${t}" target="_blank">https://youtu.be/${ytid}?t=${t}</a> <a onclick="remove(this)">remove</span>`;
    links.appendChild(item);
    return true;
}

function ts(sec) {
    d = new Date(sec * 1000);
    return zeropad(d.getUTCHours()) + ":" +
    zeropad(d.getMinutes()) + ":" +
    zeropad(d.getSeconds());
}

function onClickGraph(e, x, points) {
    console.log("seek to " + x);
    player.seekTo(x, true);
    appendTimecodeLink(x);
}

document.addEventListener("DOMContentLoaded", function() {
    
    g = new Dygraph(
        document.getElementById("graph"),
        // For possible data formats, see http://dygraphs.com/data.html
        // The x-values could also be dates, e.g. "2012/03/15"
        plot_data, {
            // options go here. See http://dygraphs.com/options.html
            legend: 'always',
            showRangeSelector: true,
            xlabel: "timestamp",
            ylabel: "excitement",
            labels: ["time", "excitement"],
            axes: {
                x: {
                    axisLabelWidth: 70,
                    axisLabelFormatter: function(d, gran) {
                        return ts(d);
                    }
                }
            },
            clickCallback: onClickGraph
        });
    });
    
    
    // setup youtube player
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '360',
            width: '640',
            videoId: ytid,
            events: {
                'onReady': function(e) {  }
            }
        });
    }
    