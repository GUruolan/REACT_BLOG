/**
 * 
 * @returns 右侧小卡片组件
 * 
 */
import cardsty from '../styles/components/card.module.css'
import { Divider } from 'antd'
import Image from 'next/image'

const Card = () => {
    return (
        <div className = "commbox">
            <Divider >涂鸦</Divider>
            <div className={cardsty.card_div}>
                <div><img src="card/tanzhilang.jpg"/></div>
                <div><img src="card/shaungmawei.jpg" /></div>
                <div><img src="card/shanyi.jpg" /></div>
            </div>

        </div>
    )
}
export default Card;