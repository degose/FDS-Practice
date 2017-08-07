<template>
  <!-- 폼 필드 열기 버튼 클릭 시: show-form-overlay 설정 -->
  <!-- form 전송 시: form-submitted 설정 -->
  <div class="demo container" id="app" :class="show-form-overlay" v-cloak>
    <!-- <div class="show-form-overlay"> -->

    <!-- 폼 필드 열기 버튼 클릭 시: expand 설정 -->
    <div class="form-container" :class="expand">

      <button class="icon fa fa-pencil btn-expand" aria-label="폼 필드 열기" @click.prevent="expandForm"></button>
      <button class="icon fa fa-close btn-fold" aria-label="폼 필드 닫기" @click.prevent="foldForm"></button>

      <div class="form-content" v-if="!is_start">
        <div class="form-head">

          <!-- 메일 전송 전, 문구 -->
          <h2 class="headline pre">고민 상담 메일</h2>
          <p class="desc pre">어떤 이야기도 좋아요 고민을 이야기해주세요.</p>

          <!-- 메일 전송 후, 문구 -->
          <h2 class="headline post">감사합니다.</h2>
          <p class="desc post">보내주신 메일을 읽고 답변 드릴게요.</p>

        </div> <!-- // .form-head -->

        <form id="user_contact" novalidate>

          <label for="user_name" class="a11y-hidden">이름</label>
          <input
            :value="user.name"  
            required
            type="text"
            id="user_name"
            class="input name"
            placeholder="이름">

          <label for="user_email" class="a11y-hidden">이메일</label>
          <input
            required
            v-model="user.email"
            type="email"
            id="user_email"
            class="input email"
            pattern="[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*"
            placeholder="email@mail.net">

          <label for="user_subject" class="a11y-hidden">주제 선택</label>
          <select
            required
            id="user_subject"
            class="input select"
            v-model="user.subject">
            <option
              v-for="(subject,index) in subjects"
              :disabled="!subject.value"
              :value="subject.value"
              :key="'user_field-'+index">{{ subject.label }}</option>
            <!-- <option value="">주제를 선택해주세요.</option>
            <option value="school-violence">학교 폭력</option>
            <option value="record-problem">성적 고민</option>
            <option value="heterosexual-problem">이성 문제</option> -->
          </select>

          <label for="user_message" class="a11y-hidden">메시지</label>
          <textarea
            :value="user.message"
            required
            id="user_message"
            class="input message"
            placeholder="무엇을 도와드릴까요?"
          ></textarea>

          <input type="submit" class="input submit" value="메일 전송">

        </form>

      </div> <!-- // .form-contect -->
    </div> <!-- // .form-container -->
    <div class="form-overlay"></div>

    <!-- </div> -->

  </div> <!-- // .demo -->
    
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      user: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },
      subjects: [
        { value: '', label: '주제를 선택해주세요.' },
        { value: 'school-violence', label: '학교 폭력' },
        { value: 'record-problem', label: '성적 고민' },
        { value: 'heterosexual-problem', label: '이성 문제' },
      ],
      is_start: false
    }
  },
  methods: {
    expandForm() {
      // 'show-form-overlay'
      // 'expand'
      // this.is_start = true;

    },
    foldForm() {
      
    }
  }
}
</script>

<style lang="sass">
html
  font-size: 100%
  background: #fff
body
  margin: 0

</style>
