import style from './header.module.scss'
import {useEffect} from "react"


const HeaderComponent = () => {

    useEffect(() => {

    }, [])



    return (
        <div className={style.header}>
            {/*<div id="draggable" draggable="true">*/}
            {/*    <p>Перетащите окно</p>*/}
            {/*</div>*/}
        </div>
    )
}

export default HeaderComponent
