document.addEventListener("DOMContentLoaded", function() {
    const startBtn = document.getElementById("startBtn");
    const target = document.getElementById("target");
    const result = document.getElementById("result");
    const tenBoxesBtn = document.getElementById("tenBoxes");
    let startTime;

    startBtn.addEventListener("click", function() {
        startGame();
    });

    

    function startGame() {
        startBtn.style.display = "none";
        result.textContent = "";
        const delay = getRandomDelay(2000, 10000); // between 1 and 10 seconds
        setTimeout(() => {
            target.style.backgroundColor = "green";
            target.style.display = "block";
            startTime = new Date().getTime(); // Start the timer when the screen turns green
        }, delay);
    }
    target.addEventListener("click", function() {
        const targetColor = window.getComputedStyle(target).getPropertyValue('background-color');
        if (target.style.backgroundColor === "green") {
            const endTime = new Date().getTime();
            const reactionTime = (endTime - startTime) / 1000; // in seconds
            result.textContent = `Your reaction time: ${reactionTime.toFixed(2)} seconds`;
            target.style.backgroundColor = "red";
            startBtn.style.display = "inline-block";
        } else {
            result.textContent = "You clicked too early! Try again.";
            startBtn.style.display = "inline-block";
        }   
});
    function getRandomDelay(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    tenBoxesBtn.addEventListener("click", function() {
        generateTenBoxes();
    });
    function generateTenBoxes() {
        const existingBoxes = document.querySelectorAll(".box");
        existingBoxes.forEach(box => box.remove());
        let clickCount = 0; // Track the number of clicks

        let lastBoxPosition = { x: 0, y: 300 }; // Initialize last box position
        const minDistance = 20; // Minimum distance between boxes

        const startTime = new Date();
        result.textContent = "";
        for (let i = 0; i < 10; i++) {
            const box = document.createElement("div");
            box.classList.add("box"); // Adding a class for styling
            box.style.width = "30px"; // Set width
            box.style.height = "30px"; // Set height
            box.style.backgroundColor = "red"; // Set background color
            document.body.appendChild(box); // Append the box to the document body
               // Calculate random position with minimum distance from the last box
            box.style.position = "absolute"; // Position the box absolutely

            const posX = getRandomNumber(lastBoxPosition.x + minDistance, lastBoxPosition.x + 70);
            const posY = getRandomNumber(lastBoxPosition.y + minDistance, lastBoxPosition.y + 70);

            box.style.left = posX + "px"; // Set left position
            box.style.top = posY + "px"; // Set top position
            
            box.addEventListener("click", function() {
                box.remove();
                clickCount++;

                if (clickCount === 10) {
                    // End timer
                    const endTime = new Date();
                    const elapsedTime = (endTime - startTime) / 1000; // Calculate elapsed time in seconds
                    result.textContent = `You clicked all ten boxes in ${elapsedTime.toFixed(2)} seconds.`;
                }
            });
            document.body.appendChild(box); // Append the box to the document body

            // Update the last box position
            lastBoxPosition = { x: posX, y: posY };
        }
    }
    
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    

});

