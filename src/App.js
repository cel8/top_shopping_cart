import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './styles/App.css';

function App() {
  const curYear = new Date().getFullYear();

  return (
    <div className="App">
      <footer className="App-footer">
        <div>Copyright © {curYear} - Alessandro Celotti <a className="App-link" href="https://github.com/cel8"><FontAwesomeIcon icon={faGithub}/></a></div>
      </footer>
    </div>
  );
}

export default App;
