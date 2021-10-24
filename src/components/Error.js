import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

function Error({mensaje}){
    return(
        <div className="alert alert-danger">          
            {mensaje}
        </div>
        )
}

export default Error;