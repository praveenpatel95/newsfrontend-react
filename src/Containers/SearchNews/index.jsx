import { Helmet, HelmetProvider } from 'react-helmet-async';
import Searchbar from "./Searchbar";
import Results from "./Results";
import withAuth from "../../hoc/withAuth";
import {useState} from "react";

function Home(){
    const [page, setPage] = useState(1)

    return (
    <HelmetProvider>
            <Helmet>
                <title>Welcome to Inc News</title>
            </Helmet>
            <Searchbar page={page}/>
            <hr />
            <Results setPage={setPage} page={page}/>
    </HelmetProvider>
    )
}
export default withAuth(Home);