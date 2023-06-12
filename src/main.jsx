import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './store/index.js';

export const ThemeContext = React.createContext('light');
export const CurrencyContext = React.createContext('USD');
export const UserContext = React.createContext(false);
const Main = () => {
    const [theme, setTheme] = useState('light')
    const [currency, setCurrency] = useState('USD')
    const [user, setUser] = useState({})


    
    return (
        <ThemeContext.Provider value={{ theme, setTheme, }}>
            <CurrencyContext.Provider value={{ currency, setCurrency }}>
                <UserContext.Provider value={{user, setUser}}>
                    <App />
                </UserContext.Provider>
            </CurrencyContext.Provider>
        </ThemeContext.Provider>
    );
};

export default Main;

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Main />
    </Provider>
)
