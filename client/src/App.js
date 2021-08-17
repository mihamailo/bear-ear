import { Login } from './Login';
import { Dashboard } from './Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';


const code = new URLSearchParams(window.location.search).get('code')
if (!localStorage.getItem('code')) {
  localStorage.setItem('code', code)
} else if (!code) {
  window.location = 'https://accounts.spotify.com/authorize?client_id=fa0d93902a564439a586786b115df360&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'
}


function App() {
  return code ? <Dashboard code={code} /> : <Login />
}

export default App;
