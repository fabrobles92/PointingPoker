import {useState} from 'react'
import { Button, Snackbar } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


const ButtonClipboard = () => {
    const [openCopy, setOpenCopy] = useState(false)
    const [openHover, setOpenHover] = useState(false)

    const handleClick = () => {
        setOpenCopy(true)
        navigator.clipboard.writeText(window.location.toString())
    }

    const handleHover = () => {
        setOpenHover(true)
    }

    return (
        <div>
            <Button onClick={handleClick} onMouseEnter={handleHover}>
                <label>Share this room</label>
                <ContentCopyIcon sx={{marginLeft: '5px'}}/>
            </Button>
            
            <Snackbar
                open={openCopy}
                onClose={() => setOpenCopy(false)}
                autoHideDuration={1000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                message={"URL copied to clipboard"}
            />
            <Snackbar
                open={openHover}
                onClose={() => setOpenHover(false)}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                message={"Click to copy URL"}
            />
        </div>
    )
}

export default ButtonClipboard
