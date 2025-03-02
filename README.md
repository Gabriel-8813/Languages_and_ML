# Languages_and_ML
Group 10 Languages and machine learning -Project 4

## Code Explanation:

Load the Data: Load the language data from a CSV file into a DataFrame.
Data Preprocessing: Handle missing values with forward fill, but you can apply other strategies depending on your dataset.
Encoding Target Variable: Use LabelEncoder to convert the target variable "Degree of endangerment" into numeric format.
Define Features and Target: Prepare the features (X) for the model from the DataFrame based on your specifications.
Train-Test Split: Use train_test_split to divide the data into training and testing sets.
Model Training: A Random Forest Classifier is instantiated and fitted to the training data.
Predictions: The model makes predictions on the test set.
Model Evaluation: Print the confusion matrix and classification report to understand model performance.
Feature Importance Analysis: Extract and display feature importances to analyze which features most influence the classification.
Optional XGBoost Classifier: Train an XGBoost model for comparison to see if it performs better.



# Summary of the Code

## Purpose:

The provided code aims to classify languages based on their risk of extinction using machine learning techniques. By analyzing various features, such as the current number of speakers, geographic coordinates (latitude and longitude), and the degree of endangerment, the goal is to predict the endangerment status of languages. This classification helps identify languages that require preservation efforts to prevent extinction.

# Outcomes:

1. Model Training and Evaluation: The code implements a Random Forest classifier to predict the "Degree of endangerment" from the features provided. Using the train_test_split function, the dataset is divided into training and testing sets for model evaluation. The performance of the model is assessed using a confusion matrix and a classification report, which includes metrics like precision, recall, F1-score, and overall accuracy.
2. Performance Metrics:
The Random Forest model shows an accuracy of approximately 61%. The confusion matrix indicates the number of correct and incorrect predictions across the different classes of endangerment. The classification report provides insights into how well the model performs for each class, highlighting potential classifications that may need improvement.
3. Feature Importance: After training the model, feature importance is analyzed to determine which factors most influence the prediction of the degree of endangerment. In this case, "Number of speakers" emerges as the most critical feature, followed by "Longitude" and "Latitude".
4. Comparison with XGBoost: Optionally, the code includes training of an XGBoost classifier for a comparative analysis. The performance of both models is tracked through similar metrics, with XGBoost also providing its own confusion matrix and classification report.

# Interpretation in the Context of Machine Learning:

1. Machine Learning Utility: The implementation of machine learning provides an efficient method for analyzing and predicting language endangerment status, enabling stakeholders to make data-driven decisions about linguistic preservation. The models can be enhanced with additional features (e.g., demographic statistics or education access) to improve predictive performance further.
2. Classification Models: The choice of classifiers such as Random Forest and XGBoost is rooted in their robustness and effectiveness in handling classification tasks, particularly when dealing with non-linear relationships in complex datasets. The XGBoost algorithm, in particular, is known for its superior performance in many contexts and is favored for handling various data types efficiently.
3. Feature Importance Insights: Understanding which features contribute most to language endangerment can guide policymakers and conservation experts in their efforts to prioritize resources and interventions. For instance, the significant role of the number of speakers suggests that languages with fewer speakers may be more at risk, reinforcing the need for proactive measures to support such languages.

# Conclusion:

The code effectively demonstrates a machine learning pipeline that can help classify languages at risk of extinction based on their endangerment status. The results offer valuable insights into language preservation and serve as a foundation for future enhancements, such as integrating more robust datasets or utilizing more advanced modeling techniques for even better predictions.