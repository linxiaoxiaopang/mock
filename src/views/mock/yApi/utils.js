import {merge} from 'lodash'

export function createFormByDeepMapData(data, prop) {
    let tmp = null
    if (data.type === 'object') {
        tmp = {}
        const keys = Object.keys(data.properties)
        for (let key of keys) {
            const val = data.properties[key]
            tmp[key] = createFormByDeepMapData(val, key)
        }
        defineDatabaseType(tmp, 'object')
    } else if (data.type === 'array') {
        const res = createFormByDeepMapData(data.items, prop)
        defineDatabaseType(res, 'array')
        tmp = res
    } else {
        tmp = formatVal(data, prop)
    }
    return tmp
}

const list = {
    integer(row, key) {
        const tmpObj = list.default(row, key)
        tmpObj.mValue = '@integer(1, 100)'
        const {description = ''} = row
        if (description.indexOf('主键') >= 0) {
            tmpObj.mKey = `${key}|+1`
            tmpObj.mValue = '@integer(1)'
        }
        return tmpObj
    },

    number(row, key) {
        const tmpObj = list.default(row, key)
        const {format} = row
        const formatList = {
            float: '@float(1, 100, 2, 2)',
            double: '@float(1, 100, 8, 8)'
        }
        tmpObj.mValue = formatList[format] || formatList.float
        return tmpObj
    },

    string(row, key) {
        const tmpObj = list.default(row, key)
        tmpObj.mValue = '@string(10)'
        return tmpObj
    },

    boolean(row, key) {
        const tmpObj = list.default(row, key)
        tmpObj.mValue = '@boolean' ? 1 : 0
        return tmpObj
    },

    array(row, key) {
        const tmpObj = list.default(row, key)
        tmpObj.mValue = `${key}|10-20`
        return tmpObj
    },

    default(row, key) {
        defineDatabaseType(row, row.type)
        const res = {
            mKey: key,
            mValue: row[key]
        }
        return res
    }
}

function formatVal(row, key) {
    const {type} = row
    const fn = list[type] || list.default
    return merge(row, fn(row, key))
}

export function defineDatabaseType(obj, value) {
    return Object.defineProperty(obj, '__databaseType__', {
        value,
        writable: true,
        configurable: false
    })
}
