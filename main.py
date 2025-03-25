import eel
import scrython
import scrython.cards
import json

eel.init("web")

@eel.expose
def js_print(string) -> None:
    print(string)

@eel.expose
def random_card_image() -> str:
    card = scrython.cards.Random()
    return card.image_uris()['normal']

@eel.expose
def load_specific_card(card : str = "island") -> str:
    try:
        card_information = scrython.cards.Named(fuzzy=card).scryfallJson
        print(json.dumps(card_information, indent=4))

        eel.change_class_text("card-text-card-name", card_information["name"])
        eel.change_class_image("card-image", card_information['image_uris']['normal'])
        eel.change_class_text("card-text-mana-cost", card_information["mana_cost"])
        eel.change_class_text("card-text-type-line", card_information["type_line"])
        eel.change_class_text("card-text-artist", card_information["artist"])
        eel.change_class_text("card-text-oracle", card_information["oracle_text"])

        return card_information
    except Exception as e:    
        print(e)
        return False

eel.start("index.html")