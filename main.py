import eel
import scrython
import scrython.cards
import json
import requests

current_card_information = None
current_card_set_information = None

eel.init("web")

@eel.expose
def js_print(string) -> None:
    print(string)

@eel.expose
def random_card_name() -> str:
    card = scrython.cards.Random()
    return card.name()

@eel.expose
def load_specific_card(card : str = "island") -> str:
    global current_card_information
    global current_card_set_information
    try:
        card_information = scrython.cards.Named(fuzzy=card).scryfallJson

        eel.change_class_text("card-text-card-name", card_information["name"])
        eel.change_class_image("card-image", card_information['image_uris']['normal'])
        eel.change_class_text("card-text-mana-cost", card_information["mana_cost"])
        eel.change_class_text("card-text-type-line", card_information["type_line"])
        eel.change_class_text("card-text-artist", "Artist : "+card_information["artist"])
        eel.change_class_text("card-text-oracle", card_information["oracle_text"])

        if 'power' in card_information and 'toughness' in card_information:
            eel.change_class_text("card-text-stats", f"{card_information['power']} / {card_information['toughness']}")
        elif 'loyalty' in card_information:
            eel.change_class_text("card-text-stats", card_information["loyalty"])
        else:
            eel.change_class_text("card-text-stats", "")


        set_information = requests.get(card_information["prints_search_uri"]).content
        set_information = json.loads(set_information)

        set_text = ""
        for i in set_information['data']:
            set_text += f"{i['set_name']}\n"

        eel.change_class_text("card-versions", set_text)

        current_card_information = card_information
        current_card_set_information = set_information

        return card_information
    except Exception as e:    
        print(e)
        return False

eel.start("index.html")