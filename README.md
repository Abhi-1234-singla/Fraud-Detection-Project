# Intelligent Financial Fraud Detection System

## Overview
This project focuses on identifying fraudulent transactions within a financial dataset. It includes data exploration, feature analysis, preprocessing, and the training of a machine learning classification model to flag transactions as legitimate or fraudulent.

## Technologies Used
- **Programming Language**: Python 3
- **Data Manipulation & Analysis**: Pandas, NumPy
- **Data Visualization**: Matplotlib, Seaborn
- **Machine Learning**: Scikit-Learn (`LogisticRegression`, `Pipeline`, `ColumnTransformer`, `StandardScaler`, `OneHotEncoder`)
- **Environment**: Jupyter Notebook / Google Colab

## Key Features
- **Exploratory Data Analysis (EDA)**: Analyzes and visualizes the distribution of transaction types, transaction amounts, and their correlations with fraud occurrences.
- **Data Preprocessing**: Uses a Scikit-Learn pipeline to scale numerical features (`StandardScaler`) and encode categorical variables (`OneHotEncoder`).
- **Modeling**: Implements a `LogisticRegression` classifier with `class_weight="balanced"` to effectively handle the highly imbalanced nature of the fraud dataset.

## Project Structure
- `analysis_mode.ipynb`: The main Jupyter Notebook containing the data exploration, preprocessing, and modeling pipeline.
- `FraudDataset.csv`: The raw dataset containing financial transactions (expected in the working directory).
- `fraud_detection_model.pkl`: A serialized export of the trained machine learning model.

## How to Run
1. Ensure you have Python installed along with the necessary libraries (`pandas`, `numpy`, `matplotlib`, `seaborn`, `scikit-learn`).
2. Open the `analysis_mode.ipynb` notebook in your preferred environment (e.g., Jupyter Notebook, JupyterLab, or Google Colab).
3. Ensure the `FraudDataset.csv` dataset is located in the correct directory as referenced in the notebook.
4. Run the cells sequentially to reproduce the exploratory data analysis and train the model.
