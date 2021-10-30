import s from './Modal.module.css';

const {modal, modal_content, modal_active, modal_content_active} = s;


type ModalPropsType = {
    active: boolean
    setActive: (newActiveStatus: boolean) => void
    children:any
}


export const Modal = (props: ModalPropsType) => {

    const {active, setActive,children} = props
    return (
        <div className={active ? modal_active : modal} onClick={() => setActive(false)}>
            <div className={active ? modal_content_active : modal_content} onClick={event => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}