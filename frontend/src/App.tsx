import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="App">
            <Router>
                <div className="list">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="page1">Page 1</Link></li>
                        <li><Link to="page2">Page 2</Link></li>
                        <li><Link to="page3">Page 3</Link></li>
                    </ul>
                </div>
                <Routes>
                    <Route path="/" element={<h1>Home Page</h1>}/>
                    <Route path="page1" element={<Page1/>}/>
                    <Route path="page2" element={<Page2/>}/>
                    <Route path="page3" element={<Page3/>}/>
                </Routes>
            </Router>
        </div>
    );
}

function Page1() {
    return (
        <div>
            <h1>Page 1</h1>
            <form action="/create-checkout-session" method="POST">
                <button type="submit" id="checkout-button">Checkout</button>
            </form>
        </div>
    )
}

function Page2() {
    return (
        <div>
            <h1>Page 2</h1>
        </div>
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
