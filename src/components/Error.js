import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

function Error({mensaje}){
    return(
        <div className="card-panel red darken-4 error col s12">           
            {mensaje}
        </div>
        )
}

export default Error;