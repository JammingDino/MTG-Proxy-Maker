eel.expose(change_class_text)

function change_class_text(element_class, text) {
    let element = document.getElementsByClassName(element_class)[0];

    // Clear all child elements
    element.innerHTML = "";  

    if (text.includes("\n")) {
        let lines = text.split("\n");

        lines.forEach(line => {
            let p = document.createElement("p");
            p.textContent = line;
            element.appendChild(p);
        });
    } else {
        let p = document.createElement("p");
        p.textContent = text;
        element.appendChild(p);
    }
}


eel.expose(change_class_image)
function change_class_image(element_class, src) {
    let element = document.getElementsByClassName(element_class)[0];
    element.src = src
    element.alt = src
}

async function addCard(cardInformation) {

    try {
        // Specify the image path (change this to your actual image) 
        eel.js_print(cardInformation);

        // Create a new div element for the frame
        let frame        = document.getElementsByClassName("card-image-frame")[0];
        let img          = document.getElementsByClassName("card-image")[0];
        let name         = document.getElementsByClassName("card-text-card-name")[0];
        let mana_value   = document.getElementsByClassName("card-text-mana-cost")[0];
        let type_line    = document.getElementsByClassName("card-text-type-line")[0];

        let stats        = document.getElementsByClassName("card-text-stats")[0];
        let artist       = document.getElementsByClassName("card-text-artist")[0];

        img.src                = cardInformation.image;
        name.textContent       = cardInformation.name;
        mana_value.textContent = cardInformation.mana_cost;
        type_line.textContent  = cardInformation.type_line
        stats.textContent      = cardInformation.stats;
        artist.textContent     = cardInformation.artist;

        // // Add the mousemove event to the frame for interactive tilt
        // frame.addEventListener("mousemove", function(event) {
        //     const bounds = frame.getBoundingClientRect(); // Get the size and position of the frame
        //     const offsetX = event.clientX - bounds.left; // Mouse X position relative to the frame
        //     const offsetY = event.clientY - bounds.top;  // Mouse Y position relative to the frame

        //     // Normalize the mouse position to be between -1 and 1 (relative to frame size)
        //     const xRotation = ((offsetY / bounds.height) - 0.5) * 10;  // Tilt on the X axis (subtle)
        //     const yRotation = ((offsetX / bounds.width) - 0.5) * -10; // Tilt on the Y axis (subtle)

        //     // Apply the tilt to the image inside the frame
        //     img.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        // });

        // frame.addEventListener("mouseout", function() {
        //     img.style.transform = "rotateX(0deg) rotateY(0deg)";
        // });

    } catch (error) {
        eel.js_print(error);
    }
}

async function sendText() {
    let text = document.getElementById("text-box").value;
    if (text.trim() === "") {
        showPopupMessage("The card you entered does not exist!");
        return;
    } else {
        eel.load_specific_card(text);
        // let cardInformation = await eel.find_specific_card(text)();

        // if (cardInformation === false) {
        //     showPopupMessage("The card you entered does not exist!");
        //     return
        // }
        
        // eel.js_print(cardInformation);
        // addCard(cardInformation);
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
