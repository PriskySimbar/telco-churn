# 📊 Telco Customer Churn Predictor — Frontend

A web application for predicting customer churn using a machine learning model exposed through a REST API.

The frontend provides an interactive form where users can enter customer information and receive a churn prediction, churn probability, and classification result from a deployed FastAPI machine learning backend.

## 🚀 Live Demo

**Frontend:**  
https://telco-churn-omega.vercel.app/

**Backend API:**  
https://jnyu77.kubeletto.app/

**Backend Repository:**  
https://github.com/PriskySimbar/telco-churn-api

---

## 📌 Overview

Customer churn prediction is a binary classification problem that aims to identify customers who are likely to discontinue a service.

This project provides a complete user-facing application for a churn prediction machine learning system.

Users enter customer information such as:

- Gender
- Senior Citizen
- Partner
- Dependents
- Tenure
- Phone Service
- Multiple Lines
- Internet Service
- Online Security
- Online Backup
- Device Protection
- Tech Support
- Streaming TV
- Streaming Movies
- Contract
- Paperless Billing
- Payment Method
- Monthly Charges
- Total Charges

The frontend sends this information to a deployed FastAPI backend, which processes the input through the trained machine learning pipeline and returns the prediction.

---

## 🏗️ System Architecture

```text
┌──────────────────────────────┐
│          User                │
│                              │
│  Customer information form   │
└──────────────┬───────────────┘
               │
               │ POST /predict
               ▼
┌──────────────────────────────┐
│       Next.js Frontend       │
│                              │
│  Form → JSON → API Request   │
└──────────────┬───────────────┘
               │
               │ HTTPS
               ▼
┌──────────────────────────────┐
│       FastAPI Backend        │
│        Kubeletto             │
│                              │
│       /predict endpoint      │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      ML Pipeline (.pkl)      │
│                              │
│ Preprocessing + Logistic     │
│ Regression                   │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        Prediction            │
│                              │
│ Churn class                  │
│ Churn probability            │
│ Decision threshold           │
└──────────────┬───────────────┘
               │
               ▼
        Next.js Frontend
               │
               ▼
          User Result
```

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- CSS
- Fetch API

### Backend

- FastAPI
- Python
- Scikit-learn
- Joblib
- Uvicorn

### Machine Learning

- Logistic Regression
- StandardScaler
- OneHotEncoder
- ColumnTransformer
- Scikit-learn Pipeline
- Threshold tuning

### Deployment

- Vercel — Frontend
- Kubeletto — Backend API
- Docker — Backend containerization
- GitHub — Source control

---

## 🔄 How It Works

### 1. User Input

The user enters customer information through the web interface.

### 2. Data Collection

The frontend collects the values from the form and constructs a JSON payload.

Example:

```json
{
  "gender": "Male",
  "SeniorCitizen": 0,
  "Partner": "Yes",
  "Dependents": "No",
  "tenure": 5,
  "PhoneService": "Yes",
  "MultipleLines": "No",
  "InternetService": "Fiber optic",
  "OnlineSecurity": "No",
  "OnlineBackup": "No",
  "DeviceProtection": "No",
  "TechSupport": "No",
  "StreamingTV": "Yes",
  "StreamingMovies": "Yes",
  "Contract": "Month-to-month",
  "PaperlessBilling": "Yes",
  "PaymentMethod": "Electronic check",
  "MonthlyCharges": 85.5,
  "TotalCharges": 256.5
}
```

### 3. API Request

The frontend sends the data to:

```text
POST https://jnyu77.kubeletto.app/predict
```

using the Fetch API.

### 4. Backend Prediction

FastAPI receives the request and passes the input into the trained machine learning pipeline.

### 5. Prediction Result

The backend returns information such as:

```json
{
  "prediction": "Yes",
  "churn_probability": 0.7782,
  "threshold": 0.4033179352921264
}
```

### 6. Result Display

The frontend displays the prediction to the user.

---

## 🤖 Machine Learning Model

The backend uses Logistic Regression for binary classification.

The model predicts:

```text
No  → Customer is predicted not to churn

Yes → Customer is predicted to churn
```

The model achieved:

### ROC-AUC

```text
0.8357
```

ROC-AUC measures how well the model separates churn and non-churn customers across classification thresholds.

---

## 🎯 Threshold Tuning

Instead of automatically using the default classification threshold of `0.50`, threshold tuning was performed to improve the F1-score for the churn class.

The selected threshold was approximately:

```text
0.4033
```

At this threshold:

```text
F1 Score : 0.6282
Precision: 0.5805
Recall   : 0.6845
```

The lower threshold prioritizes identifying more potential churn customers.

The threshold can therefore be interpreted as:

```text
P(churn) >= 0.4033
        ↓
Prediction = Yes

P(churn) < 0.4033
        ↓
Prediction = No
```

---

## 🌐 Deployment

The frontend is deployed using Vercel.

Every production deployment contains the Next.js application and communicates with the separately deployed FastAPI backend.

```text
GitHub
   ↓
Vercel
   ↓
Next.js Application
   ↓
FastAPI API
```

---

## 💻 Local Development

### Prerequisites

- Node.js
- npm

### Clone Repository

```bash
git clone https://github.com/PriskySimbar/telco-churn.git
cd telco-churn
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🔐 Environment Variables

The production API URL can be configured using:

```env
NEXT_PUBLIC_API_URL=https://jnyu77.kubeletto.app
```

The frontend then sends prediction requests to:

```text
${NEXT_PUBLIC_API_URL}/predict
```

---

## 📁 Project Structure

```text
telco-churn/
│
├── app/
│   ├── page.tsx
│   └── ...
│
├── public/
│
├── .gitignore
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## 🎯 Project Goals

This project was built to demonstrate the integration of:

1. Machine learning
2. REST API development
3. Frontend development
4. Docker containerization
5. Cloud deployment
6. API integration

The goal is not only to train a machine learning model but to expose the model as a usable application.

---

## 📚 What I Learned

Through this project, I practiced:

- Building a binary classification model
- Evaluating classification performance
- Understanding precision, recall, and F1-score
- ROC-AUC evaluation
- Classification threshold tuning
- Building reusable ML pipelines
- Saving models using Joblib
- Creating REST APIs with FastAPI
- Connecting a frontend to a machine learning API
- Containerizing ML applications using Docker
- Deploying APIs to the cloud
- Deploying Next.js applications to Vercel
- Designing an end-to-end ML application architecture

---

## 🔗 Related Repository

The machine learning API is maintained separately:

https://github.com/PriskySimbar/telco-churn-api

---

## 👤 Author

**Prisky Simbar**

Computer Science Student  
Interested in Machine Learning, AI Engineering, and Full-Stack Development.
