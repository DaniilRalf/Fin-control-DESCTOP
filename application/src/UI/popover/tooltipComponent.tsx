import style from './popover.module.scss'
import {Popover, Tooltip} from "antd";

const TooltipComponent = ({ content, children }: {content: string, children: JSX.Element}) => {

    return (
        <Tooltip className={style.popover}
                 title={content}
                 placement="rightTop"
                 trigger="hover"
        >{children}</Tooltip>
    )
}

export default TooltipComponent
