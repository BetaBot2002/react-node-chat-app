const addTokenToRequest=(req,res,next)=>{
    const bearer=req.headers['authorization']
    if(!bearer){
        res.status(404).send({
            message:`TOKEN NOT FOUND`
        })
    }else{
        const token=bearer.split(' ')[1]
        console.log(token)
        if(!token || token===''){
            res.status(404).send({
                message:`TOKEN NOT FOUND`
            })
        }else{
            req.token=token
            next()
        }
    }
}

export {
    addTokenToRequest
}