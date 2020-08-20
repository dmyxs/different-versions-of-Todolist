import React from 'react'
import { List } from 'antd'

const ItemList = (props) => {
    return (
        <div>
            <List
                style={{ width: '300px', marginTop: '8px' }}
                bordered
                dataSource={props.list}
                renderItem={(item, index) => (
                    <List.Item
                        className={item.completed && 'isCompeted'}
                        key={item.id}
                        onClick={() => props.passDeleteItem(index)}
                    >
                        {item.title}
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ItemList
