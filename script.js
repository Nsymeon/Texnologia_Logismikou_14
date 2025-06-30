// Initialize EmailJS
emailjs.init("qZgA5MJ8z5kuOKhrA");

// Μεταβλητές για αποθήκευση στοιχείων
let currentRisk = "";
let currentName = "";
let currentEmail = "";

// Χειρισμός Predict Button
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

  try {
    const model = await tf.loadLayersModel('model/model.json');



    const inputTensor = tf.tensor2d([inputs]);
    const prediction = await model.predict(inputTensor).data();
    currentRisk = (prediction[0] * 100).toFixed(2);

    const resultMsg = `Hi ${currentName}, your predicted heart disease risk is: ${currentRisk}%`;
    document.getElementById("result").innerText = resultMsg;

  } catch (error) {
    alert("Error loading the model or making a prediction.");
    console.error(error);
  }
});

// Χειρισμός Email Button
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
