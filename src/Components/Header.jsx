import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";

export default function Header() {
    const history = useHistory();
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" 
            onClick={() => history.push('/')}>
            I need money @ please rent me .com
          </Typography>
        </Toolbar>
      </AppBar>
    )
}