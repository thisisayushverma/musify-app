const apiResponse = (status,success ,message, data) => {
    return {
        status,
        success,
        message,
        data
    }
}

export default apiResponse