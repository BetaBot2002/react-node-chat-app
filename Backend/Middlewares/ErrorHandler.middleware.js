const notFound = (req, res, next) => {
    res.status(404)
    next(new Error(`Not Found: ${req.originalUrl}`))
}

const errorRoute = (err, req, res, next) => {
    res.status(res.statusCode === 200 ? 500 : res.statusCode)
    res.json({
        message: `Error: ${err.message}`
        // stack: err.stack
    })
}

export {
    notFound,
    errorRoute
}