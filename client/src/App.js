import {Route, Routes} from "react-router-dom";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Navigation from "./components/Navigation";
import Login from "./components/Login";

function App() {
    return (
        <div className="app">
            <Routes>
                <Route element={<Navigation/>}>

                <Route index element={<>
                    <Main/>
                    <Footer/>


                </>}/>

                    <Route path={'/login'} element={<>
                        <Login/>
                        <Footer/>
                    </>}/>
                </Route>

            </Routes>

        </div>
    );
}

export default App;
