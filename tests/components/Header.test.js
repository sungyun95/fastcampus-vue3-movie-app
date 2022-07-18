import { shallowMount } from "@vue/test-utils";
import router from "~/routes";
import store from "~/store";
import Header from "~/components/Header";

describe("components/Header.vue", () => {
  let wrapper;
  beforeEach(async () => {
    window.scrollTo = jest.fn(); // 모의 함수!
    router.push("/movie/tt1234567");
    await router.isReady();
    wrapper = shallowMount(Header, {
      // 전역 환경에 등록된 플러그인들
      global: {
        plugins: [router, store],
      },
    });
  });

  test("경로 정규표현식이 없는 경우 일치하지 않습니다", () => {
    const regExp = undefined;
    // isMatch 메소드 확인
    expect(wrapper.vm.isMatch(regExp)).toBe(false);
  });

  test("경로 정규표현식과 일치해야 합니다.", () => {
    const regExp = /^\/movie/;
    // movie로 이동하지 않음, 어떤 페이지인지 확인 불가함 -> testing vue router
    expect(wrapper.vm.isMatch(regExp)).toBe(true);
  });

  test("경로 정규표현식과 일치하지 않아야 합니다.", () => {
    const regExp = /^\/heropy/;
    // movie로 이동하지 않음, 어떤 페이지인지 확인 불가함 -> testing vue router
    expect(wrapper.vm.isMatch(regExp)).toBe(false);
  });
});
