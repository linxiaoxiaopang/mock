<template>
  <div>
    <deepForm :form="form" :option="optionList"/>
  </div>
</template>
<script>
import deepForm from './deepForm'
import mockData from './mockData'
import {cloneDeep} from 'lodash'
import {dicOfString} from './const'


function mapData(data) {
  let tmp = null
  if (data.type === 'object') {
    tmp = {}
    const keys = Object.keys(data.properties)
    for (let key of keys) {
      const val = data.properties[key]
      tmp[key] = mapData(val)
    }
  } else if (data.type === 'array') {
    tmp = mapData(data.items)
  } else {
    tmp = formatVal(data)
  }
  return tmp
}

const list = {
  integer: {
    key(key, row) {
      const {description = ''} = row
      if (description.indexOf('主键') >= 0) {
        return `${key}|+1`
      }
      return key
    },
    val(row) {
      const {description = ''} = row
      if (description.indexOf('主键') >= 0) {
        return 1
      }
      return ' @integer(1, 100)'
    }
  },

  number: {
    key(key, row) {
      return key
    },
    val(row) {
      const {format} = row
      const formatList = {
        float: '@float(1, 100, 2, 2)',
        double: '@float(1, 100, 8, 8)'
      }
      return formatList[format] || formatList.float
    }
  },

  string: {
    key(key, row) {
      return key
    },
    val(row) {
      return '@string(10)'
    }
  },

  boolean: {
    key(key, row) {
      return key
    },
    val(row) {
      return '@boolean' ? 1 : 0
    }
  },

  array: {
    key(key, row) {
      return `${key}|10-20`
    },
    val(row) {
      return []
    }
  }
}

function formatKey(key, row) {
  const {type} = row
  const fn = list[type] && list[type].key
  if (fn) {
    return fn(key, row)
  }
  return key
}

function formatVal(row) {
  const {type} = row
  const fn = list[type] && list[type].val
  if (fn) {
    return fn(row)
  }
  return ''
}
// console.log('mockData', mockData)
export default {
  components: {
    deepForm
  },

  data() {
    return {
      form: {},
      optionList: {}
    }
  },

  created() {
    const res = this.optionList = this.createFormColumns(cloneDeep(mockData), '_')
    this.form = mapData(cloneDeep(mockData))
    console.log('res', res)
    console.log('form', this.form)
  },

  methods: {
    createFormColumns(data, prop) {
      let option = null
      if (data.type === 'object') {
        option = {
          prop,
          span: 24,
          labelWidth: 'auto',
          slot: 'form',
          column: []
        }
        const keys = Object.keys(data.properties)
        for (let key of keys) {
          const val = data.properties[key]
          option.column.push(this.createFormColumns(val, key))
        }
      } else if (data.type === 'array') {
        return this.createFormColumns(data.items, prop)
      } else {
        option = {
          prop,
          span: 6,
          label: prop
        }
        if (data.type === 'string') {
          option.type = 'select'
          option.dicData = dicOfString
        }
      }
      return option
    }
  }
}
</script>
