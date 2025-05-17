# AI-Enhanced Expense Tracker

The Expense Tracker helps users effortlessly track and manage their personal expenses through intuitive interfaces, insightful analytics, and a conversational AI assistant.

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

  * Toggleable chat window accessible via a floating button.
  * Embedded via an <iframe> pointing to a Chatbase chatbot service for instant conversational assistance.
  * Handles natural-language queries and offers personalized budgeting advice.
  * Styled and controlled with React state (useState) and custom CSS for seamless user experience.
    
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


---

## Screenshots

### 1. **Login Page**  
   User authentication screen with email/password fields.

![Screenshot 2025-05-04 172343](https://github.com/user-attachments/assets/43f7bd9e-61df-4b2c-acc9-3af443d32a75)

### 2. **Main Dashboard**  
   Overview with buttons to add/view incomes, expenses, reminders, goals and summary charts.

![Screenshot 2025-05-04 172449](https://github.com/user-attachments/assets/901602ff-91fd-4330-bf1c-d96322747c60)

### 3. **Add New Expense**  
   Form to input a new expense entry (amount, category, date).

![Screenshot 2025-05-04 172543](https://github.com/user-attachments/assets/db543dab-fac1-4d81-9f51-b9c08c897a21)

### 4. **Add New Income**  
   Form to log a new income entry (source, amount, date).

![Screenshot 2025-05-04 172558](https://github.com/user-attachments/assets/f4395969-63d6-4f41-9a2b-a13f21a94c33)

### 5. **Dashboard Celebration**  
   Confetti animation celebrating a successfully added income.

![Screenshot 2025-05-04 172624](https://github.com/user-attachments/assets/c02dbb90-a43e-4558-8f0b-9cf970521d69)

### 6. **Set New Goal**  
   Interface for defining and tracking a financial savings goal.

![Screenshot 2025-05-04 172654](https://github.com/user-attachments/assets/2d906a18-e24e-422f-9828-321800cc51cb)

### 7. **Add New Reminder**  
   Scheduler for creating upcoming payment or budget reminders.

![Screenshot 2025-05-04 172710](https://github.com/user-attachments/assets/285ad718-70af-44f6-a2ee-932857180ee5)

### 8. **Expenses Page**  
   List of past expenses with filters for category, date, and amount.

![Screenshot 2025-05-04 172728](https://github.com/user-attachments/assets/65fe1c78-e8e9-496f-b380-1fd047b2a02b)

### 9. **Incomes Page**  
   Current month’s total income summary with history of past entries.

![Screenshot 2025-05-04 172803](https://github.com/user-attachments/assets/1d2dbc82-e803-4e87-872a-5fe1faeafb61)

### 10. **Goals Page**  
    View of ongoing, completed, and unachieved financial goals.

![Screenshot 2025-05-04 172826](https://github.com/user-attachments/assets/513683e8-b7f2-4e6e-9400-fc81f5899b06)

### 11. **AI Financial Insights**  
    AI‑powered prediction of next month’s expenses based on your history.

![Screenshot 2025-05-04 172908](https://github.com/user-attachments/assets/091328fd-3280-413f-88aa-d910f0eb03c6)

### 12. **Chatbot Advice**  
    Interactive chatbot offering real‑time, personalized financial tips.
    
![Screenshot 2025-05-04 173031](https://github.com/user-attachments/assets/b9d3b814-510e-4156-8782-006b59baedd1)

---

## 🔌 Key API Endpoints

- **POST** `/login` – authenticate and receive a JWT.  
- **POST** `/signup` – create a new user account.  
- **GET**  `/monthlyIncome` & `/monthlyExpenses` – grab your totals for the current month.  
- **POST** `/addIncome` & `/addExpense` – record an income or an expense.
- **GET**  `/getIncomes` – list all your income entries.  
- **GET**  `/expenses` – list all your expense entries (supports filters).
- **DELETE** `/deleteIncome/:incomeId` – remove an income entry by ID.  
- **DELETE** `/deleteExpense/:expenseId` – remove an expense entry by ID.  
- **GET**  `/expenseBreakdown` – see your spend broken out by category.  
- **GET**  `/aiBudgetTips` – fetch AI‑powered budgeting advice.  
- **PUT**  `/updateSavingsPercentage` – set your target savings rate.  

---

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
