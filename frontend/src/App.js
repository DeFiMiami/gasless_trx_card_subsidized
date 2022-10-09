import './App.css';
import MainPageOrSignIn from './account/MainPageOrSignIn'
import {RecoilRoot, useRecoilState} from "recoil"
import RecoilNexus from 'recoil-nexus'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {userAddressAtom} from "./state";
import Button from 'react-bootstrap/Button';
import {signout} from "./actions";

function LogoutButton(props) {
    const [userAddress] = useRecoilState(userAddressAtom);
    if (userAddress != null) {
        return <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                {userAddress}
            </Navbar.Text>
            &nbsp;
            <Button onClick={signout}>Sign out</Button>
        </Navbar.Collapse>;
    }
    return (<p/>);
}

function App() {

    return (
        <RecoilRoot>
            <RecoilNexus/>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand><img className="logo" src={"/GoGasCover.png"}></img></Navbar.Brand>
                    <LogoutButton/>

                </Container>
            </Navbar>
            <div className="container-fluid">
                <div className="App">
                    <h1>Pay for transaction gas with a credit card</h1>
                    <p>(compatible with all EVM blockchains)</p>

                    <MainPageOrSignIn/>
                </div>
            </div>
        </RecoilRoot>
    );
}

export default App;
