import {useDispatch} from "react-redux";
import {bindActionCreators} from 'redux';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import {useEffect, useState} from 'react';
import {getCookie} from 'typescript-cookie';
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import HomePage from "./HomePage";
import * as actionCreators from "../reducers/start/user/actionUser"


import MyAccount from "./MyAccount";

function Pages() {

    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [id, setId] = useState<string>("");
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const dispatch = useDispatch();
    const {setUser} = bindActionCreators(actionCreators, dispatch);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        let id2 = getCookie("id");
        let isAdmin2 = getCookie("isAdmin");
        if (id2 != undefined) {
            setId(id2);
            if (isAdmin2 == "true")
                setIsAdmin(true);
            setUser({id: id, isAdmin: isAdmin} as IUser);
            setIsLogged(true);
        }
    }, [isLogged]);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/create" element={<CreateAccount/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/myaccount" element={<MyAccount/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Pages;