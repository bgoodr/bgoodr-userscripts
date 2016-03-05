// ==UserScript==
// @name        Hello World Reading and Modifying HTML Content
// @namespace   https://github.com/bgoodr/bgoodr-userscripts
// @include     http://*.youtube.*
// @include     https://*.youtube.*
// Avoid multiple execution in iFrames: http://stackoverflow.com/questions/4190442/run-a-greasemonkey-script-only-once-per-page-load?rq=1
// @noframes
// @version     1
// ==/UserScript==

// Hello_World_Reading_and_Modifying_HTML_Content.user.js

// Attribution: Originally from: http://hayageek.com/greasemonkey-tutorial/#read-modify

// TODO: View it from https://www.youtube.com/watch?v=CIBIqaeiE2M and it does not show anything.

console.log("window.location.href ", window.location.href);

if(window.location.href.indexOf("v=") > 0) //If it is a valid video
{
    var userName="";
    var title="";
    var userVideos="";
    var views="";
    if(document.getElementById("eow-title"))
        title = document.getElementById("eow-title").textContent;
 
    var as = document.getElementsByTagName("a");
    for(var i=0;i<as.length;i++)
    {
        var cls =as[i].getAttribute("class");
        if(cls)
        {
            GM_log(cls+"<br>");
            if(cls.indexOf("yt-user-name") >= 0)
            {
                userName = as[i].textContent;
            }
            else
            if(cls.indexOf("yt-user-videos") >= 0)
            {
                userVideos = as[i].textContent;
             }
        }
 
    }
 
    if(document.getElementById("watch7-views-info"))
    {
        var viewsObj = document.getElementById("watch7-views-info");
 
        var spans =viewsObj.getElementsByTagName("span");
        for(var i=0;i<spans.length;i++)
        {
                var cls =spans[i].getAttribute("class");
                if(cls.indexOf("watch-view-count") >= 0)
                {
                    views = spans[i].textContent;
                }
        }
 
    }
    var div=document.createElement("div");
    div.setAttribute("style",";border:1px solid red;padding:10px 10px 10px 100px;");
    div.innerHTML ="<h1>"+title+"</h1><br>";
    div.innerHTML +="<b>Uploaded By:</b>"+userName+"<br>";
    div.innerHTML +="<b>Uploaded Videos: </b>"+userVideos+"<br>";
    div.innerHTML +="<b>Total Views: </b>"+views+"<br>";
    document.body.insertBefore(div,document.body.firstChild);
 
    //hide sidebar
    var sidebar = document.getElementById("watch7-sidebar");
    if(sidebar)
    {
        sidebar.style.display="none";
    }
}
