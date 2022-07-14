export default {
  install(app) {
    app.config.globalProperties.$loadImage = src => {
      // 비동기
      return new Promise (resolve => {
        const img = document.createElement('img')
        img.src = src
        img.addEventListener('load', () => {
          // 완료
          resolve()
        })
      })
    }
  }
}