# Raptorx - Data Visualization Dashboard

## Overview
This project is a dynamic, configurable data visualization dashboard built using React.js. It allows users to create, rearrange, and customize components via drag-and-drop functionality, while saving the layout configuration for future use. The dashboard fetches and displays real-time cryptocurrency data from the CoinGecko API, offering a seamless and interactive user experience.

## Features

1. **Configurable Drag-and-Drop Layout**
   - Delete and rearrange components with ease.
   - Automatically adjusts layout upon component deletion.

2. **Real-Time Data Updates**
   - Cryptocurrency data fetched from the [CoinGecko API](https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd).
   - Data updates every 5 seconds to simulate real-time updates.

3. **Customizable Components**
   - **Table Component**: Responsive, sortable, and filterable table to display cryptocurrency data.
   - **Graph Component**: Bar chart to visualize price trends.
   - **Summary Cards**: High-level metrics such as highest/lowest prices and average market cap.

4. **Theme Toggle**
   - Switch between light and dark themes for a personalized experience.

5. **Responsive Design**
   - Fully responsive dashboard that adapts to different screen sizes.
   - Maintains grid structure and adjusts dynamically when components are added or removed.

## Installation

### Prerequisites
- Node.js (v20.14.0 or later)
- npm or yarn package manager

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/bogashirisha/raptorx.git
   cd raptorx
   ```

2. Install dependencies:
   ```bash
   npm install --force

3. Start the development server:
   ```bash
   npm run dev

4. Open your browser and navigate to `http://localhost:5173/`.

## Project Structure

```
.
├── src
│   ├── components
│   │   ├── Table.jsx          # Table component for displaying cryptocurrency data
│   │   ├── Graph.jsx          # Graph component for visualizing trends
│   │   ├── SummaryCard.jsx    # Card component for high-level metrics
│   │   └── cardData.jsx       # Fetching data and passing to SummaryCard.jsx
|   |   └── TaskCard.jsx       # Taskcard is for displaying all the cards
│   ├── styles
│   │   └── global.css        # Global styles
│   ├── utils
│   │   └── localStorage.js   # Utilities for handling JSON import/export and local storage
│   ├── App.js                # Main application component
│   └── index.js              # Entry point
├── public
│   └── index.html
└── package.json
```

## API Integration
The dashboard fetches data from the CoinGecko API endpoint:
```
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd
```
## Key Libraries
- **React.js**: Front-end framework for building UI components.
- **react-grid-layout**: Provides drag-and-drop functionality for the dashboard layout.
- **chart.js**: Used for creating interactive charts.
- **react-table**: For implementing the table component with sorting and filtering.

## How to Use

### Adding Components
1. Use the "+ Add Component" button to add new components to the dashboard.
2. Select the type of component (Table, Graph, or Summary Card).

### Rearranging Components
- Drag and drop components to rearrange them on the grid.

### Deleting Components
- Click the "Delete" button on a component to remove it from the dashboard.

### Theme Toggle
- Use the toggle switch in the settings menu to switch between light and dark themes.

## Future Enhancements
- Support for additional data visualization components.
- Advanced filtering options for the table.
- Enhanced accessibility features.



