import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/footer'
import Home from './components/Home'
import ProductDetail from './components/product/ProductDetail'

function App() {
  return (
    <div className='App'>
      <Router>
        <Header></Header>
        <div className='container container-fluid'>
          <Route path='/' component={Home} exact></Route>
          <Route path='/search/:keyword' component={Home}></Route>
          <Route path='/product/:id' component={ProductDetail} exact></Route>
        </div>
        <Footer></Footer>
      </Router>
    </div>
  )
}

export default App
