import React, { useState } from "react";
function App() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [errors, setErrors] = useState({});
const [success, setSuccess] = useState("");
const [users, setUsers] = useState([]);
const handleSubmit = (e) => {
e.preventDefault();
let formErrors = {};
if(name.trim() === ""){
formErrors.name = "Name is required";
}
if(!email.includes("@")){
formErrors.email = "Email must contain @";
}
if(password.length < 6){
formErrors.password = "Password must be at least 6 characters";
}
setErrors(formErrors);
if(Object.keys(formErrors).length === 0){
const newUser = {
name: name,
email: email
};
setUsers([...users, newUser]);
setSuccess("Registration Successful!");
setName("");
setEmail("");
setPassword("");
}
};