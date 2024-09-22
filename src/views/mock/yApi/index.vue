<template>
  <div>
    <deepForm :form="form" :option="optionList"/>
<!--    <el-select></el-select>-->
  </div>
</template>
<script>
import deepForm from './deepForm'
import mockData from './mockData'
import {cloneDeep} from 'lodash'
import {dicOfString} from './const'
import {createFormByDeepMapData, defineDatabaseType} from './utils'

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
    this.form = createFormByDeepMapData(cloneDeep(mockData))
    console.log('form', this.form)
    const res = this.optionList = this.createFormColumns(this.form)
    console.log('res', res)
  },

  methods: {
    createFormColumns(data, prop) {
      let option = null
      if (data.__databaseType__ === 'object' || data.__databaseType__ === 'array') {
        option = {
          prop,
          label: prop,
          span: 24,
          labelWidth: 'auto',
          slot: 'form',
          column: []
        }
        const keys = Object.keys(data)
        for (let key of keys) {
          const val = data[key]
          option.column.push(this.createFormColumns(val, key))
        }
      } else if (data.__databaseType__ === 'array') {
        return this.createFormColumns(data, prop)
      } else {
        option = {
          prop,
          span: 6,
          label: data.mKey
        }
        if (data.__databaseType__ === 'string') {
          option.type = 'select'
          option.filterable = true
          option.dicData = dicOfString
        }
      }
      return option
    }
  }
}
</script>
