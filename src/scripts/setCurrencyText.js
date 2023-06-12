import { useContext } from "react"
import { CurrencyContext } from "../main"


export function setCurrencyText() {
    const { currency, setCurrency } = useContext(CurrencyContext)

    if(currency === 'USD') {
        return '$' 
    } else if(currency === 'EUR') {
        return '€'
    }
}