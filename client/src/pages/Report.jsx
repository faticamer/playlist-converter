import NavigationBar from "../components/Navigation";
import Footer from '../components/Footer'
import PropTypes from 'prop-types'

// New design (two cards 1. email 2. github issue)
const Report = ({user}) => {

    return (
        <div className="flex flex-col bg-spotifyBlack min-h-screen">
            <div>
                <NavigationBar user={user}/>
            </div>
            <Footer />
        </div>
    )
}

Report.propTypes = {
    user: PropTypes.string
}

export default Report