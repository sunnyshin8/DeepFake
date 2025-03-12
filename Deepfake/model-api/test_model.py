import os
import random
from PIL import Image
from model import predict_deepfake

def load_image(path):
    # load image from file as PIL image
    img = Image.open(path)
    return img

if __name__ == "__main__":
    # select 5 random images from the dataset
    folder_path = '../aigenerated'
    images = os.listdir(folder_path)
    selected_images = random.sample(images, 5)
    for img_name in selected_images:
        img_path = os.path.join(folder_path, img_name)
        img = load_image(img_path)
        result = predict_deepfake(img)
        print(f"Image: {img_name}, Result: {result}")