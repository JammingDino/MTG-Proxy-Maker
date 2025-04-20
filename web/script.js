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

eel.expose(addButtonToElement)
function addButtonToElement(element_class, button_text, index) {

    eel.js_print(button_text)

    let element = document.getElementsByClassName(element_class)[0];
    if (!element) {
        console.error(`Element with class "${element_class}" not found.`);
        return;
    }

    let button = document.createElement('button');
    button.textContent = button_text;
    button.dataset.index = index;
    button.classList.add("set-button");

    button.addEventListener('click', function() {
        handleButtonClick(parseInt(this.dataset.index));
    });

    element.appendChild(button);
}

function handleButtonClick(index) {
    eel.set_changed(index);
}

eel.expose(change_class_image)
function change_class_image(element_class, src) {
    let element = document.getElementsByClassName(element_class)[0];
    element.src = src
    element.alt = src
}

async function continueWithCardSelected() {
    await eel.continue_with_card_selected();
}

async function sendText() {
    let text = document.getElementById("text-box").value;
    if (text.trim() === "") {
        showPopupMessage("The card you entered does not exist!");
        return;
    } else {
        eel.load_specific_card(text);
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

window.onload = async function() {
    let random_card_name = await eel.random_card_name()();
    eel.load_specific_card(random_card_name);
};