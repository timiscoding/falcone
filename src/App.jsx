import Page from 'components/layout';
import { MissionProvider } from 'context';
import Routes from 'routes';

function App() {
  return (
    <MissionProvider>
      <Page>
        <Routes />
      </Page>
    </MissionProvider>
  );
}

export default App;
