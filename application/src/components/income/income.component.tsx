import style from './income.module.scss'
import {Button} from "antd";
import {AppstoreAddOutlined} from "@ant-design/icons";

const IncomeComponent = (): JSX.Element => {



    return (
        <div className={style.income}>

            <div className={style.income_heading + ' heading_1'}>Источники доходов</div>

            <div className={style.income_body}>

                <div className={style.income_body_add}>
                    <Button type="primary" shape="round" icon={<AppstoreAddOutlined />} size={'large'}>
                        Добавить доход
                    </Button>
                </div>




            </div>

        </div>
    )
}

export default IncomeComponent;
