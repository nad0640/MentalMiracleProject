const userMessage = [
  ["what does it mean to have a mental illness", "what is mental illness", "describe mental illness"],

  ["who does mental illness affect", "who is affected by mental illness"],

  ["what causes mental illness", "what leads to mental illness", "how does one get mentally ill"],

  ["im sad", "im angry", "im stressed", "im anxious"],

  ["what is anxiety"],

  ["what are some mental health resources"],

  ["what is depression"],

  ["what are the most common mental illnessess"]


];
const botReply = [
  ["Mental illnesses are health conditions that disrupt a person's thoughts, emotions, relationships, and daily functioning."],

  ["It is estimated that mental illness affects 1 in 5 adults in America, and that 1 in 24 adults have a serious mental illness."],

  ["Symptoms of mental health disorders vary depending on the type and severity of the condition."],

  ["I am sorry to hear that. Would you like to explain why you feel this way?"],

  ["Anxiety is a natural and common human emotion characterized by feelings of worry, nervousness, or unease about future events or situations. While occasional anxiety is a normal response to stress and can even be helpful in certain situations, such as preparing for a presentation or an important event, excessive or chronic anxiety can become problematic."],

  ["Therapy and Counseling Services: Licensed therapists, psychologists, counselors, and psychiatrists offer one-on-one sessions to address specific mental health concerns. <br>Helplines and Hotlines: Crisis hotlines like the National Suicide Prevention Lifeline (1-800-273-TALK) provide immediate support and guidance. Text-based crisis lines offer help through messaging"],

   ["Depression, also known as major depressive disorder, is a serious and common mental health condition characterized by persistent feelings of sadness, hopelessness, and a lack of interest or pleasure in activities that were once enjoyable. It goes beyond normal feelings of sadness or temporary mood fluctuations."],

  ["Some of the most common mental illnesses include: <br> Depression, Anxiety, Bipolar Disorder, Obsessive-Compulsive Disorder (OCD), Post-Traumatic Stress Disorder (PTSD), and Attention-Deficit/Hyperactivity Disorder (ADHD). <br> It's important to note that mental health conditions vary in severity and presentation. Many people may experience symptoms of one or more of these disorders at some point in their lives. Early recognition, accurate diagnosis, and appropriate treatment can greatly improve a person's quality of life and overall well-being. If you or someone you know is struggling with mental health issues, seeking professional help is crucial."]

];

const alternative = [
  "Ask me more about what mental illness is...",
  "Hey, I'm listening...",
  "Tell me about any concerns you have"
];

const synth = window.speechSynthesis;

function voiceControl(string) {
  let u = new SpeechSynthesisUtterance(string);
  u.text = string;
  u.lang = "en-aus";
  u.volume = 1;
  u.rate = 1;
  u.pitch = 1;
  synth.speak(u);
}

function sendMessage() {
  const inputField = document.getElementById("input");
  let input = inputField.value.trim();
  input != "" && output(input);
  inputField.value = "";
}
document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", function(e) {
    if (e.code === "Enter") {
      let input = inputField.value.trim();
      input != "" && output(input);
      inputField.value = "";
    }
  });
});

function output(input) {
  let product;

  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

  text = text
    .replace(/[\W_]/g, " ")
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .trim();

  let comparedText = compare(userMessage, botReply, text);

  product = comparedText
    ? comparedText
    : alternative[Math.floor(Math.random() * alternative.length)];
  addChat(input, product);
}

function compare(triggerArray, replyArray, string) {
  let item;
  for (let x = 0; x < triggerArray.length; x++) {
    for (let y = 0; y < replyArray.length; y++) {
      if (triggerArray[x][y] == string) {
        items = replyArray[x];
        item = items[Math.floor(Math.random() * items.length)];
      }
    }
  }
  //containMessageCheck(string);
  if (item) return item;
  else return containMessageCheck(string);
}

function containMessageCheck(string) {
  let expectedReply = [
    [
      "Good Bye, dude",
      "Bye, See you!",
      "Dude, Bye. Take care of your health in this situation."
    ],
    ["Good Night, dude", "Have a sound sleep", "Sweet dreams"],
    ["Have a pleasant evening!", "Good evening too", "Evening!"],
    ["Good morning, Have a great day!", "Morning, dude!"],
    ["Good Afternoon", "Noon, dude!", "Afternoon, dude!"]
  ];
  let expectedMessage = [
    ["bye", "tc", "take care"],
    ["night", "good night"],
    ["evening", "good evening"],
    ["morning", "good morning"],
    ["noon"]
  ];
  let item;
  for (let x = 0; x < expectedMessage.length; x++) {
    if (expectedMessage[x].includes(string)) {
      items = expectedReply[x];
      item = items[Math.floor(Math.random() * items.length)];
    }
  }
  return item;
}
function addChat(input, product) {
  const mainDiv = document.getElementById("message-section");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.classList.add("message");
  userDiv.innerHTML = `<span id="user-response">${input}</span>`;
  mainDiv.appendChild(userDiv);

  let botDiv = document.createElement("div");
  botDiv.id = "bot";
  botDiv.classList.add("message");
  botDiv.innerHTML = `<span id="bot-response">${product}</span>`;
  mainDiv.appendChild(botDiv);
  var scroll = document.getElementById("message-section");
  scroll.scrollTop = scroll.scrollHeight;
  voiceControl(product);
}