import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceFive, faDiceFour, faDiceOne, faDiceSix, faDiceThree, faDiceTwo } from '@fortawesome/free-solid-svg-icons'


export default function Dice(props) {
    const classes = props.isHeld ? "fa--dice held" : "fa--dice"

    function renderDie(value) {
        switch(value) {
            case 1:
                return faDiceOne
            case 2: 
                return faDiceTwo
            case 3: 
                return faDiceThree
            case 4: 
                return faDiceFour
            case 5: 
                return faDiceFive
            case 6: 
                return faDiceSix
                
        }
    }

    return (
        <FontAwesomeIcon icon={renderDie(props.value)} className={classes} onClick={props.handleClick}/>
    )
}