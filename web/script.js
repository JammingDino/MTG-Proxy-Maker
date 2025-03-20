eel.expose
async function addImage(imagePath) {
    eel.js_print("Button clicked, attempting to call Python function...");

    try {
        // Specify the image path (change this to your actual image) 
        eel.js_print(imagePath);

        // Create a new div element for the frame
        let frame = document.createElement("div");
        frame.classList.add("image-frame");

        // Create the img element
        let img = document.createElement("img");
        img.src = imagePath;
        img.alt = imagePath;

        // Add the mousemove event to the frame for interactive tilt
        frame.addEventListener("mousemove", function(event) {
            const bounds = frame.getBoundingClientRect(); // Get the size and position of the frame
            const offsetX = event.clientX - bounds.left; // Mouse X position relative to the frame
            const offsetY = event.clientY - bounds.top;  // Mouse Y position relative to the frame

            // Normalize the mouse position to be between -1 and 1 (relative to frame size)
            const xRotation = ((offsetY / bounds.height) - 0.5) * 10;  // Tilt on the X axis (subtle)
            const yRotation = ((offsetX / bounds.width) - 0.5) * -10; // Tilt on the Y axis (subtle)

            // Apply the tilt to the image inside the frame
            img.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        });

        // Add mouseout event to reset the tilt when the mouse leaves the frame
        frame.addEventListener("mouseout", function() {
            img.style.transform = "rotateX(0deg) rotateY(0deg)";  // Reset tilt
        });

        // Append the image to the frame
        frame.appendChild(img);

        // Append the frame to the container
        document.getElementById("imageContainer").appendChild(frame);
    } catch (error) {
        eel.js_print(error);
    }
}

eel.expose
async function sendText() {
    let text = document.getElementById("textBox").value;
    if (text.trim() === "") {
        showPopupMessage("The card you entered does not exist!");
        return;
    } else {
        let imagePath = await eel.find_specific_card(text)();

        if (imagePath === false) {
            showPopupMessage("The card you entered does not exist!");
            return
        }
        
        eel.js_print(imagePath);
        addImage(imagePath);
    }
}

function showPopupMessage(message) {
    // Create the message div
    let popup = document.createElement("div");
    popup.classList.add("popup-message");
    popup.textContent = message;

    // Append to body
    document.body.appendChild(popup);

    // Start fading out after 2 seconds
    setTimeout(() => {
        popup.classList.add("fade-out");
    }, 2000);

    // Remove from DOM after fade-out
    setTimeout(() => {
        popup.remove();
    }, 3000);
}
