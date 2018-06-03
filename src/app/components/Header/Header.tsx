import * as React from 'react';
import './Header.scss';
import * as logo from '../../../assets/images/logo.svg';
class Header extends React.Component {
    public render() {
        return (
            <div className={`container`}>
                <header className="header">
                        <div className={`logo`}>
                            <img src={logo} className="App-logo" alt="logo" />
                        </div>
                </header>
            </div>
        );
    }
}
export default Header;
