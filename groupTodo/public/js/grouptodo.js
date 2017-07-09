// ! grouptodo.js

// 규칙
// ES5
// 네이티브
// IE 9+

(function(global,$){
  'use strict';

  // 변수 설정들
  var app, todo ,todo_buttons, todo_title, todo_content, todo_items, todo_storage, template, todo_item, target, remove_id, select, todo_items_1, todo_items_2, todo_items_3, value, e, value_1,value_2,value_3, template1 ,template2, template3;

  var document = global.document;
  var todo_api_address = '';
  var forEach = Array.prototype.forEach;


  function init() {



    // 메모 데이타 주소
    var e = document.getElementById('user').options[document.getElementById('user').selectedIndex].text;
        todo_api_address = "/" + e;   // << 데이터 저장되는 곳

    // html 요소 가져오기
    app = document.querySelector('.app');
    todo = document.querySelector('.todo'); // box
    todo_buttons = document.querySelectorAll('button')
    todo_title = document.querySelector('#todo-title');
    todo_content = document.querySelector('#todo-content');
    // todo_items = document.querySelector('.todo-item-container'); // todo 목록들 // ev.target주려면 있어야함
    todo_items_1 = document.querySelector('.todo-items-1');
    todo_items_2 = document.querySelector('.todo-items-2');
    todo_items_3 = document.querySelector('.todo-items-3');
    // todo_items2 = document.querySelector('.todo-item-container2'); // todo 목록들
    // todo_items3 = document.querySelector('.todo-item-container3'); // todo 목록들
    select = document.querySelector('select');
    // value = select.value;
    // console.log("value",value);
    

    

    // 데이터 가져오는 함수
    load();

    // 이벤트 걸어주는 함수
    bind();
    
  }

  // 데이터 통신
  // 데이터 가져오기
  function load(params) {


    // toDo.json에서 데에터 가져오기(GET)
    $.get(todo_api_address, function (data, status) {

      // 통신 연결 상태 확인
      // console.log('통신 상태:', status); // status
      // console.log('데이터:', data); // []
      
      // toDo.json에 데이터를 storage에 참조
      todo_storage = data;
      // console.log("todo_storage",todo_storage);

      // 데이터를 가져온 후 렌더링 해준다.
      render();
    });
  }

  // 이벤트 바인딩
  function bind() {

    // todo_button들에게 클릭 이벤트를 준다.(저장 : 취소)
    forEach.call(todo_buttons, function (button) {
      button.addEventListener('click', detectButton);
    });

    // todo아이템에 삭제 이벤트 
    todo_items_1.addEventListener('click', removeTodo);
    todo_items_2.addEventListener('click', removeTodo);
    todo_items_3.addEventListener('click', removeTodo);
    // 버튼 자체가 아니라 감싸고있는 컨테이너에 이벤트를 줬다. => 이유는 계속해서 생성될 todo아이템들에 계속해서 이벤트를 걸어줄 수 없으니 부모 요소에 넣어주고 캡처링을 이용하기 위해서. 
  }

  function detectButton() {
    // button 클래스 중에 is-save가 있으면 saveTodo : 없으면 cancelTodo
    this.classList.contains('is-save') ? saveTodo() : cancelTodo();
  }

  // todo_item에 title, content의 검증 => 빈 상태로 넘어가지 않게 끔
  function validateTodo(title, content) {
    if (title.value.trim() === '') {
      global.alert('제목이 없잖아!');
      todo_title.focus();
      return true;
    }
    if (content.value.trim() === '') {
      global.alert('내용이 없어!');
      todo_content.focus();
      return true;
    }
    return false;
  }

  // toDo.json에 데이터 추가하는(POST) 함수 
  function saveTodo() {
    if(validateTodo(todo_title, todo_content)){return;}
    // todo_item에 value값 불러오기
    todo_item = {

      title: todo_title.value,
      content: todo_content.value
    };

    // 서버에 올리기(POST)
    select = document.querySelector('select');
    value = select.value;
    
    var e = document.getElementById('user').options[document.getElementById('user').selectedIndex].text;
        todo_api_address = "/" + e;   // << 데이터 저장되는 곳
    $.post(todo_api_address, $.param(todo_item), function (data, status) {
      // .param 왜 해줬지? => 배열이나 객체를 string으로 바꿔줌( 왜냐하면 .post의 인자로 (api,string,콜백함수)가 와야해서)
      // 서버에 올린 후 가져오기(GET)
      load();
    });
    
    // 서버에 보낸 후 내용 지우기
    cancelTodo();
  }
  function cancelTodo() {
    todo_title.value = '';
    todo_content.value = '';
  }

  function removeTodo(ev) {
    // ev => bind함수에서 addEventListener의 인자로 전달된 콜백함수는 대신 실행해준다는 개념.. addEventListener의 인자로 뭐가 넘어가는지 알고 있어야 한다.
    target = ev.target;
    // todo_items에 걸어줬던 이벤트가 캡쳐링으로 넘어오다가 delete를 가진 button요소에게 이벤트가 걸어지게
    if (target.localName === 'button' && target.classList.contains('delete')) {
      // .localName => html에서 엘리먼트 이름을 소문자로 반환
      // .nodeName => html에서 엘리먼트 이름을 대문자로 반환

      remove_id = target.dataset.removeIndex;

      $.ajax({
        url: todo_api_address + '/' + remove_id,
        method: 'DELETE',
        dataType: 'json',
        success: function(data){
          load();
        }
      });
      ev.stopPropagation();
      // 이벤트 취소
    }
  }

  // todo 아이템 보이기
  function render() {
    // 왜 빈 문자열로 초기화? 초기화 안해주면 화면에 undefined나옴 => 뒤에 문자열 더해줄거라서 문자열이라고 말해주는것
    template1 = '';
    template2 = '';
    template3 = '';
    // todo_items에 태그 넣기
    // todo_items_1.innerHTML = '';
    // todo_items_2.innerHTML = '';
    // todo_items_3.innerHTML = '';
    // todo_storage에 목록들을 순환해서 tempate에 추가
    todo_storage.forEach(function (todo) {
      if ( value === "user1" ) {
        template1 += 
          '<article class="todo-item column message is-success">'+
            '<div class="message-header">'+
              '<h5 class="todo-item-title">'+todo.title+'</h5>'+
              '<button data-remove-index="'+todo.id+'" type="button" class="delete" aria-label="할일 아이템 제거"></button>'+
            '</div>'+
            '<div class="message-body">'+
              '<p class="todo-item-content">'+todo.content+'</p>'+
            '</div>'+
          '</article>'
        todo_items_1.innerHTML = template1;
      }
      else if ( value === "user2" ) {
        template2 += 
          '<article class="todo-item column message is-warning">'+
            '<div class="message-header">'+
              '<h5 class="todo-item-title">'+todo.title+'</h5>'+
              '<button data-remove-index="'+todo.id+'" type="button" class="delete" aria-label="할일 아이템 제거"></button>'+
            '</div>'+
            '<div class="message-body">'+
              '<p class="todo-item-content">'+todo.content+'</p>'+
            '</div>'+
          '</article>'
        todo_items_2.innerHTML = template2;  
      }
      else if ( value === "user3" ) {
        template3 += 
          '<article class="todo-item column message is-info">'+
            '<div class="message-header">'+
              '<h5 class="todo-item-title">'+todo.title+'</h5>'+
              '<button data-remove-index="'+todo.id+'" type="button" class="delete" aria-label="할일 아이템 제거"></button>'+
            '</div>'+
            '<div class="message-body">'+
              '<p class="todo-item-content">'+todo.content+'</p>'+
            '</div>'+
          '</article>'
        todo_items_3.innerHTML = template3;
      }
      
      // template += 
      // '<article class="todo-item column message is-info">'+
      //   '<div class="message-header">'+
      //     '<h5 class="todo-item-title">'+todo.title+'</h5>'+
      //     '<button data-remove-index="'+todo.id+'" type="button" class="delete" aria-label="할일 아이템 제거"></button>'+
      //   '</div>'+
      //   '<div class="message-body">'+
      //     '<p class="todo-item-content">'+todo.content+'</p>'+
      //   '</div>'+
      // '</article>'
    });
    // todo_items_3.innerHTML = template;
    // todo_items에 태그 넣기






    // if ( value === "user1") {
    //   todo_items_1.innerHTML = template;
    // }
    // else if (value === "user2") {
    //   todo_items_2.innerHTML = template;
    // }
    // else if (value === "user3") {
    //   todo_items_3.innerHTML = template;
    // }


    console.log("select.value:",value);
    console.log("value1",value_1);
    console.log('address',todo_api_address);
    // console.log(document.getElementById('user').options[document.getElementById('user').selectedIndex].index([1]));
  };

  // init 함수 실행
  init();
})(window,window.jQuery);