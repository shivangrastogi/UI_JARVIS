from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QVBoxLayout, QGraphicsDropShadowEffect
from PyQt5.QtGui import QMovie
from PyQt5.QtCore import Qt, QTimer, QSize, pyqtSignal, QObject
import threading
import subprocess
import os,sys
import pyautogui as gui
from MAIN.main import jarvis


sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

class SizeAnimator(QObject):
    sizeChanged = pyqtSignal(QSize)

    def animate(self, size, delay=0):
        QTimer.singleShot(delay, lambda: self.sizeChanged.emit(size))

class JarvisUI(QWidget):
    def __init__(self):
        super().__init__()

        self.init_ui()

    def init_ui(self):
        self.setWindowTitle("Jarvis UI")
        self.setGeometry(80,80,400,400)

        self.setAttribute(Qt.WA_TranslucentBackground)
        self.setWindowFlag(Qt.FramelessWindowHint)

        self.mic_label = QLabel(self)

        base_dir = os.path.dirname(os.path.abspath(__file__))
        gif_path = os.path.abspath(os.path.join(base_dir, '..', 'USER_INTERFACE', 'XDZT.gif'))

        self.add_gif_to_label(self.mic_label, gif_path, size=QSize(720, 720), alignment=Qt.AlignCenter)

        self.mic_label.setAlignment(Qt.AlignCenter)
        self.mic_label.mousePressEvent = self.start_listening

        main_layout = QVBoxLayout(self)
        main_layout.addWidget(self.mic_label , alignment=Qt.AlignCenter)

        main_layout.setContentsMargins(20,20,20,20)
        main_layout.setSpacing(20)

        self.process = None
        self.is_listening = False
        self.size_animator = SizeAnimator()
        self.size_animator.sizeChanged.connect(self.mic_label.setFixedSize)

    def add_gif_to_label(self,label,gif_path, size=None, alignment=None):
        movie = QMovie(gif_path)
        label.setMovie(movie)
        self.movie = movie
        movie.start()

        if size:
            label.setFixedSize(size)
        if alignment:
            label.setAlignment(alignment)

        shadow = QGraphicsDropShadowEffect()
        shadow.setBlurRadius(15)
        label.setGraphicsEffect(shadow)

    def start_listening(self, event):
        if not self.is_listening:
            self.is_listening = True
            subprocess_thread = threading.Thread(target=self.run_main_file)
            subprocess_thread.start()

    def run_main_file(self):
        try:
            jarvis()
            self.is_listening = False
        except Exception as e:
            print(f"Error running jarvis(): {e}")

    def handle_output(self, output):
        if output.strip():
            self.size_animator.animate(QSize(900,280))
            self.size_animator.animate(QSize(720, 220) , delay=500)

        else:
            self.size_animator.animate(QSize(900,280))

if __name__ == "__main__":
    gui.hotkey("win","d")
    app = QApplication([])

    jarvis_ui = JarvisUI()
    jarvis_ui.showFullScreen()

    app.exec_()


