import React from 'react';


type ErrorWindowPropsType = {
    isEmptyEmailMsg?:boolean
    isEmptyPassMsg?:boolean
    isEmptyPass1Msg?:boolean
    minLengthEmailMsg?:boolean
    minLengthPassMsg?:boolean
    maxLengthPassMsg?:boolean
    isValidEmailMsg?:boolean
    isPasswordCorrectReEnter?:boolean
    isEmptyNameError?:boolean
    isEmptyUrlError?:boolean
}


export const ErrorWindow=(props:ErrorWindowPropsType)=>{

    return(
        <div>
            {props.isEmptyEmailMsg &&  <div style={{color: 'red'}}>Email field should be stuffed</div> }
            {props.isEmptyPassMsg &&  <div style={{color: 'red'}}>Password field should be stuffed</div> }
            {props.isEmptyPass1Msg &&  <div style={{color: 'red'}}>Password field should be stuffed</div> }
            {props.isEmptyNameError &&  <div style={{color: 'red'}}>Name field should be stuffed</div> }
            {props.isEmptyUrlError &&  <div style={{color: 'red'}}>URL field should be stuffed</div> }
            {props.minLengthEmailMsg &&  <div style={{color: 'red'}}>Minimal length of email should be more than 3 symbols</div> }
            {props.minLengthPassMsg &&  <div style={{color: 'red'}}>Minimal length of password should be more than 8 symbols</div> }
            {props.maxLengthPassMsg &&  <div style={{color: 'red'}}>Maximal length of password should be low than 20 symbols</div> }
            {props.isValidEmailMsg &&  <div style={{color: 'red'}}>Invalid email</div> }
            {props.isPasswordCorrectReEnter &&  <div style={{color: 'red'}}>Entered passwords doesn't match</div> }
        </div>
    )
}