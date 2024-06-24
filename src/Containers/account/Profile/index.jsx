import {Helmet, HelmetProvider} from "react-helmet-async";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {useDispatch, useSelector} from "react-redux";
import {Card, CardContent, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import NoEncryptionIcon from '@mui/icons-material/NoEncryption';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {logout} from "../../../stores/Auth/actions";

function Profile() {
    const {
        user
    } = useSelector(state => state?.AuthReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const callLogout = () => {
        dispatch(logout());
        navigate('/login')
    }

    return (
        <HelmetProvider>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <Container
                maxWidth="sm"
                sx={{
                    py: '60px'
                }}
            >
                <Card pt={3} pb={2} px={4}>
                    <CardContent>
                        <Typography variant="h3" component="h1" align="center" mb={2}>
                            My Account
                        </Typography>
                        <Typography variant="h4" component="h5">
                            Hello {user?.name}
                        </Typography>
                        <List>
                            <ListItemButton as={Link} to="/news-search">
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Search News"/>
                            </ListItemButton>
                            <ListItemButton  as={Link} to="/account/newsfeed">
                                <ListItemIcon>
                                    <NoEncryptionIcon/>
                                </ListItemIcon>
                                <ListItemText primary="News Feed Setting"/>
                            </ListItemButton>
                            <ListItemButton onClick={() => callLogout()}>
                                <ListItemIcon>
                                    <PowerSettingsNewIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Logout"/>
                            </ListItemButton>
                        </List>
                    </CardContent>
                </Card>
            </Container>
        </HelmetProvider>
    )
}

export default Profile;