from backend.AUTOMATION.MAIN_INTEGRATION._integration_automation import *
from backend.BRAIN.MAIN_BRAIN.BRAIN.brain import *
from backend.FUNCTION.MAIN_FUNCTION_INTEGRATION.function_integration import *
from backend.BRAIN.ACTIVITY.GREETINGS.welcome_greetings import *
from backend.BRAIN.ACTIVITY.GREETINGS.wish_greetings import *
import threading
from backend.BRAIN.ACTIVITY.ADVICE.advice import *
from backend.BRAIN.ACTIVITY.JOKE.jokes import *
from backend.AUTOMATION.JARVIS_BATTERY_AUTOMATION.battery_plug_check import *
from backend.AUTOMATION.JARVIS_BATTERY_AUTOMATION.battery_alert import *
# from playsound import playsound
from backend.FUNCTION.JARVIS_SPEAK.speak import speak


def comain():
    while True:
        text = listen().lower()
        text = text.replace("jar", "jarvis")
        Automation(text)
        Function_cmd(text)
        Greetings(text)

        if text in bye_key_word:
            x = random.choice(res_bye)
            speak(x)
            break
        elif "jarvis" in text or "jar" in text:
            response = brain_cmd(text)
            speak(response)
        else:
            pass

def main():
    while True:

        # wake_cmd = hearing().lower()
        # if wake_cmd in wake_key_word:
        welcome()
        comain()
        # else:
        #     pass




def jarvis():
    # sound_path = resource_path("DATA/soundeffect/mixkit-high-tech-bleep-2521.wav")
    # playsound(sound_path)
    speak("JARVIS ACTIVATED")
    t1 = threading.Thread(target=main)
    t2 = threading.Thread(target=battery_alert)
    t3 = threading.Thread(target=check_plugin_status)
    t4 = threading.Thread(target=advice)
    t5 = threading.Thread(target=jokes)
    t1.start()
    t2.start()
    t3.start()
    t4.start()
    t5.start()
    t1.join()
    t2.join()
    t3.join()
    t4.join()
    t5.join()


if __name__ == "__main__":
    jarvis()