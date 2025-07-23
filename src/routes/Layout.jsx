import {Outlet} from 'react-router-dom'
import {Link} from 'react-router-dom'

const Layout = () => {
    return (
        <div className = "App">
            <div className = "navigation-sidebar">
                <h1> Pokedata</h1>
                <Link to='/'><p> Dashboard </p></Link>
                <Link to='/'><p> Search</p></Link>
                <Link to='/'><p> About</p></Link>
            </div>
            <Outlet />
        </div>
    );
}

export default Layout;