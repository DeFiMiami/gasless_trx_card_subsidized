
import {signin} from "../Auth";

export { Login };

function Login() {


    return (
        <div>
            <button onClick={signin}>Sign In</button>
        </div>
    )
}