import React from 'react'
import { List, Button } from '../../06td-redux-thunk/node_modules/antd'

//无状态，无逻辑的傻瓜组件
const ItemList = (props) => {
    return (
        <div>
            <List
                style={{ width: '300px', marginTop: '8px' }}
                bordered
                dataSource={props.list.toJS()} //转成JS对象，否则编译不出来
                renderItem={(item, index) => (
                    <List.Item
                        className={item.completed && 'isCompeted'}
                        key={item.id}
                    >
                        <input
                            className="itemCheckbox"
                            type="checkbox"
                            defaultChecked={item.completed}
                            onChange={() => props.passChangeChecked(index)}
                        />
                        {item.title}
                        <Button
                            className="ItemBtn"
                            danger
                            size={'small'}
                            onClick={() => props.passDeleteItem(index)}
                        >
                            删除
                        </Button>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ItemList
