import { useField } from "formik";
import { TextField } from "@mui/material";
import './Input.css'
const Input = (props) => {
    const [field, meta] = useField(props)
    
    return(
        <div>
            <TextField id="outlined-name" label="Room ID" focused 
                sx={{marginRight:{xs: '0', sm: '12px'}, 
                marginBottom: {xs: '12px', sm: '0'}}}
                {...field} {...props} />
            {meta.touched && meta.error ? <label className="error">{meta.error}</label> : null}
        </div>

    )
}

export default Input