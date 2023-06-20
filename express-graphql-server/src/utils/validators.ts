import { IRegisterInputErrors, ILoginInputErrors } from "../interfaces";

const validateRegisterInput = (username: string, email: string, password: string, confirmPassword: string) => {
    const errors: IRegisterInputErrors = {};
    if (username.trim() === "") {
        errors["username"] = "Username must not be empty";
    }
    if (email.trim() === "") {
        errors["email"] = "Email must not be empty";
    } else {
        const regEx = 
            /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors["email"] = "Email must be a valid email address";
        }
    }

    if (password === "") {
        errors["password"] = "Password must not be empty";
    } else if (password !== confirmPassword) {
        errors["confirmPassword"] = "Passwords must match";
    }

    return {
        errors,
        // ! valid == true if there are no errors
        valid: Object.keys(errors).length < 1
    }
}

const validateLoginInput = (email: string, password: string) => {
    const errors: ILoginInputErrors = {};
    if (email.trim() === "") {
        errors["email"] = "Email must not be empty";
    }
    if (password === "") {
        errors["password"] = "Password must not be empty";
    }

    return {
        errors,
        // ! valid == true if there are no errors
        valid: Object.keys(errors).length < 1
    }
}

export {
    validateRegisterInput,
    validateLoginInput
}