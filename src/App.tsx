import * as React from 'react';
import './App.css';
import * as logo from './assets/images/logo.svg';
import Header from './app/components/Header/Header';
class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <Header/>
                <header className="App-header">
                    <h1 className="App-title">Welcome to Wepack React Typscript</h1>
                </header>
            </div>
        );
    }
}
export default App;
