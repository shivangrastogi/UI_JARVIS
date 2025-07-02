# Use an official Python runtime
FROM python:3.10-slim

# Install system dependencies needed for PyAudio and others
RUN apt-get update && apt-get install -y \
    build-essential \
    portaudio19-dev \
    libffi-dev \
    libasound2-dev \
    libportaudio2 \
    libportaudiocpp0 \
    ffmpeg \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy your code
COPY . .

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expose the port your app runs on (change if different)
EXPOSE 5000

# Command to run your server (adjust if different)
CMD ["gunicorn", "server:app", "--bind", "0.0.0.0:5000"]
