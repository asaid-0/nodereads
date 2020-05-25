import axios from 'axios'

const token = sessionStorage.getItem("token");
// alert("token: "+ token);
console.log("Token .. ,", token);
const headers = {}
if (token) {
    headers.Authorization = `bearer ${token}`;
}

export default axios.create({
    headers: headers
});