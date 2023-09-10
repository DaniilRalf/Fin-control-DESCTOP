import style from './outcome-chips.module.scss';
import {SyntheticEvent, useEffect, useState} from "react"
import {CloseOutlined} from "@ant-design/icons";
import {Input} from "antd"
import CyrillicToTranslit from "cyrillic-to-translit-js";


const cyrillicToTranslit = new (CyrillicToTranslit as any)()


const OutcomeChipsComponent = () => {

    const [chipsList, setChipsList] = useState<{value: string, label: string}[]>([])

    useEffect(() => {
        setChipsList([
            {value: 'test1', label: 'test1'},
            {value: 'test2', label: 'test2'},
            {value: 'test3', label: 'test3'},
        ])
    }, [])

    const addChip = (event: SyntheticEvent | any): void => {
        const inputValue = event.nativeEvent.target.value
        if (inputValue) {
            setChipsList([...chipsList, {value: cyrillicToTranslit.transform(inputValue, '_').toLowerCase(), label: inputValue}])
            event.nativeEvent.target.value = ''
        }
    }

    const removeChip = (indexChip: number): void => {
        const newChipList  = [...chipsList]
        newChipList.splice(indexChip, 1)
        setChipsList(newChipList)
    }






    const constructIncomeList: JSX.Element[] | any = chipsList?.map((item: {value: string, label: string}, index: number) => {
        return (
            <div className={style.outcome_chips_item} key={index}>
                {item.label}
                <CloseOutlined className={style.icon_close}
                               onClick={() => removeChip(index)}
                />
            </div>
        )
    })

    return (
        <div className={style.outcome_chips}>
            {constructIncomeList}
            <Input rootClassName={style.test}
                   placeholder="Добавить группу расходов"
                   onPressEnter={addChip}
            />
        </div>
    )
}
export default OutcomeChipsComponent
