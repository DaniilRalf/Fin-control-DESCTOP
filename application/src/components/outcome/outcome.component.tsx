import style from './outcome.module.scss'
import {useEffect, useState} from "react"
import {electronBusObject} from "../../App"
import {Button, Input, Select} from "antd"
import {AppstoreAddOutlined, DeleteOutlined} from "@ant-design/icons"
import {ElectronEventsEnum, IncomeInterface, OutcomeInterface} from "common/dist"
import {onlyNumber} from "../../helpers/only-number.directive";

const {Option} = Select

const OutcomeComponent = () => {

    // const dispatch = useDispatch()
    const [outcomeList, setOutcomeList] = useState<OutcomeInterface[] | null>(null)

    const [allQuantity, setAllQuantity] = useState<number>(0) /** all outcome */
    const [allIncome, setAllIncome] = useState<number>(0) /** all income */

    useEffect(() => {
        /** get all income data and set incomeQuantity */
        electronBusObject.electronEvents<null>(ElectronEventsEnum.CacheIncomeGet, null).then((res: IncomeInterface[]) => {
            if (res && res.length > 0) {
                let newIncomeQuantity = 0
                res.forEach((item: IncomeInterface) => newIncomeQuantity += Number(item.quantity))
                setAllIncome(newIncomeQuantity)
            }
        })
        /** get all outcome data */
        electronBusObject.electronEvents<null>(ElectronEventsEnum.CacheOutcomeGet, null).then((res: OutcomeInterface[]) => {
            if (res) {
                setOutcomeList(res)
            }
        })
    }, [])

    useEffect(() => {
        /** generate allQuantity */
        let newAllQuantity: number = 0
        outcomeList?.forEach((item: OutcomeInterface) => {
            newAllQuantity += Number(item.allQuantity)
        })
        setAllQuantity(newAllQuantity)
        /** save in store and get to electron*/
        // dispatch(setIncomeCache({data: incomeList}))
        if (outcomeList) {
            electronBusObject.electronEvents<OutcomeInterface[]>(ElectronEventsEnum.CacheOutcomeSave, outcomeList).then()
        }
    }, [outcomeList])


    const changeIncomeList = (
        event: string,
        type: 'name' | 'type' | 'quantity' | 'allQuantity' | 'typeQuantity',
        index: number): void => {
            const newOutcomeList = [...outcomeList || []]
            if (newOutcomeList.length > 0 && (type === 'name')) {
                // @ts-ignore
                newOutcomeList[index][type] = event
                setOutcomeList(newOutcomeList)
            } else if (newOutcomeList.length > 0 && (type === 'quantity')) {
                if (newOutcomeList[index].typeQuantity === 'price') {
                    newOutcomeList[index].quantity = Number(event)
                    newOutcomeList[index].allQuantity = Number(event)
                    setOutcomeList(newOutcomeList)
                } else if (newOutcomeList[index].typeQuantity === 'percent') {
                    newOutcomeList[index].quantity = Number(event)
                    newOutcomeList[index].allQuantity = (Number(event) * allIncome) / 100
                    setOutcomeList(newOutcomeList)
                }
            }
    }
    const addIncomeList = (): void => {
        const newOutcomeList = [...outcomeList || []]
        newOutcomeList.push({type: 'different', name: '', quantity: 0, allQuantity: 0, typeQuantity: 'price'})
        setOutcomeList(newOutcomeList)
    }
    const removeIncomeList = (index: number): void => {
        const newIncomeList = [...outcomeList || []]
        newIncomeList.splice(index, 1)
        setOutcomeList(newIncomeList)
    }


    /** SELECT_TYPE========================================================= */
    const onChangeTypeSelect = (value: string, index: number) => {
        const newOutcomeList = [...outcomeList || []]
        newOutcomeList[index].type = value
        setOutcomeList(newOutcomeList)
    }

    const constructTypeSelect = (index: number): JSX.Element => {
        return (
            <Select onChange={(event) => {
                onChangeTypeSelect(event, index)
            }}
                    defaultValue={outcomeList ? outcomeList[index].type : 'different'}>
                <Option value="different">Прочие расходы</Option>
                <Option value="food">Еда</Option>
                <Option value="beauty">Красота</Option>
                <Option value="closes">Одежда</Option>
                <Option value="taxi">Такси</Option>
                <Option value="transport">Транспорт</Option>
                <Option value="restaurant">Рестораны</Option>
                <Option value="present">Подарки</Option>
                <Option value="dog">Собака</Option>
            </Select>
        )
    }
    /** SELECT_TYPE========================================================= */

    /** SELECT_TYPE_QUANTITY================================================ */
    const onChangeQuantityTypeSelect = (value: "price" | "percent", index: number) => {
        const newOutcomeList = [...outcomeList || []]
        newOutcomeList[index].typeQuantity = value
        newOutcomeList[index].quantity = 0
        newOutcomeList[index].allQuantity = 0
        setOutcomeList(newOutcomeList)
    }

    const constructQuantityTypeSelect = (index: number): JSX.Element => {
        return (
            <Select onChange={(event: any) => {
                onChangeQuantityTypeSelect(event, index)
            }}
                    defaultValue={outcomeList ? outcomeList[index].typeQuantity : 'price'}>
                <Option value="price">(фикс. сумма ₽)</Option>
                <Option value="percent">(процент от дохода %)</Option>
            </Select>
        )
    }
    /** SELECT_TYPE_QUANTITY================================================ */

    const constructIncomeList: JSX.Element[] | any = outcomeList?.map((item: OutcomeInterface, index: number) => {
        return (
            <div className={style.outcome_body_list_item} key={index}>
                <div className={style.outcome_body_list_item_block}>
                    <div className={style.outcome_body_list_item_block_desc}>название расхода</div>
                    <Input value={item.name}
                           onChange={(event) => changeIncomeList(event.target.value, 'name', index)}
                           addonAfter={constructTypeSelect(index)}/>
                </div>
                <div className={style.outcome_body_list_item_block}>
                    <div className={style.outcome_body_list_item_block_desc}>число | процент</div>
                    <Input value={item.quantity}
                           onKeyPress={onlyNumber}
                           onChange={(event) => changeIncomeList(event.target.value, 'quantity', index)}
                           addonAfter={constructQuantityTypeSelect(index)}/>
                </div>
                <div className={style.outcome_body_list_item_block2}>
                    <div className={style.outcome_body_list_item_block_desc}>итоговая сумма</div>
                    <p style={{transform: 'translateY(-10px)', color: 'white'}}>{item.allQuantity}</p>
                </div>
                <DeleteOutlined className={style.outcome_body_list_item_block_icon}
                                onClick={() => removeIncomeList(index)}/>
            </div>
        )
    })

    return (
        <div className={style.outcome}>


            <div className={style.outcome_heading + ' heading_1'}>Источники расходов</div>


            <div className={style.outcome_body}>
                <div className={style.outcome_body_add}>
                    <Button type="primary" shape="round"
                            icon={<AppstoreAddOutlined/>}
                            size={'large'} onClick={() => addIncomeList()}
                    >Добавить расход</Button>
                    <p>{allQuantity}&nbsp;₽</p>
                </div>
                <div className={style.outcome_body_list}>
                    {constructIncomeList}
                </div>
            </div>


        </div>
    )
}

export default OutcomeComponent
