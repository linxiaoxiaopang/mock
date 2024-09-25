<template>
  <div>
    <el-button class="mb20" @click="createMockData">
      生成模拟数据
    </el-button>
    <deepForm :form="form" :option="optionList"/>
  </div>
</template>
<script>
import deepForm from './deepForm'
import mockData from './mockData'
import { cloneDeep } from 'lodash'
import {
  createForeignKeyList,
  createFormByDeepMapData,
  createFormColumns,
  fillForeignKeyList,
  getMockjsSyntax
} from './utils'
import Mock from 'mockjs'
window.Mock = Mock
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
    const res = this.optionList = createFormColumns(this.form)
    console.log('res', res)
  },

  methods: {
    createMockData() {
     // const res = createForeignKeyList(this.form)
     //  console.log('res', res)
      const foreignKeyList = []
      const syntaxRes = getMockjsSyntax(this.form, foreignKeyList)
      console.log('syntaxRes', syntaxRes)
      console.log('foreignKeyList', foreignKeyList)
      const mockRes = Mock.mock(syntaxRes)
      fillForeignKeyList(mockRes, foreignKeyList)
      console.log('mockResmockResmockResmockRes', mockRes)
    }
  }
}
</script>
