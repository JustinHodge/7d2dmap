import logo from '../logo.svg';
const HeaderBar = () => {
    return (
        <div className='header-bar'>
            <img className='header-logo' src={logo}></img>
            <h1>7 Days to Die Map Builder</h1>
            <img className='header-logo inverted-svg' src={logo}></img>
        </div>
    );
};

export default HeaderBar;
