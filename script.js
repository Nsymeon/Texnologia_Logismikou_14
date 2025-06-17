(function() {
    emailjs.init("qZgA5MJ8z5kuOKhrA");
})();

document.getElementById("risk-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const userName = document.getElementById("user_name").value;
    const userEmail = document.getElementById("user_email").value;

    const riskPercent = (Math.random() * (95 - 20) + 20).toFixed(2);
    const message = `Hello ${userName},\\nYour predicted risk of heart disease is: ${riskPercent}%.`;

    document.getElementById("result").innerText = message;

    emailjs.send("service_4kach17", "template_2mngnmr", {
        user_name: userName,
        user_email: userEmail,
        message: message
    }).then(function(response) {
        alert("Email successfully sent!");
    }, function(error) {
        alert("Failed to send email.");
        console.log(error);
    });
});
