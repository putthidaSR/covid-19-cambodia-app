import React from 'react';
import Routes from './routes';

/**
 * The first component that the application will render when the app is loaded.
 */
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Routes />;
  }
}

export default App;
