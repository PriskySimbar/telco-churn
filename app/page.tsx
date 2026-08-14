"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    gender: "Male",
    SeniorCitizen: 0,
    Partner: "No",
    Dependents: "No",
    tenure: 3,
    PhoneService: "Yes",
    MultipleLines: "No",
    InternetService: "Fiber optic",
    OnlineSecurity: "No",
    OnlineBackup: "No",
    DeviceProtection: "No",
    TechSupport: "No",
    StreamingTV: "Yes",
    StreamingMovies: "Yes",
    Contract: "Month-to-month",
    PaperlessBilling: "Yes",
    PaymentMethod: "Electronic check",
    MonthlyCharges: 85.5,
    TotalCharges: 256.5,
  });

  const [result, setResult] = useState<{
    prediction: string;
    churn_probability: number;
    threshold: number;
  } | null>(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "SeniorCitizen" ||
        name === "tenure" ||
        name === "MonthlyCharges" ||
        name === "TotalCharges"
          ? Number(value)
          : value,
    }));
  };

  const predictChurn = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("https://jnyu77.kubeletto.app/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Gagal menghubungi FastAPI");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">
        <h1 className="mb-2 text-3xl font-bold">Customer Churn Predictor</h1>

        <p className="mb-8 text-gray-500">
          Predict whether a customer is likely to churn.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
          />

          <Input
            label="Senior Citizen"
            name="SeniorCitizen"
            type="number"
            value={form.SeniorCitizen}
            onChange={handleChange}
          />

          <Select
            label="Partner"
            name="Partner"
            value={form.Partner}
            onChange={handleChange}
            options={["Yes", "No"]}
          />

          <Select
            label="Dependents"
            name="Dependents"
            value={form.Dependents}
            onChange={handleChange}
            options={["Yes", "No"]}
          />

          <Input
            label="Tenure (months)"
            name="tenure"
            type="number"
            value={form.tenure}
            onChange={handleChange}
          />

          <Select
            label="Phone Service"
            name="PhoneService"
            value={form.PhoneService}
            onChange={handleChange}
            options={["Yes", "No"]}
          />

          <Select
            label="Multiple Lines"
            name="MultipleLines"
            value={form.MultipleLines}
            onChange={handleChange}
            options={["Yes", "No", "No phone service"]}
          />

          <Select
            label="Internet Service"
            name="InternetService"
            value={form.InternetService}
            onChange={handleChange}
            options={["DSL", "Fiber optic", "No"]}
          />

          <Select
            label="Online Security"
            name="OnlineSecurity"
            value={form.OnlineSecurity}
            onChange={handleChange}
            options={["Yes", "No", "No internet service"]}
          />

          <Select
            label="Online Backup"
            name="OnlineBackup"
            value={form.OnlineBackup}
            onChange={handleChange}
            options={["Yes", "No", "No internet service"]}
          />

          <Select
            label="Device Protection"
            name="DeviceProtection"
            value={form.DeviceProtection}
            onChange={handleChange}
            options={["Yes", "No", "No internet service"]}
          />

          <Select
            label="Tech Support"
            name="TechSupport"
            value={form.TechSupport}
            onChange={handleChange}
            options={["Yes", "No", "No internet service"]}
          />

          <Select
            label="Streaming TV"
            name="StreamingTV"
            value={form.StreamingTV}
            onChange={handleChange}
            options={["Yes", "No", "No internet service"]}
          />

          <Select
            label="Streaming Movies"
            name="StreamingMovies"
            value={form.StreamingMovies}
            onChange={handleChange}
            options={["Yes", "No", "No internet service"]}
          />

          <Select
            label="Contract"
            name="Contract"
            value={form.Contract}
            onChange={handleChange}
            options={["Month-to-month", "One year", "Two year"]}
          />

          <Select
            label="Paperless Billing"
            name="PaperlessBilling"
            value={form.PaperlessBilling}
            onChange={handleChange}
            options={["Yes", "No"]}
          />

          <Select
            label="Payment Method"
            name="PaymentMethod"
            value={form.PaymentMethod}
            onChange={handleChange}
            options={[
              "Electronic check",
              "Mailed check",
              "Bank transfer (automatic)",
              "Credit card (automatic)",
            ]}
          />

          <Input
            label="Monthly Charges"
            name="MonthlyCharges"
            type="number"
            step="0.01"
            value={form.MonthlyCharges}
            onChange={handleChange}
          />

          <Input
            label="Total Charges"
            name="TotalCharges"
            type="number"
            step="0.01"
            value={form.TotalCharges}
            onChange={handleChange}
          />
        </div>

        <button
          onClick={predictChurn}
          disabled={loading}
          className="mt-8 w-full rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Predicting..." : "Predict Churn"}
        </button>

        {result && (
          <div className="mt-8 rounded-xl border p-6">
            <p className="text-sm text-gray-500">Prediction</p>

            <h2 className="mt-1 text-3xl font-bold">
              {result.prediction === "Yes"
                ? "High Churn Risk"
                : "Low Churn Risk"}
            </h2>

            <p className="mt-4 text-lg">
              Churn Probability:{" "}
              <strong>{(result.churn_probability * 100).toFixed(2)}%</strong>
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Decision threshold: {(result.threshold * 100).toFixed(2)}%
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function Input({
  label,
  name,
  type = "text",
  step,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  step?: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>

      <input
        className="w-full rounded-lg border px-3 py-2"
        name={name}
        type={type}
        step={step}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  options,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>

      <select
        className="w-full rounded-lg border px-3 py-2"
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
