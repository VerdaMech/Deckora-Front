import React from "react";
import {Form} from 'react-bootstrap';

function Input(props){
    return <Form.Control{...props}/>;
}

export default Input;