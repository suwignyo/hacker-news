// let grabity = require("grabity");
const openGraphAPI = "?app_id=5b96c7d62058cb0b00b764a0";
const openGraphURL = "https://opengraph.io/api/1.0/site/";
// const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const baseURL = "https://hacker-news.firebaseio.com/v0";
const topStories = baseURL + "/topstories.json";
//5b96c7d62058cb0b00b764a0
//5b96803c2058cb0b00b7627f

// HTTP request to grab information of file with and allows a callback
// that will manipulate the information
function httpGetAsync(url, cb) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      cb(this);
    }
  };
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}

let storiesURL = [];
let storiesIndex = 0;

// A callback function to be called after grabbing the top stories ID's
// after the ID's is received, it is stored into an array where
// it loops through it and creates another HTTP request and a callback
// to grab metadata information
function newsLinks(xhttp) {
  let newsArr = JSON.parse(xhttp.responseText);
  newsArr.forEach(element => {
    storyURL = baseURL + "/item/" + element + ".json";
    storiesURL.push(storyURL);
  });
  for (let i = 0; i < 4; i++) {
    if (storiesIndex < storiesURL.length) {
      httpGetAsync(storiesURL[storiesIndex], newsElements);
      storiesIndex += 1;
    } else {
      console.log("no more posts");
    }
  }
}

// The callback function from each story, it grabs the metadata
// using openGraph API, which then calls the news renderer to
// process the data and be rendered in the HTML
function newsElements(xhttp) {
  let result = JSON.parse(xhttp.responseText);
  let url = result.url;
  // (async () => {
  //   try {
  //     let it = await grabity.grabIt(url);
  //     // console.log(it);
  //     renderNews(it);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // })();
  httpGetAsync(openGraphURL + url + openGraphAPI, renderNews);
}

// Creates the HTML element using JSON format result from the HTTP request
// and renders the HTML element
function renderNews(xhttp) {
  let resText = JSON.parse(xhttp.responseText);
  let imageURL = resText.openGraph.image;

  let title = resText.openGraph.title;
  let description = resText.openGraph.description;
  let url = resText.openGraph.url;
  // let imageURL = json.image;
  // let title = json.title;
  // let description = json.description;
  // console.log(imageURL);

  let el = document.createElement("div");
  let domString =
    "<div class='newscontainer'>" +
    "<div class='imagecontainer'><a href=" +
    url +
    "><img src='" +
    imageURL +
    "' height='100%' width='100%'/></a></div>" +
    "<div class='title'><a class='titlelink' href=" +
    url +
    ">" +
    title +
    "</a></div>" +
    "<div class='summary'>" +
    description +
    "</div>" +
    "</div>";
  el.innerHTML = domString;
  document.getElementById("container").appendChild(el.firstChild);
}

// Button to get more posts
document.getElementById("morePosts").onclick = doFunction;

function doFunction() {
  httpGetAsync(topStories, newsLinks);
}

httpGetAsync(topStories, newsLinks);
