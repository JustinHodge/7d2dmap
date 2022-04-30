import './App.css';
import ContentPanel from './components/ContentPanel';
import ControlBar from './components/ControlBar';
import HeaderBar from './components/Header';
import MapRender from './components/MapRender';

function App() {
    return (
        <div className='App'>
            <HeaderBar />
            <ContentPanel>
                <ControlBar />
                <MapRender />
            </ContentPanel>
        </div>
    );
}

export default App;
