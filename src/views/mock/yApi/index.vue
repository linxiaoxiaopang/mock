<template>
  <div>
    <el-button class="mb20" @click="createMockData">
      生成模拟数据
    </el-button>
    <avue-crud-input class="mb20" v-model="mockDescribeJson" type="textarea"></avue-crud-input>
    <deepForm :form="form" :option="optionList"/>
  </div>
</template>
<script>
import deepForm from './deepForm'
import {
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
      mockDescribeJson: '{}',
      optionList: {}
    }
  },

  computed: {
    mockDescribeData({ mockDescribeJson }) {
      return JSON.parse(mockDescribeJson)
    }
  },

  watch: {
    mockDescribeJson() {
      this.init()
    }
  },

  methods: {
    init() {
      debugger
      this.form = createFormByDeepMapData(this.mockDescribeData)
      this.optionList = createFormColumns(this.form)
    },

    createMockData() {
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
