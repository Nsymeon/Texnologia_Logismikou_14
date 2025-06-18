
emailjs.init("qZgA5MJ8z5kuOKhrA");

document.getElementById("predict-form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const inputIds = ["age", "sex", "cp", "trestbps", "chol", "fbs", "restecg",
                    "thalach", "exang", "oldpeak", "slope", "ca", "thal"];
  const inputs = inputIds.map(id => parseFloat(document.getElementById(id).value));

  const name = document.getElementById("user_name").value;
  const email = document.getElementById("user_email").value;

  const model = await tf.loadLayersModel("model/model.json");
  const inputTensor = tf.tensor2d([inputs]);
  const prediction = await model.predict(inputTensor).data();
  const risk = (prediction[0] * 100).toFixed(2);

  const resultMsg = `Hi ${name}, your predicted heart disease risk is: ${risk}%`;
  document.getElementById("result").innerText = resultMsg;

  emailjs.send("service_4kach17", "template_2mngnmr", {
    user_name: name,
    user_email: email,
    risk: risk
  }).then(() => {
    alert("Email sent!");
  }, (err) => {
    alert("Email failed: " + JSON.stringify(err));
  });
});
