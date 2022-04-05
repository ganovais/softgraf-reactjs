import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import './App.css';

const container = document.getElementById('root');

const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(<App />);
