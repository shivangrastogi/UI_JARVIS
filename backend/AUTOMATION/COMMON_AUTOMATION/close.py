import random
import pyautogui as ui
from backend.DATA.JARVIS_DLG_DATASET.DLG import closedlg
from backend.FUNCTION.JARVIS_SPEAK.speak import speak


def close():
    closedlg_random = random.choice(closedlg)
    speak(closedlg_random)
    ui.hotkey("alt","f4")