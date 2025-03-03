from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np

# Initialize Flask app
app = Flask(__name__)

# Load the trained Random Forest model
model = joblib.load("RandomForest_model.pkl")


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the Language Endangerment Prediction API!"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()
        
        # Convert to Pandas DataFrame
        df = pd.DataFrame([data])
        
        # Ensure the feature order matches what the model was trained on
        feature_columns = ['Number of speakers', 'Countries_Indonesia', 'Countries_Italy']  # Adjust based on your model
        df = df[feature_columns]  # Keep only necessary columns
        
        # Make prediction
        prediction = model.predict(df)[0]
        
        return jsonify({"prediction": prediction})
    
    except Exception as e:
        return jsonify({"error": str(e)})

# Run the app
if __name__ == "__main__":
    app.run(debug=True)