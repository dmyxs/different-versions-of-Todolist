//引用store文件夹的内容，并统一导出

import reducer from './reducer'
import * as creators from './creators'
import * as consts from './const'

export { reducer, creators, consts }
