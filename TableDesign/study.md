# table태그를 이용한 웹페이지 만들기

참고 : <https://goo.gl/03VQC2>

## table태그의 쓰임새
- `<table>` : 표를 생성하는 가장 상위의 태그
- `<thead>` : 테이블 상단의 컬럼을 설명하는 제목들을 그룹화한 영역
- `<tbody>` : 테이블의 메인 콘텐츠에 해당하는 영역
- `<tfoot>` : 테이블 하단에 위치한 영역으로 풋터에 해당하는 부분을 그룹화한 영역
- `<tr>` : 행(row) - height값 지정
- `<th>` : 셀을 구분하기 위한 태그로 컬럼을 설명하는 thead 태그안의 위치하는 태그. td와 기능적으로 같으나 thead 태그안에 선언함
- `<td>` : 각각의 셀을 구성하는 태그 요소로 tbody안에 위치함 -  width값 지정

## table의 스타일 지정
- `border-collapse` 인접한 테두리의 뷰를 결정하는데 사용가능한 값 
    - `collapse`: 인접한 테두리가 하나로 표현
    - `separate` : 인접한 테두리들이 각각 모두 표현
- `table-layout` : 테이블 내부의 간격을 직접 설정하기 위해서 사용되는 속성 (가장 많이 쓰이는 속성 중 하나)
    - `fixed` : 테이블 태그의 내부 컬럼 간격을 원하는데로 조정할 경우 반드시 이 속성값이 fixed로 사용하여야 외부 css를 사용한 간격조정이 가능
```css
<table width="800" cellpadding="0" cellspacing="0" border="0" align="center">
border="0" width="600"
border-collapse: collapse;
table-layout: fixed;
```

## td태그 사용하여 테이블 컬럼, 로우 합치기
- `colspan` : 상하로 합치고자 하는 셀의 개수
- `rowspan` : 좌우로 합치고자 하는 셀의 개수

- 예시 
```html
   <tr>
      <td colspan="2">Test11</td>
   </tr>
```

## 실습

- tr height : 30px



- 홈페이지에서 리스트? 부분만 테이블로 구성하는것.(다시 짜자)
- susy 세팅할때 css에 container = wrapper에 뭐를 줘야함
- 테이블은 중첩하면 절대절대절대 안됨 -> 접근성에 절대 안좋음





#### susy 파일을 다 세팅하고 html파일을 열었는데 그리드가 보이지 않는다면...
- wrapper(전체 감싸주는 영역)에 `@include container(width);`를 줘야함
#### susy 그리드가 설정한 거터, 컬럼 값과 맞지 않는다면

#### fieldset 안에 form이 있는 경우, form안에 fieldset이 있는 경우

#### table thead가 정해지면 tbody는 thead의 td수만큼 사용 할 수 있는것?

#### 자바스크립트에서 새로운 알람이 뜰 때 파란 표시 나게 하려면 css에서 말고 마크업에 파란표시 해줘야 됨?

#### 언제 input a button 을 쓰는게 좋을까?
