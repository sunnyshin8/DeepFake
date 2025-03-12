import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import requests
from io import BytesIO

# Load the model
model_path = 'deepfake_detection_model.h5'
try:
    model = load_model(model_path)
    print(f"Model loaded successfully from {model_path}")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

def preprocess_image(img, target_size=(224, 224)):
    """
    Preprocess the image to be compatible with the model
    
    Args:
        img: PIL Image or numpy array
        target_size: Target size for resizing
        
    Returns:
        Preprocessed image as numpy array
    """
    if isinstance(img, np.ndarray):
        img = Image.fromarray(img)
    
    # Resize the image
    img = img.resize(target_size)
    
    # Convert to numpy array and normalize
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0  # Normalize to [0,1]
    
    return img_array

def predict_deepfake(img_input):
    """
    Predict whether an image is a deepfake
    
    Args:
        img_input: Can be a PIL Image, numpy array, or URL string
    
    Returns:
        Dictionary with:
        - is_deepfake: Boolean indicating if the image is a deepfake
        - confidence: Static confidence value
    """
    if model is None:
        raise ValueError("Model not loaded properly")
        
    # Handle different input types
    if isinstance(img_input, str) and (img_input.startswith('http://') or img_input.startswith('https://')):
        # Load from URL
        try:
            response = requests.get(img_input)
            img = Image.open(BytesIO(response.content))
        except Exception as e:
            raise ValueError(f"Error loading image from URL: {e}")
    elif isinstance(img_input, (np.ndarray, Image.Image)):
        # Already an image
        img = img_input
    else:
        raise ValueError("Input must be a PIL Image, numpy array, or image URL")
    
    # Preprocess the image
    processed_img = preprocess_image(img)
    
    # Make prediction
    prediction = model.predict(processed_img)[0][0]
    print(f"Prediction: {prediction}")
    
    # Interpret results (assuming model outputs probability of being real)
    # If prediction is close to 0, it's likely a deepfake
    # If prediction is close to 1, it's likely real
    is_deepfake = bool(prediction < 0.5)
    print(f"Is deepfake: {is_deepfake}")
    
    # Calculating from prediction
    confidence = 1 - prediction if is_deepfake else prediction
    
    return {
        "is_deepfake": is_deepfake,
        "confidence": confidence
    }