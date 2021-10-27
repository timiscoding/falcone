import { MissionProvider } from 'context';
import Routes from 'routes';

function App() {
  return (
    <MissionProvider>
      <Routes />
    </MissionProvider>
  );
}

export default App;
