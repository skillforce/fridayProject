import s from './Preloader.module.css';

const{loader}=s

export const Preloader =()=>{

    return(
        <div>
            <div className={loader}>Loading...</div>
        </div>
    )


}