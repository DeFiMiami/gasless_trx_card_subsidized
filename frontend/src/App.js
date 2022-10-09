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
                <h1>Pay for gas with credit card on all EVM blockchains</h1>
                <Router>
                    {/*<Routes>*/}
                    {/*    <Route path="/" element={<h1>Home Page</h1>}/>*/}
                    {/*    <Route path="add-funds-success" element={<Page1/>}/>*/}
                    {/*    <Route path="deposits" element={<DepositsPage/>}/>*/}
                    {/*    <Route path="page3" element={<Page3/>}/>*/}
                    {/*</Routes>*/}
                </Router>
                <UserAddressOrSignIn/>

            </div>
        </RecoilRoot>
    );
}

export default App;
