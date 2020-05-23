// import Cookies from 'js-cookie';
import validator from "validator";



const validateLoginForm = (email, password, setError) => {
    if (!email || !password) {
        setError("Please enter a valid email and password.");
        return false;
    }

    // Validate email
    if (!validator.isEmail(email)) {
        setError("Please enter a valid email address.");
        return false;
    }
    return true;
};


export {
    validateLoginForm
}