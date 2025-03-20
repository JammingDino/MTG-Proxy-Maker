import eel
from requests import get
from shutil import copyfileobj
import scrython
import scrython.cards
import os
import glob

card_image_dir = 'web/card_images'

# Ensure the directory exists
os.makedirs(card_image_dir, exist_ok=True)

def cleanup_images():
    """ Remove all .jpg files from the card images directory. """
    print("Cleaning up card images...")
    for file_path in glob.glob(os.path.join(card_image_dir, "*.jpg")):
        try:
            os.remove(file_path)
            print(f"Deleted: {file_path}")
        except Exception as e:
            print(f"Failed to delete {file_path}: {e}")

eel.init("web")

@eel.expose
def js_print(string) -> None:
    print(string)

@eel.expose
def random_card_image() -> str:
    print("Calling the function")
    card = scrython.cards.Random()

    img_file = 'web/card_images/' + card.name() + ".jpg"

    with open(img_file, 'wb') as out_file:
        copyfileobj(get(card.image_uris()['normal'], stream = True).raw, out_file)
    
    return img_file[3:]

@eel.expose
def find_specific_card(card : str = "island") -> str:
    try:
        card = scrython.cards.Named(fuzzy=card)

        img_file = 'web/card_images/' + card.name() + ".jpg"
        with open(img_file, 'wb') as out_file:
            copyfileobj(get(card.image_uris()['normal'], stream = True).raw, out_file)
        
        return img_file[3:]
    except:    
        return False

try:
    eel.start("index.html", size=(680, 800))
finally:
    cleanup_images()