#!/bin/bash

# Define source and target directories
SOURCE_DIR="G:/DeepFake/faces_224"
TARGET_DIR="G:/DeepFake/Deepfake/aigenerated"

# Number of files to copy
NUM_FILES=35000

# Create the target directory if it doesn't exist
mkdir -p "$TARGET_DIR"

# Counter for copied files
counter=0

# List all files in the source directory and shuffle them
files=$(find "$SOURCE_DIR" -type f | shuf)

# Loop through the shuffled files and copy the first 35,000
for file in $files; do
  # Copy the file to the target folder
  cp "$file" "$TARGET_DIR/"
  
  # Increment the counter
  ((counter++))
  
  # Check if we've copied the desired number of files
  if [[ $counter -ge $NUM_FILES ]]; then
    echo "Successfully copied $counter files."
    break
  fi
done

# Final message
if [[ $counter -lt $NUM_FILES ]]; then
  echo "Only $counter files were copied. Source folder might not have enough files."
else
  echo "Finished copying $NUM_FILES files."
fi
