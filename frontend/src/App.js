import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/layout/header'
import Footer from './components/layout/footer'
import Home from './components/home'

function App() {
  return (
    <div className='App'>
      <Router>
        <Header></Header>
        <div className='container container-fluid'>
          <Route path='/' component={Home} exact></Route>
        </div>
        <Footer></Footer>
      </Router>
    </div>
  )
}

export default App
