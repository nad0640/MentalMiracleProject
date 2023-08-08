
var checked = [];
let unplug = { name: "taking a break from your devices. Unplug and indulge in activities that give yourself a break from screens. Read a book, cook some food, or go on a hike. The possiblities are endless!", count: 0 };
let time = { name: "taking some time for yourself. Forget everything and everyone else and just focus on you. Watch your favorite TV show or have a dance party!", count: 0 };
let shower = { name: "taking a shower to unplug your muscles and mind. It can help release tension and increase blood circulation. Listen to your favorite jams and sing in the shower!", count: 0 };
let walk = { name: "taking a walk to help clear your mind and get some fresh air. Walking promotes the release of serotonin and endorphins, which can help improve your mood. Listen to your favorite playlist and go on a walk!", count: 0 };
var options = [unplug, time, shower, walk];

function results() {
  for (let e = 0; e < checked.length; e++) {
    if (checked[e] == "unplug") {
      unplug.count++;
    }
    if (checked[e] == "time") {
      time.count++;
    }
    if (checked[e] == "shower") {
      shower.count++;
    }
    if (checked[e] == "walk") {
      walk.count++;
    }
  }

  for (i = 0; i < options.length; i++) {
    console.log(options[i].name);
    console.log(options[i].count);
  }

  var largest = walk;
  for (i = 0; i < options.length; i++) {
    if (options[i].count > largest.count) {
      largest = options[i];
    }
  }

  document.getElementById("result").innerHTML = "Consider " + largest.name;

  // document.getElementById("learnBNT").innerHTML = '<a href=' + largest.link + ' button type="button" class="btn btn-lg btn-secondary">Learn More</button> </a>';

}

function radioCheck(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].checked) {
      checked.push(array[i].value);
    }
  }
  results();
}

function end() {
  while (checked.length > 0) {
    checked.pop();
  }
  walk.count = 0;
  unplug.count = 0;
  time.count = 0;
  shower.count = 0;

  let idArray = document.getElementsByClassName("form-check-input");
  radioCheck(idArray);
}

const resultClick = document.querySelector("#check");
resultClick.addEventListener("click", end);
