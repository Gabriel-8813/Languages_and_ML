# Introduction: 
 
In an increasingly globalized world, understanding linguistic diversity is crucial for 
preserving cultural heritage and facilitating communication. This project aims to 
investigate the most widely spoken languages and those at risk of extinction using 
machine learning techniques. By analyzing the prevalence of languages, we can 
shed light on the factors contributing to language vitality and identify opportunities for 
language preservation.


# Objectives: 
●  To analyze and visualize the current status of the world's most widely spoken 
languages compared to those at risk of extinction. 
 
●  To employ machine learning techniques to classify languages based on their 
attributes and predict which languages are more likely to face extinction. 
 
●  To predict the language growth over the next years using various factors such 
as population growth, immigration patterns, social and economic strengths.  
 
●  To provide insights for academics and future research efforts on how to 
prioritize language preservation efforts.


# Javascript Leaflet Map

An interactive visualisation of Endangered languages across the world was created using Leaflet.js and OpenStreetMap. The plotMarkers fucntion was used in Javascript to display the approximate coordinates/location of the spoken language as markers on an interactive map. The getColor function was also used to colour-code the markers, and highlight the degree of endangerment:

* Green: Vulnerable Languages
* Yellow: Endangered Languages
* Orange: Severely Endangered Languages
* Red: Critically Endangered Languages
* Black: Extinct Languages

Furthermore, the size of the markers indicate the number of language speakers. The marker.bindPopup() function was also used in Javascript, so that markers can also be clicked to give a snapshot of the data via a popup.

The data used for this visualisation was sourced via Kaggle (https://www.kaggle.com/datasets/the-guardian/extinct-languages/data). Minimal cleaning was required for the dataset. Javacript functions such as L.tileLayer were used to incorporate OpenStreetMap for this visualisation.

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
* Elcat_data.csv: Data from 2023, including language names, ISO codes, endangerment levels and speaker counts (https://www.kaggle.com/datasets/the-guardian/extinct-languages/data)
* Kaggle_data.csv: Data from 2024, including language names, ISO codes, endangerment levels and speaker counts ((https://www.endangeredlanguages.com/userquery/)

This project applies Logistic Regression to predict the future endangerment status of languages based on speaker trends. 

However, due to the limitations of data, especially Year-on-year data in the same format, for simplicity, the Kaggle Data was denoted as 2024 data, and the Elcat data was denoted as 2023 data. Both datasets were loaded into a Pandas Dataframe and cleaned thoroughly. Some unnecessary columns were dropped. Unnecessary characters such as commas, '-', '~' and '<>' were removed and the speaker counts were converted to numerical formats. The datasets were merged using an inner join on the internationally-recognized ISO codes for languages.

Due to some abnormal outliers in the data, % change was capped at 100%. This was a consequence of missing and a lack of ease in access to readily available data from free resources. Therefore, in cases where some data was missing, synthetic data was also used sparingly, using upto 10% change in count of the available year's data.

### Encode the Target Variable
Data from 2023 - 2024 is being analyzed in this model, using historical speaker counts to classify languages into categories based on endangerment levels.

The "Degree of Endangerment" is a categorical variable in our model, so the LabelEncoder tool from sklearn.preprocessing is used to convert it into numerical format. This step allows Logistic Regression to process categorical labels. 

Once the features and target ( x and y variables) for the model have been defined,train_test_split function from sklearn.model_selection is used to split the data into training and test sets. The model has been structured to train on 80% of the data, and test on 20% of the encoded data. 
Once the features and target ( x and y variables) for the model have been defined, 

### Result

The baseline model was run with only 1000 iterations. However, the results showed an accuracy of only 40.2%. The results also seemed to be a bit biased towards the critically endangered category, which had a 95% recall. The Vulnerable & Severely Endangered categories also performed poorly, having low recall and precision. The Extinction category was also deemed irrelevant in this result.

## Logistic Regression - Optimization

Due to the underwhelming results from the baseline model, some modifications were made to improve the accuracy.

The baseline model only used raw speaker counts from 2023 and 2024, which does not capture trends over time. Therefore, the "Speaker Change (%)" was added, which measures the growth or decline in speakers between 2023 and 2024. Another feature in the form ["Degree of endangerment_2023_encoded"] was also coded and added to the model.

The SMOTE tool from imblearn.over_sampling was also used to balance the dataset. For example, the Extinct category was deemed virtually irrelevant in the baseline attempt. Generating synthetic samples using SMOTE can balance the dataset. It can therefore generate more samples for underrepresented classes, improving recall.

Finally, to maximise the effectiveness of the model, the iterations were increased to 5000.

### Result

However, despite these steps, the accuracy in the optimized decreased to 32.9%, marking a significant deterioration from the baseline model. The optimized model did actaully improve recall, but due to the nature of the data and possibly also synthetic values, accuracy decreased.

Due to the overall significant degree of inaccuracy in the model, no further attempts at optimization were made. Other models were explored instead.

# XGBoost
Relevant files: languages.ipynb

A second attempt at improving overall accuracy was made with XGBoost. The same Kaggle data used for the Logistic Regression earlier was used. 

### Data Preprocessing

The data was loaded into a Pandas Dataframe and cleaned to forward fill Nan values with the fillna(method='ffill') function. The unique values of "Degree of endangerment" are also identified and printed.

These Degrees of Endangerment are then mapped to numeric values and encoded accordingly with the LabelEncoder tool from sklearn.preprocessing.

The x and y variables were also defined. Features (x) were chosen as the Number of Speakers and Countries.
The target variable (y) was defined as the Degree of Endangerment.
The train_test_split function was used to create a 80:20 training:testing split

### Result

The XGBoost model yielded an accuracy of only 49%. Though this is an improvement over the Logistic Regression Model, it is still not an ideal result. And despite efforts to optimize the XGBoost model, only 49% accuracy could be obtained.

# Random Forest
Relevant files:
* Data_Collection_and_Preprocessing.ipynb
* RandomForest_Model.ipynb

Due to doubts on the reliability of the data used for Logistic Regression and XGBoost earlier, further data exploration was conducted in order to find more reliable data before attempting a Random Forest model. The following data exploration was mapped:

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

After cleaning, an outer merge was done on the Endangered Languages and Widely Spoken Languages datasets and finally the data was combined with the original dataset used previously. The merged dataset was stored as df_languages. Some additional cleaning was done to this, to get it ready for the Random Forest Model.

## Random Forest Implementation

The clean data is loaded into a Pandas Dataframe. Next the OneHotEncoder tool from sklearn.preprocessing was used to convert categorical variables of ['Language', 'Countries',] into numerical representations. Then the pd.concat function is used to merge these encoded variables with the other numerical variables.

Next the X and y variables are defined. 

The features set (x) is defined by the transformed dataset containing numerical values and encoded categorical features
The target variable (y) is defined as the ['Degree of endangerment'] column.

Next the train_test_split function was used to split the dataset into training and testing splits, with a default ratio of 75:25.

The StandardScaler tool from sklearn.preprocessing was applied to normalize the feature values. 

Next the RandomForestClassifier tool from sklearn.ensemble was used to create a model with 500 estimators. The predict(X_test_scaled) function is used to make the predictions.

### Results

Running the model yields the following results:

* Accuracy: 0.75
* Precision: 0.66
* Recall: 0.75
* F1-Score: 0.70

A classification report and Confusion Matrix also shed more detail on the results. Overall, this is a significant improvement over the results of the Logistic Regression model.

In addition to an overall accuracy of 75%, we can see that the model also performs well for Languages labeled as Extinct or Safe, both having perfect precision and recall. However it was the opposite case with Severely endangered and vulnerable categories, indicating this data was not well detected.

### Feature Importance Analysis

A feature importance analysis was done to ascertain the most important features in our data. The most important feature was found to be the ['Number of Speakers'].

## Random Forest - Optimization

In an effort to further optimize the model, the GridSearchCV tool was used from sklearn.model_selection to optimize the hyperparameters. GridSearchCV tested 108 different models and found the best parameters to use. However, even after retraining the model with these best parameters, accuracy decreased to 74%.

This may be due to the limitations of the dataset used. Data imblalance for some categories may have led to poor recall for some endangerment classes, such as the Severely Endangered class.   

The 75% accuracy from the baseline Random Forest Model is the best result so far and is a viable result. And since optimization is proving counter-productive, no further optimization was conducted.


# Discussion of results

 Using the Random Forst Model, we were able to achieve 75% accuracy. Our model was essentially able to correctly classify 75% of the languages in our data. The high recall rate for safe and critically endangered languages indicates our model was adequately able to identify all cases in this class. We also have a good recall rate for the Definitely Endangered class. 

However, the model is unable to classify the Vulnerable and Severely Endangered classes. These inconsistencies can be explained by class imbalances, as some categories have fewer samples than others. The model also favours larger classes such as critically endangered and safe, leading to poor recall for other smaller classes. Looking at the Confusion Matrix, it's also possible that the model misclassifies Definitely Endangered Languages as Critically Endangered, which could explain their recall rates.

Another potential issue could be bias toward speaker count, as it is by far the most important feature. This may also explain why some classes are misclassified, as they may have similar speaker counts to other categories. However this issue is unavoidable in this project, due to the lack of adequate data. Accessing readily available data has been a consistent issue throughout this project. More readily available data from free resources may have prevented these issues.

# Conclusion

The project effectively demonstrates a machine learning pipeline that can help classify languages at risk of extinction based on their endangerment status. Overall, we can conclude that languages with very few speakers are consistently classified as more endangered, meaning speaker count is a strong predictor of language decline. However, there is not enough data to forecast future trends.

The results offer valuable insights into language preservation and serve as a foundation for future enhancements, such as integrating more robust datasets or utilizing more advanced modeling techniques for even better predictions. Future attempts at this topic with access to more abundant data from paid sources should be able to incorporate a Time-Series Analysis to gauge language growth/decline in the future. More premium data in future studies could also overcome the issues faced due to class imbalances in this project. Similarly, future studies with access to more historical data may also be able to predict extinction rates, which can be greatly beneficial in linguistic preservation efforts. Larger studies with better data access may also be able to incorporate demographic trends to analyse their impact on languages. 