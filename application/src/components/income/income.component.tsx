import style from './income.module.scss'
import {Button, Input} from "antd"
import {AppstoreAddOutlined, DeleteOutlined} from "@ant-design/icons"
import {ElectronEventsEnum, IncomeInterface} from "common/dist"
import {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {setIncomeCache} from "../../store/slices/electron-cache.slice"
import {electronBusObject} from "../../App";

const IncomeComponent = (): JSX.Element => {

    const dispatch = useDispatch()
    const [incomeList, setIncomeList] = useState<IncomeInterface[]>([])
    const [allQuantity, setAllQuantity] = useState<number>(0)

    useEffect(() => {
        electronBusObject.electronEvents<null>(ElectronEventsEnum.CacheIncomeGet, null).then((res: IncomeInterface[]) => {
            setIncomeList(res)
        })
    }, [])

    useEffect(() => {
        /** generate allQuantity */
        let newAllQuantity: number = 0
        incomeList?.forEach((item: IncomeInterface) => {
            newAllQuantity += Number(item.quantity)
        })
        setAllQuantity(newAllQuantity)
        /** save in store and get to electron*/
        dispatch(setIncomeCache({data: incomeList}))
        if (incomeList) {
            electronBusObject.electronEvents<IncomeInterface[]>(ElectronEventsEnum.CacheIncomeSave, incomeList).then()
        }
    }, [incomeList])


    const changeIncomeList = (event: string, type: 'name' | 'owner' | 'quantity', index: number): void => {
        const newIncomeList = [...incomeList]
        if (newIncomeList.length > 0) {
            // @ts-ignore
            newIncomeList[index][type] = event
            setIncomeList(newIncomeList)
        }
    }
    const addIncomeList = (): void => {
        const newIncomeList = [...incomeList]
        newIncomeList.push({name: '', owner: '', quantity: 0})
        setIncomeList(newIncomeList)
    }
    const removeIncomeList = (index: number): void => {
        const newIncomeList = [...incomeList]
        newIncomeList.splice(index, 1)
        setIncomeList(newIncomeList)
    }


    const constructIncomeList: JSX.Element[] = incomeList.map((item: IncomeInterface, index: number) => {
        return (
            <div className={style.income_body_list_item} key={index}>
                <Input value={item.name} onChange={(event) => changeIncomeList(event.target.value, 'name', index)}/>
                <Input value={item.owner} onChange={(event) => changeIncomeList(event.target.value, 'owner', index)}/>
                <Input value={item.quantity}
                       onChange={(event) => changeIncomeList(event.target.value, 'quantity', index)}/>
                <DeleteOutlined className={style.income_body_list_item_icon}
                                onClick={() => removeIncomeList(index)}/>
            </div>
        )
    })

    return (
        <div className={style.income}>


            <div className={style.income_heading + ' heading_1'}>Источники доходов</div>


            <div className={style.income_body}>
                <div className={style.income_body_add}>
                    <Button type="primary" shape="round"
                            icon={<AppstoreAddOutlined/>}
                            size={'large'} onClick={() => addIncomeList()}
                    >Добавить доход</Button>
                    <p>{allQuantity}&nbsp;₽</p>
                </div>
                <div className={style.income_body_list}>
                    {constructIncomeList}
                </div>
            </div>


        </div>
    )
}

export default IncomeComponent
