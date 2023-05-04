
const Auth = {};

Auth.logIn = (data) => {
    const token = data.addUser.authToken
    localStorage.setItem("auth_token", token)
}

export default Auth;