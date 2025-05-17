# Byte Me: AI-Enhanced Expense Tracker

Byte Me helps users effortlessly track and manage their personal expenses through intuitive interfaces, insightful analytics, and a conversational AI assistant.

---

## 🚀 Project Overview

Daily expense tracking can be tedious and prone to error. Byte Me streamlines this by offering:

* **Quick Expense Entry**: Log purchases with minimal steps.
* **Automated Categorization**: Assign spending to categories for clarity.
* **Real-Time Insights**: View trends and breakdowns as you log.
* **Conversational Assistance**: Ask questions and get budgeting advice via an AI chatbot.

This solution targets individuals seeking control over their finances without the hassle of manual spreadsheets.

---

## 🎯 Core Features

* **Dashboard Metrics**:

  * Displays key figures: total spend, total savings, average daily/weekly/monthly expenditures.
  * Interactive time-range selector to view trends over custom periods (e.g., this week vs. last week).
  * Comparison cards highlighting change percentages from previous periods.

* **Category Breakdown**:

  * Pie and bar charts visualizing spend distribution by category (e.g., Food, Transport, Entertainment).
  * Top 3 categories by spend prominently featured.
  * Drill-down capability: click a category to see individual transactions and subcategory details.

* **Recurring Expenses**:

  * Schedule fixed payments (rent, subscriptions) on a daily, weekly, or monthly cadence.
  * View upcoming and past recurring transactions in a dedicated calendar view.
  * Easily pause or cancel individual recurring entries.

* **Budget Alerts**:

  * Define budget limits per category or overall monthly spending.
  * Push and email notifications when spending reaches 75%, 90%, and 100% of budgets.
  * Alert history log to review past warnings and user responses.

* **AI Chatbot**:

  * Natural-language interface for on-demand queries:

    * Sample prompts: “Show my top three expenses this month,” “Did I stay under my food budget?”
  * Context-aware recommendations, e.g., suggesting ways to reduce recurring costs.
  * Learning over time: remembers user preferences (e.g., preferred categories) to tailor responses.

---

## 💡 Use Cases

* **Monthly Budgeting**: Plan and monitor spending against a monthly budget.
* **Expense Auditing**: Review past transactions to identify cost-saving opportunities.
* **Goal Tracking**: Set and track savings goals, with progress updates.
* **On-the-Go Logging**: Quickly capture expenses immediately after purchase.
* **Financial Guidance**: Get tailored advice without needing a financial advisor.

---

## 🧱 Tech Stack

* **Frontend:** React, Vite, and TypeScript
* **Backend:** Python with Flask and Axios for client‑server communication
* **Database:** MongoDB for persistent data storage

## 🗂️ Project Structure

```
project-root/
├── Expense-Tracker/          # React + Vite frontend
│   ├── public/               # Static assets (HTML, icons)
│   ├── src/                  # Source code
│   │   ├── assets/           # Images and media
│   │   ├── components/       # Reusable React components
│   │   ├── styles/           # CSS/SCSS files
│   │   ├── App.css           # Global styles
│   │   ├── App.tsx           # Root React component
│   │   ├── api.ts            # API utility functions
│   │   ├── index.css         # Base styling
│   │   ├── main.tsx          # Entry point for React app
│   │   └── vite-env.d.ts     # Vite type declarations
│   ├── .gitignore
│   ├── README.md             # Frontend-specific README
│   ├── eslint.config.js      # Linting rules
│   ├── index.html            # HTML template
│   ├── package-lock.json
│   ├── package.json          # Frontend dependencies and scripts
│   ├── tsconfig.app.json     # TS config for application code
│   ├── tsconfig.json         # Base TS config
│   ├── tsconfig.node.json    # TS config for Node scripts
│   └── vite.config.ts        # Vite build configuration
│
├── __pycache__/              # Python bytecode cache
├── .env                      # Environment variables for backend
├── README.md                 # Project-wide documentation
└── app.py                    # Flask backend entrypoint
```

---

## 🔮 Future Scope

* **Mobile App**: Native iOS/Android apps for seamless tracking.
* **Receipt Scanning**: OCR to extract data from photographed receipts.
* **Bank Sync**: Automated import of transactions from financial institutions.
* **Advanced Analytics**: Predictive forecasting and spending anomaly detection.
* **Social Sharing**: Share achievements and savings milestones with a community.

---
