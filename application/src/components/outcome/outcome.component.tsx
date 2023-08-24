import style from './outcome.module.scss'

const OutcomeComponent = () => {
    return (
        <div className={style.outcome}>

            <div className={style.outcome_heading + ' heading_1'}>Источники доходов</div>

            <div className={style.outcome_body}>body</div>

        </div>
    )
}

export default OutcomeComponent
