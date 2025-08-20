import config from "../config/config.ts";

// interface IResponse {
//     status: string,
//     success: boolean,
//     message: string,
//     data: any
// }

interface IRegisterCredentials {
    name: string,
    email: string,
    password: string
}

const registerHandle = async (credentails: IRegisterCredentials) => {
    const response = await fetch(config.backendUrl + '/user/register', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentails),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("response coming from create user api:-", data);
            return data;
        })
        .catch((error) => {
            throw error
        });

    return response;
}

interface IOtpCredentials {
    email: string,
    otp: string
}

const otpVerifyHandle = async (credentails: IOtpCredentials) => {
    const response = await fetch(config.backendUrl + '/otp/verify-otp', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentails),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("response coming from create user api:-", data);
            return data;
        })
        .catch((error) => {
            throw error
        });

    return response;
}


const otpResendHandler = async (email: string) => {
    const response = await fetch(config.backendUrl + '/otp/resend-otp', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("response coming from create user api:-", data);
            return data;
        })
        .catch((error) => {
            throw error
        })

    return response;
}

interface ILoginCredentials {
    email: string,
    password: string
}

const loginHandle = async (credentails: ILoginCredentials) => {
    const response = await fetch(config.backendUrl + '/user/login', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentails),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("response coming from create user api:-", data);
            return data;
        })
        .catch((error) => {
            throw error
        })

    return response;
}

const getUserDetails = async () => {
    const response = await fetch(config.backendUrl + "/user/", {
        credentials: "include",
        method: "GET",
    })
    .then((res) => res.json())
    .then((data) => {
        return data;
    })
    .catch((error) => {
        console.log("data status code not 201", error);
    });
    return response;
};

const handleLogout = async () => {
    const response = await fetch(config.backendUrl + "/user/logout", {
        credentials: "include",
        method: "POST",
    })
    .then((res) => res.json())
    .then((data) => {
        
        return data;
    })
    .catch((error) => {
        console.log("data status code not 201", error);
    });
    return response;
};


export {
    registerHandle,
    otpVerifyHandle,
    otpResendHandler,
    loginHandle,
    getUserDetails,
    handleLogout
}