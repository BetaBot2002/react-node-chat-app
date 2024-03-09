import React from "react";
import { getRefreshToken } from "../../Utils/jwt.helper";
import { Navigate } from "react-router-dom";

const LogInLock=({children,needLoggedIn})=>{
    if(needLoggedIn){
        if(!getRefreshToken()) return <Navigate to={`registration`}/>
        return <>{children}</>
    }
    if(getRefreshToken()) return <Navigate to={`/`}/>
    return <>{children}</>
}

export default LogInLock