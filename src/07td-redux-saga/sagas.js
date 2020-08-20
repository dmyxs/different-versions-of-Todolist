import { takeEvery, put } from 'redux-saga/effects'
import { GET_INIT_LIST } from './actionTypes'
import { initListAction } from './actionCreators'
import axios from 'axios'

// 使用generator函数
function* sagas() {
    //使用takeEvery接收action（由componentDidMount传递而来），一旦接收到action，就执行参数二的函数
    yield takeEvery(GET_INIT_LIST, getInitList)
}

function* getInitList() {
    try {
        const res = yield axios.get('./list.json')
        const action = initListAction(res.data.data)
        //使用put把action发送到store
        yield put(action)
    } catch (e) {
        console.log(e, 'list.json 网络请求失败')
    }
}

export default sagas
