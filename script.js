document.addEventListener("DOMContentLoaded", function() {
    const startBtn = document.getElementById("startBtn");
    const target = document.getElementById("target");
    const result = document.getElementById("result");
    let startTime;

    startBtn.addEventListener("click", function() {
        startGame();
    });

    

    function startGame() {
        startBtn.style.display = "none";
        result.textContent = "";
        const delay = getRandomDelay(1000, 10000); // between 1 and 10 seconds
        setTimeout(() => {
            target.style.backgroundColor = "green";
            target.style.display = "block";
            startTime = new Date().getTime(); // Start the timer when the screen turns green
        }, delay);
    }
    target.addEventListener("click", function() {
        if (target.style.backgroundColor === "green") {
            const endTime = new Date().getTime();
            const reactionTime = (endTime - startTime) / 1000; // in seconds
            result.textContent = `Your reaction time: ${reactionTime.toFixed(2)} seconds`;
            target.style.backgroundColor = "red";
            startBtn.style.display = "inline-block";
        }
    });
    function getRandomDelay(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
});
