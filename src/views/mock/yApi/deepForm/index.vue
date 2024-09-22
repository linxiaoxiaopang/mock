<template>
  <baseForm
      class="base-form-container"
      :option="option"
      v-model="form"
      v-bind="$attrs"
      v-on="$listeners"
  >
    <template v-for="item in option.column.filter(item => item.slot)" #[`${item.prop}`]="row">
      <deepForm
          :form="form[item.prop]"
          :option="item"
          v-bind="$attrs"
          v-on="$listeners"/>
    </template>
  </baseForm>
</template>

<script>
export default {
  name: 'deepForm',
  props: {
    form: {
      type: Object,
      required: true
    },
    option: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.base-form-container {
  margin-left: 50px;
  padding: 15px;
  border: 1px solid $color-border;
  border-radius: 4px;
}


</style>
