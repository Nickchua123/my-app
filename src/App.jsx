import Header from './components/Header'
import './index.css'
import Footer from './components/Footer'
import Banner from './components/Banner'
import DanhMuc from './components/DanhMuc'
import List from './components/List'
import Pagination from './components/ListAll'
import Hello from './Hello'

function App() {
  return (
    <div>
      <Header/>
      <div className="pt-35">
      <Banner />
      </div>
      <Pagination/>
      {/* <List title={"Pc Bán chạy"}/>
      <List title={"Màn hình Bán chạy"}/>
      <List title={"Bán phím Bán chạy"}/>
      <List title={"Chuột Bán chạy"}/> */}
      <Footer/>
      
    </div>
  );
}

export default App
