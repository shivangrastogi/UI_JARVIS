import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from backend.FUNCTION.JARVIS_SPEAK.speak import *
# from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from backend.FUNCTION.ChromeWebdriverLocation.utils import get_chromedriver_path
import logging



# Set up logging to suppress console logs
logging.getLogger('selenium').setLevel(logging.WARNING)

# Set up Chrome options
chrome_options = Options()
chrome_options.add_argument("--headless")


# chrome_driver_path = r'C:\Users\bosss\Desktop\JARVIS\DATA\JARVIS_DRIVER\chromedriver.exe'


chrome_options.add_argument("--log-level=3")
chrome_options.add_argument("--disable-blink-features=AutomationControlled")
# Run in headless mode (without opening a browser window)

# Create a Service object with WebDriverManager to automatically manage the ChromeDriver binary
# chrome_service = Service(ChromeDriverManager().install())

service = ChromeService(get_chromedriver_path())

# Create a Chrome driver instance with the specified options and service
driver = webdriver.Chrome(service=service, options=chrome_options)


def get_internet_speed():
    try:
        # Open the website
        driver.get('https://fast.com/')
        speak("Checking your Internet speed")
        time.sleep(11)

        # Wait for the speed test to complete (adjust the timeout as needed)
        WebDriverWait(driver, 60).until(EC.presence_of_element_located((By.ID, 'speed-value')))

        # Find the element with the speed value
        speed_element = driver.find_element(By.ID, 'speed-value')

        # Get the text value from the element
        speed_value = speed_element.text

        return speed_value
    except Exception as e:
        print(f"Error: {e}")
        return None
    finally:
        # Close the browser window
        if driver:
            driver.quit()

def check_internet_speed():
    speed_result = get_internet_speed()

    if speed_result is not None:
        speak(f"Sir, your internet speed is: {speed_result} Mbps")
    else:
        speak("Error: Unable to retrieve internet speed.")
