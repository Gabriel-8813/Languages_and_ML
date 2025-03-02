# Javascript Leaflet Map

An interactive visualisation of Endangered languages across the world was created using Leaflet.js and OpenStreetMap. The plotMarkers fucntion was used in Javascript to display the approximate coordinates/location of the spoken language as markers on an interactive map. The getColor function was also used to colour-code the markers, and highlight the degree of endangerment:

* Green: Vulnerable Languages
* Yellow: Endangered Languages
* Orange: Severely Endangered Languages
* Red: Critically Endangered Languages
* Black: Extinct Languages

Furthermore, the size of the markers indicate the number of language speakers. The marker.bindPopup() function was also used in Javascript, so that markers can also be clicked to give a snapshot of the data via a popup.

The data used for this visualisation was sourced via Kaggle. Minimal cleaning was required for the dataset. Javacript functions such as L.tileLayer were used to incorporate OpenStreetMap for this visualisation.

File Structure:
* index.html: Main HTML page containing the map.
* style.css: Custom styles for map layout.
* logic.js: JavaScript file containing the Leaflet functions to render the map.
* endangered_languages.csv: Primary CSV dataset sourced via Kaggle.

Due to a CORS issue when opening the Javascript Leaflet index html directly on Chrome, a local web server was used instead. 

1) Navigating to the Javascript Leaflet folder, on GitBash 
2) Run the following on GitBash: python -m http.server 5000
3) Paste this link in your browser: http://localhost:5000/map.html

# Logistic Regression Model

Relevant files:
* Logistic Regression.ipynb: Python script for data preprocessing, feature engineering, model training, evaluation and optimization.
* Elcat_data.csv: Data from 2023, including language names, ISO codes, endangerment levels and speaker counts.
* Kaggle_data.csv: Data from 2024, including language names, ISO codes, endangerment levels and speaker counts.

This project applies Logistic Regression to predict the future endangerment status of languages based on speaker trends. In addition to the Kaggle data used for the Javascript Leaflet visualisation map, an addition dataset was used from the Endangered Languages Project (Elcat) (https://www.endangeredlanguages.com/userquery/).

However, due to the limitations of data, especially Year-on-year data in the same format, for simplicity and because no publishing date was available on the websites, the Kaggle Data was denoted as 2024 data, and the Elcat data was denoted as 2023 data. Both datasets were loaded into a Pandas Dataframe and cleaned thoroughly. Some unnecessary columns were removed. Unnecessary characters such as commas, '-', '~' and '<>' were removed and the speaker counts were converted to numerical formats. Then both datasets were merged into the merged_csv dataset, using an inner join on the internationally-recognized ISO codes for languages. However, this did reduce the dataset to 1800 records, due to incomplete data and difficulty in obtaining data.

To create useful input features, the percentage change in speakers was calculated. Due to some abnormal outliers in the data, % change was capped at 100%. This was a consequence of missing and a lack of ease in access to readily available data from free resources. Therefore, in cases where some data was missing, synthetic data was also used sparingly, using upto 10% change in count of the available year's data.

Encode the Target Variable
Data from 2023 - 2024 is being analyzed in this model, using historical speaker counts to classify languages into the following categories:

* Vulnerable
* Definitely Endangered
* Severely Endangered
* Critically Endangered
* Extinct

The "Degree of Endangerment" is a categorical variable in our model, so the LabelEncoder tool from sklearn.preprocessing is used to convert it into numerical format. This step allows Logistic Regression to process categorical labels. 

Then the features and target for the x and y variables in the model are defined. Features (x) are defined as ["Speaker Change (%)", "Number of speakers 2024", "Number of speakers (2023)", "Degree of endangerment_2023_encoded"].

The target (y) is defined as "Degree of endangerment_2024_encoded". Next the train_test_split function from sklearn.model_selection is used to split the data into training and test sets. The model has been structured to train on 80% of the data, and test on 20% of the encoded data. 

The baseline model was run with only 1000 iterations. However, the results showed an accuracy of only 40.2%. The results also seemed to be a bit biased towards the critically endangered category, which had a 95% recall. The Vulnerable & Severely Endangered categories also performed poorly, having low recall and precision. The Extinction category was also deemed irrelevant in this result.

## Logistic Regression - Optimization

Due to the underwhelming results from the baseline model, some modifications were made to improve the accuracy.

The baseline model only used raw speaker counts from 2023 and 2024, which does not capture trends over time. Therefore, the "Speaker Change (%)" was added, which measures the growth or decline in speakers between 2023 and 2024. Another feature in the form ["Degree of endangerment_2023_encoded"] was also coded and added to the model.

The SMOTE tool from imblearn.over_sampling was also used to balance the dataset. For example, the Extinct category was deemed virtually irrelevant in the baseline attempt. Generating synthetic samples using SMOTE can balance the dataset. It can therefore generate more samples for underrepresented classes, improving recall.

Finally, to maximise the effectiveness of the model, the iterations were increased to 5000.

However, despite these steps, the accuracy in the optimized decreased to 32.9%, marking a significant deterioration from the baseline model. The optimized model did actaully improve recall, but due to the nature of the data and possibly also synthetic values, accuracy decreased.

Due to the overall significant degree of inaccuracy in the model, no further attempts at optimization were made. Other models were explored instead.

# Random Forest

Due to doubts on the reliability of the data used for Logistic Regression earlier, further data exploration was conducted in order to find more reliable data before attempting a Random Forest model. The following data was utilized:

* Duolingo Data
* UN Population Data
* Endangered Languages data
* Widely Spoken Languages data
* Scraped Web Data:
    * Languages Used on the Internet: Extracted from Wikipedia using BeautifulSoup.
    * Official Languages by Country: Extracted from Wikipedia.
    * Countries by Population Growth Rate: Extracted from Wikipedia.

The primary data collection methods were:
* Loading CSV files from the internet into a Pandas DataFrames.
* Web scraping using requests and BeautifulSoup to fetch tables from Wikipedia pages.
* Data extraction and formatting to convert raw web-scraped data into structured CSV files.

### Web Scraping
Beautiful Soup was used to scrape data from Wikipeida and two additional datasets were collected:

* Languages Used on the Internet (from Wikipedia)
    * Extracted language names and their percentage usage on websites.
    * Stored in df_languages_internet and saved as a CSV file.
* Official Languages by Country (from Wikipedia)
    * Extracted country names and their official languages.
    * Cleaned and stored in df_languages.

A third dataset on Population Growth Rates by Country was also scraped, processed, and saved.

### Data Cleaning & Preprocessing

The raw datasets contained inconsistencies that required processing before analysis

Processing the Widely Spoken & Endangered Languages Datasets:
* Dropped unnecessary columns: Removed attributes like "Family", "Branch", and separate L1/L2 speaker counts.
* Renamed columns: Changed "Total speakers (L1+L2)" to "Total_Speakers".
* Converted numerical values: Transformed text-based numbers (e.g., "1.2 billion") into float values.
* Handled missing values: Filled NaN values in "Total_Speakers" with an estimated placeholder value (1000).
* After the datasets were cleaned, they were merged

Processing Population Growth Rate Data
* Extracted country names and growth rates from the scraped Wikipedia table.
* Removed unwanted characters (e.g., asterisks in country names).
* Stored cleaned data in a new CSV file for easier integration.

Data Merging

After cleaning, an outer merge was done on the Endangered Languages and Widely Spoken Languages datasets. The merged dataset was stored as df_languages. Some additional cleaning was done to this, and finally the df_language_final.csv was ready for the Random Forest Model.




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