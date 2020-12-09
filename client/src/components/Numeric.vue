<template>
  <div class="row text-h6" style="height: 36px">
    <q-btn label="+" @click="change(1)" style="margin-right: 8px"/>
    <div>{{ value }}</div>
    <q-btn label="-" @click="change(-1)" style="margin-left: 8px"/>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: Number.MAX_SAFE_INTEGER }
  },
  methods: {
    change (delta) {
      const newValue = +this.value + +delta
      if (newValue < this.min || newValue > this.max) {
        return this.$emit('input', this.value)
      }
      this.$emit('input', newValue)
    }
  }
}
</script>
