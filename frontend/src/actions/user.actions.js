import {useRecoilState, useSetRecoilState, useResetRecoilState} from 'recoil'
import {authAtom, usersAtom, userAtom} from '../state'
import axios from "axios";

export {useUserActions}

function useUserActions() {
    const [auth, setAuth] = useRecoilState(authAtom);
    const setUsers = useSetRecoilState(usersAtom);
    const setUser = useSetRecoilState(userAtom);

    return {
        login,
        logout
    }

    function login({msgParams, sig}) {
        return axios.post('/signin',
            {msgParams: msgParams, sig: sig},
            {
                headers: {'Content-Type': 'application/json'}
            })
            .then(response => {
                const accessToken = response.data.accessToken
                localStorage.setItem('accessToken', accessToken);
                setAuth(accessToken);
            });
    }

    function logout() {
        // remove user from local storage, set auth state to null and redirect to login page
        localStorage.removeItem('user');
        setAuth(null);
    }
}