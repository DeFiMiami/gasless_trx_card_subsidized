import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import './App.css';
import UserAddressOrSignIn from './account/UserAddressOrSignIn'
import {RecoilRoot} from "recoil"
import RecoilNexus from 'recoil-nexus'
import Profile from "./account/Profile";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import UserOperations from "./account/UserOperations";

import AddFunds from "./account/AddFunds";
import Deposits from "./account/Deposits";

function App() {
    return (
        <RecoilRoot>
            <RecoilNexus/>
            <div className="App">
                <Router>
                    <div className="list">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="add-funds-success">Page 1</Link></li>
                            <li><Link to="deposits">Deposits</Link></li>
                            <li><Link to="page3">Page 3</Link></li>
                        </ul>
                    </div>
                    <Routes>
                        <Route path="/" element={<h1>Home Page</h1>}/>
                        <Route path="add-funds-success" element={<Page1/>}/>
                        <Route path="deposits" element={<DepositsPage/>}/>
                        <Route path="page3" element={<Page3/>}/>
                    </Routes>
                </Router>
                <Profile/>
                <UserAddressOrSignIn/>
                <UserOperations/>
                <AddFunds/>
                <Deposits/>
            </div>
        </RecoilRoot>
    );
}


function Page1() {
    return (
        <div>
            <h1>Add Funds Success</h1>
        </div>
    )
}

function DepositsPage() {
    return (
        <Deposits/>
    )
}

function Page3() {
    return (
        <div>
            <h1>Page 3</h1>
        </div>
    )
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

export default App;
