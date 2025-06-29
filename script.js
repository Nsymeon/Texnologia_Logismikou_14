// Initialize EmailJS
emailjs.init("qZgA5MJ8z5kuOKhrA");

// Global variables to store prediction result
let currentRisk = "";
let currentName = "";
let currentEmail = "";

// Handle Predict Button
document.getElementById("predict-btn").addEventListener("click", async function () {
  const inputIds = ["age", "sex", "cp", "trestbps", "chol", "fbs", "restecg",
    "thalach", "exang", "oldpeak", "slope", "ca", "thal"];
  const inputs = inputIds.map(id => parseFloat(document.getElementById(id).value));

  currentName = document.getElementById("user_name").value;
  currentEmail = document.getElementById("user_email").value;

  if (!currentName || !currentEmail) {
    alert("Please enter your name and email.");
    return;
  }

  // Load the TensorFlow.js model
  const model = await tf.loadLayersModel("model/model.json");

  // Make prediction
  const inputTensor = tf.tensor2d([inputs]);
  const prediction = await model.predict(inputTensor).data();
  currentRisk = (prediction[0] * 100).toFixed(2);

  // Show result on the page
  const resultMsg = `Hi ${currentName}, your predicted heart disease risk is: ${currentRisk}%`;
  document.getElementById("result").innerText = resultMsg;
});

// Handle Email Button
document.getElementById("email-btn").addEventListener("click", function () {
  if (!currentRisk) {
    alert("Please run the prediction first.");
    return;
  }

  emailjs.send("service_4kach17", "template_2mngnmr", {
    user_name: currentName,
    user_email: currentEmail,
    risk: currentRisk
  }).then(() => {
    alert("Email sent successfully!");
  }, (err) => {
    alert("Failed to send email: " + JSON.stringify(err));
  });
});
