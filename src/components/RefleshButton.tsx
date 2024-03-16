import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

function RefleshButton(){
    return(
        <IconButton
          aria-label="reflesh"
          size="small"
          style={{ position: "absolute", top: "92.5%", left: "-2.7%" }}
          onClick={() => {
            window.location.reload();
          }}
        >
          <RefreshIcon fontSize="small" />
        </IconButton>
    )
}
export default RefleshButton;