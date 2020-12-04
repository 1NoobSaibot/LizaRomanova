export default {
  data () {
    return {
      error: {}
    }
  },
  methods: {
    setError (e) {
      if (e instanceof Array) {
        const obj = {}
        for (let i = 0; i < e.length; i++) {
          const { field, message } = e[i]
          obj[field] = message
        }
        this.error = obj
      } else this.error = e
    }
  }
}
