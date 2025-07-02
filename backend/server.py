import os

from flask import Flask, jsonify, request
from flask_cors import CORS
import threading

from backend.MAIN.main import jarvis
app = Flask(__name__)
CORS(app)

RESPONSES_PATH = os.path.join("..", "Frontend", "Files", "Responses.data")

@app.route("/start-jarvis", methods=["POST"])
def start_jarvis():
    threading.Thread(target=jarvis).start()
    return jsonify({"status": "Jarvis started"}), 200

@app.route("/get-message", methods=["GET"])
def get_message():
    try:
        with open(RESPONSES_PATH, "r", encoding="utf-8") as f:
            return jsonify({"message": f.read()}), 200
    except Exception as e:
        return jsonify({"message": "", "error": str(e)}), 500

@app.route("/")
def health_check():
    return "Jarvis backend is running", 200

if __name__ == "__main__":
    app.run(port=5000, debug=False)
