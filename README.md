## Javascript Leaflet Map

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

## Logistic Regression Model

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

## Random Forest

Due to doubts on the reliability of the data used for Logistic Regression earlier, a separate dataset was used for a Random Forest model.
