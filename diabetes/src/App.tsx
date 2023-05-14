
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import Footer from './components/Footer'
import CheckAPI from './components/CheckAPI'
import Test from './components/Test'
import Diet from './components/Diet/Diet'
import BloodSugar from './components/BloodSugar/BloodSugar'
import Exercise from './components/Exercise/Exercise'
import CustomCalendar from './components/CustomCalendar'
import Week from './components/Week'
import WeekCalendar from './components/WeekCalendar'
import Timeline from './components/Timeline'
import Example from './components/Example'

function App() {

  return (
    <Router>
      {/* <input type="checkbox" id="side-menu" className="drawer-toggle"></input> */}
      <section className={`drawer-content`}>
            <Header></Header>
            <section className='main'>
              {/* <Suspense fallback={<Loader/>}> */}
                {/* <Routes>
                  <Route path='/' element={<MainPage datas={datas}></MainPage>}></Route>
                  {datas.map((item:dataType) => <Route path={`/product/${item.id}`} key={item.id} element={<ProductDetail item={item}></ProductDetail>}></Route>)} */}
                  {/* <Route path={`/product/:id`} element={<ProductDetail></ProductDetail>}></Route> */}
                  {/* {categoryList.map((category) => <Route path={`/${category.cat}`} key={category.cat} element={<CategoryPage category={category.title} datas={datas}></CategoryPage>}></Route>)} */}
                  {/* <Route path='/cart' element={<CartPage></CartPage>}></Route> */}
                  {/* <Route path='/grocery' element={<NotFound></NotFound>}></Route> */}
                  {/* <Route path='*' element={<NotFound></NotFound>}></Route> */}
                {/* </Routes> */}
              {/* </Suspense> */}
              <Routes>
                <Route path='/' element={<h1>Diabetes Home Page</h1>}></Route>
                <Route path='/signup' element={<Signup></Signup>}></Route>
                {/* <Route path='/login' element={<Login></Login>}></Route> */}
                <Route path='/login' element={<Login></Login>}></Route>
                <Route path='/check' element={<CheckAPI></CheckAPI>}></Route>
                <Route path='/test' element={<Test></Test>}></Route>
                <Route path='/diet' element={<Diet></Diet>}></Route>
                <Route path='/bloodsugar' element={<BloodSugar></BloodSugar>}></Route>
                <Route path='/exercise' element={<Exercise></Exercise>}></Route>
                <Route path='/week' element={<WeekCalendar></WeekCalendar>}></Route>
                <Route path='/timeline' element={<Timeline></Timeline>}></Route>
                {/* <Route path='/example' element={<Example></Example>}></Route> */}
              </Routes>
            </section>
            <Footer></Footer>
        </section>
        {/* <DrawerSide/> */}
      {/* <h1>Diabetes Home Page</h1> */}
      
      {/* <CreateAccountPage></CreateAccountPage> */}
    </Router>
  )
}

export default App
