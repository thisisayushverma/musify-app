const asyncHandler = (fn)=>{
    return (req, res, next)=>{
        Promise.resolve(fn(req, res, next)).catch(next);
    }
}

const promiseHandler = (fn)=>{
    return new Promise.resolve(fn)
    .catch((err)=>{
        throw err;
    })
}


export {
    promiseHandler
}
export default asyncHandler;