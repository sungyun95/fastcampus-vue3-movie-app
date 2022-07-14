export default {
  namespaced: true,
  // 데이터 불변성을 위해 함수로 객체 생성
  state: () => ({
    name: 'SungYun',
    email: 'thesecon@gmail.com',
    blog: 'https://heropy.blog',
    phone: '+82-10-1234-5678',
    image: "https://heropy.blog/css/images/logo.png"
  })
}