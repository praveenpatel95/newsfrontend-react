import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Box, Typography } from '@mui/material';

function Home(){

    return (
    <HelmetProvider>
            <Helmet>
                <title>Welcome to Inc News</title>
            </Helmet>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
      textAlign="center" 
    >
      <Typography component="h2" variant="h4">
        Search news from News API, New York Times and The Guardian
      </Typography>
      <p>Are you want to see news, Please Login or Register</p>
    </Box>
           
    </HelmetProvider>
    )
}
export default Home