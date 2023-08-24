import style from './home.module.scss'
import {useEffect, useState} from 'react'
import {
    ContainerOutlined,
    DesktopOutlined, ExportOutlined, ImportOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons'
import type {MenuProps} from 'antd'
import {Button, Menu} from 'antd'
import TooltipComponent from "../../UI/popover/tooltipComponent"
import {Route, Routes, useNavigate} from "react-router-dom"
import IncomeComponent from "../income/income.component"
import OutcomeComponent from "../outcome/outcome.component";


type MenuItem = Required<MenuProps>['items'][number]

type SelectEventHandler = { item: any, key: string, keyPath: string[], selectedKeys: string[], domEvent: any }

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Доходы', '1', <ImportOutlined />),
    getItem('Расходы', '2', <ExportOutlined />),
    getItem('Option 3', '3', <ContainerOutlined/>),
]


const HomeComponent = (): JSX.Element => {

    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState<boolean>(false)
    useEffect(() => {
        onNavigate('1')
    }, [])

    const popoverContent: string = collapsed ? 'Развернуть меню' : 'Свернуть меню'

    const toggleCollapsed = (): void => {
        setCollapsed(!collapsed)
    }

    const onNavigate = (menuIndex: string): void => {
        if (menuIndex === '1') navigate('/income')
        else if (menuIndex === '2') navigate('/outcome')
        else if (menuIndex === '3') navigate('/test3')
    }

    const changeMenuChecked = (even: SelectEventHandler): void => {
        onNavigate(even.key)
    }



    return (
        <div className={style.home}>

            <div className={style.home_menu} style={{width: collapsed ? 90 : 256}}>
                <TooltipComponent content={popoverContent}>
                    <Button type="primary" onClick={toggleCollapsed} style={{marginBottom: 16}}>
                        {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    </Button>
                </TooltipComponent>
                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    theme="dark"
                    items={items}
                    inlineCollapsed={collapsed}
                    onSelect={changeMenuChecked}
                />
            </div>

            <div className={style.home_content}>
                <Routes>
                    <Route path='income/*' index element={<IncomeComponent/>}></Route>
                    <Route path='outcome/*' element={<OutcomeComponent/>}></Route>
                    <Route path='test3/*'></Route>
                </Routes>
            </div>

        </div>
    );
};

export default HomeComponent
