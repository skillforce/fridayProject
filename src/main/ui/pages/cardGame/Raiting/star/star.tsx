import React from "react";
import s from './star.module.css';
import star from './star.png'

const{starOn,starOf}=s;

type StarPropsType = {
    selected: true | false
    setValue:()=>void;
}


function Star(props: StarPropsType) {
    const{selected,setValue}=props;
    return(
        <div onClick={setValue}>
            {selected? <StarOn /> : <StarOf />}
        </div>
)}



const StarOn =()=>{
    return(<img className={starOn} src={star} />)
}
const StarOf =() =>{
    return(<img className={starOf} src={star} />)
}

export default Star;