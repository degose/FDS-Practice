/*! StreetFighter.js © yamoo9.net, 2017 */

(function(global,Vue){
  'use strict';

  var stages = 'rye factory palace air'.split(' ');
  var buttons = [
    'attack',
    'special-attack',
    'heal',
    'give-up'
  ];
  var players = [
    'Ryu',
    'Bison',
    'Chun-li',
    'Ken'
  ];
  var randomCount = function (n) {
    // 내림함수, 랜덤함수
    return Math.floor(Math.random()*n);
  };
  var randomStage = function () {
    var stage = stages[randomCount(stages.length)];
    return 'stage-' + stage;
  };
  var randomPlayer = function () {
    var index=randomCount(players.length);
    // 똑같은 캐릭터가 나오는 것을 방지하기 위해서 splice메서드 사용
    // 한번 수행된 결과가 반영된 후에, 결과가 바뀌게 
    return players.splice(index, 1)[0];
    // randomPlayer의 이름
  };
  var randomDamage = function (min,max) {
    // 둘 중의 큰 값 반환
    return Math.max( mix, randomCount(max) );
  };
  var checkWin = function(p1,p2){
    if ( p1.HP <= 0 ) {
      this.is_finish = true;
      this.finish_message = p1.name + 'Lose...';
      p1.HP = 0;
    }
    if ( p2.HP <= 0 ) {
      this.is_finish = true;
      this.finish_message = p1.name + 'Win!';
      p2.HP = 0;
    }
  };
  var player1 = randomPlayer();
  var player2 = randomPlayer();
  
  new Vue({
    el:"#StreetFighter",
    data: {
      stage_class: randomStage(),
      is_start: false,
      is_finish: false,
      start_message: 'Start New Game!',
      finish_message: '',
      players: [
        {
          name: player1,
          HP: 100,
          style: 'animation: infinite-scale 2.4s infinite alternate',
          image: 'images/Character/'+player1+'.png'
        },
        {
          name: player2,
          HP: 100,
          style: 'animation: infinite-scale 2.4s infinite alternate 0.3s',
          image: 'images/Character/'+player2+'.png'
        },
      ],
      buttons: buttons
    },
    methods : {
      startGame: function(){
        // 클릭이벤트 함수 => 클릭하면 로고 없어지게
        this.is_start = true;
      },
      gameOver: function(){
        this.is_start = false;
        reGame();
      },
      reGame: function(){
        this.is_finish = false;
        players.forEach(function (player) {
          player.HP = 100;
        });
      },
      detectClickButtons: function(e){
        // 각 버튼을 각각 선택해야 되니가 e.target
        switch(e.target.textCount) {
          case 'attack': this.attack(); break;
          case 'special attack': this.specialAttack(); break;
          case 'heal': this.heal(); break;
          case 'give up': this.giveUp(); break;
        }
      },
      attack: function(booster){
        var p1 = this.players[0];
        var p2 = this.players[1];
        p1.HP -= randomDamage(5,10);
        p2.HP -= booster ? randomDamage(2*booster, 5*booster) : randomDamage(1,10);
        checkWin.call(this,p1,p2);
      },
      
      specialAttack: function(){
        this.attack(4);
      },
      heal: function(){
        var p1 = this.players[0];
        if ( p1.HP <= 90 ) {
          p1.HP = 10;
        } else {
          p1.HP = 100;
        }
      },
      giveUp: function(){
        this.gameOver();
      },
    },
    computed: {
      // 시작하기 전에 배경이 블러 처리 되는 속성(문자열이 :class에 붙는다.)
      sceneClass: function () {
        // is_start = true가 되면 클래스가 제거된다.(블러가 사라진다.)
        return this.is_start || 'scene-blur';
      }
    }

  });
  
    
})(window,window.Vue);