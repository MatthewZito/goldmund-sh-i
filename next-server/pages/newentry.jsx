import { withCookies } from 'react-cookie';
import ProcessEntry from "../components/processes/ProcessEntry.jsx";

const newentry = () => {
    return (
        <ProcessEntry data={null} />
    )
}

export default withCookies(newentry);