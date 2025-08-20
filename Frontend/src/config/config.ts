const config = {
    backendUrl : import.meta.env.VITE_BACKEND_URL? String(import.meta.env.VITE_BACKEND_URL) : 'http://localhost:3000/api',
    userAuthLocalStorageKey : 'userAuth',
    userDataLocalStorageKey : 'userData',
    audioDetailsLocalStorageKey : 'audioData',
    playerStatusLocalStorageKey : 'playerStatus'
}

export default config