// ! components.js gose



/*=====  Notifications ======*/
// 문서에서 button을 클릭하면 button의 부모요소(noti 자체)가 사라지게 하는 함수를 만든다.
// 그런데 아무 button을 누르면 모든 button이 사라지기 때문에 각 index에 해당하는 button의 부모요소를 사라지게 한다.

;(function(global, $){
  'use strict';

  // 참고: <http://poiemaweb.com/es6-class>
  // 
  class Notification {
    // 인스턴스를 생성하고 초기화, 클래스 내에 한개만 존재할 수 있다.
    constructor(selector){

      // 검증
      // selector가 string이 아닐경우 -> 오류 메세지
      if ( $.type(selector) !== 'string' ) { throw 'CSS 선택자(문자열)를 전달해야 합니다.' }
      // 빈 문자열일 경우 -> 오류 메세지
      // if ( selector.length < 1 ) { throw '빈 문자열 입니다. 아무말이라도 던져주세요.' }
      if ( selector.trim() === '' ) { throw '빈 문자열 입니다. 아무말이라도 던져주세요.' }
      // new 를 붙이지 않고 값을 전달하는 경우 -> 오류 메세지 => ???
      if ( !this ) { throw 'new Notificatoin()으로 실행해주세요.' }

      // selector 찾아서 변수에 담기
      this.$selectors = $(selector);
      // 수집한 selector들을 each문(순환)을 돌려서 index값 저장한 후 => delete 버튼을 찾아 click 이벤트 주기
      this.$selectors.each( i => {
        // 일치하는 (eq) index값을 변수에 담기
        let $selector_index = this.$selectors.eq(i);
        // 그 중에 .delete를 가진것을 찾아서 click 이벤트를 주고, close 함수를 바인딩
        $selector_index.find('.delete').on('click', this.close.bind($selector_index));
      });
    }
    close() {
      this.remove();
    }
  }

  // 밖에서도 Notification함수를 사용할 수 있도록 global 객체에 할당
  global.Notification = Notification;

  
  // console 찍어보기
  // let a = new Notification(' ');
  // let a = Notification('.box');
  // console.log(a);

  let b = new Notification('.delete')
  console.log(b);

  
})(window, window.jQuery);

console.log(Notification);
