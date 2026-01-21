# Experiment Data Collection System

A browser-based experiment system that collects detailed interaction timing data across multiple pages.

## Running Locally

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser at `http://localhost:5173`

To test on mobile devices on the same network, use:
```bash
npm run dev -- --host
```

## Docker

Build the image:
```bash
docker build -t experiment-app .
```

Run the container:
```bash
docker run -p 8080:80 experiment-app
```

Access at `http://localhost:8080`

## Design

Made the UI design using Figma: [View Design](https://www.figma.com/design/sWNi6ThBXZgP84UKNawGXF/Experiment-Data-Collection-System?node-id=0-1&t=gSx7X2krvh9ybEic-1)

## Architecture Decisions

**State Management**: Used React Context API for experiment data flow instead of prop drilling. This keeps the state logic centralized and makes it easy to access from any page.

**Navigation**: Implemented forward-only routing with React Router. Users can't go back during an experiment, but can return home (which discards current data). This prevents data corruption from back-navigation.

**Data Storage**: LocalStorage persists completed experiments in the browser. Each experiment gets a unique ID and all timestamps are stored in UTC format.

**First Click Tracking**: Separated first-click detection from button-click recording using a document-level event listener. This captures any click on the page without polluting the button interaction data.

**Responsive Design**: Used Material-UI's responsive breakpoints to adapt card sizes for different screen sizes (mobile, tablet, laptop, desktop).

**Type Safety**: For example, I created a `ButtonType` type to distinguish between Likert buttons, random-word buttons, and submit actions throughout the codebase.
