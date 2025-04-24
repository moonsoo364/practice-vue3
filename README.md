# 250421 공부 내용 2.1 DOM ~ 2.7 v-model

## 2.1 DOM

DOM을 직접 업데이트하는 것은 무거운 작업, Vue는 Dom을 본따 만든 가상 Dom을
객체 트리로 만들어 관리한다.
가상DOM을 사용하면 실제 DOM을 조회하고 업데이트하는 것 보다 성능과 효율성이 높아진다.

```
브라우저 렌더링 과정
└── 해석기
    ├── HTML 파서
    └── CSS 파서
        ↓
└── 엘리먼트 스타일 연산 (Style Calculation)
        ↓
└── 레이아웃 (Layout / Reflow)
        ↓
└── 페인트 (Paint)
        ↓
└── 온스크린 드로잉 (Rasterization)
        ↓
└── 합성 (Compositing)
```

## 2.3 옵션 API

옵션 API는 Vue 컴포넌트 초기화에 필요한 Vue의 핵심 API다 이 API를 객체 형식으로 구조화된 컴포넌트 설정을 담고 있다.

다음은 옵션 API를 기반으로 생성한 루트 App 컴포넌트 구조다.

```jsx
import { createApp } from 'vue'
const App = {
  template: "this is the app's entrance",
}

const app = createApp(App)
app.mount('#app')
```

이 코드에서 HTML 템플릿은 일반 텍스트를 출력하지만 data() 함수를 사용하면 로컬 데이터의 상태를 정의할 수 있다. 여기에 render() 함수를 도입한 코드는 다음과 같다.

```jsx
import { createApp } from 'vue'
const App = {
  render() {
    return "This is the app's entrance"
  },
}
const app = createApp(App)
app.mount('#app')
```

## 2.5 데이터 프로퍼티를 통한 로컬 상태 생성

data()는 컴포넌트의 로컬 데이터 상태가 담긴 객체를 반환하는 익명 함수다. 반환된 객체는 데이터 객체라 부른다. 컴포넌트 인스턴스를 초기화할 때 Vue 엔진은 데이터 객체의 각 프로퍼티를 반응형 시스템에 추가해 벼경 사함을 추적하고 그에 따라 UI 템플릿을 다시 렌더링한다.

```jsx
//2-2
import {createApp} from 'vue'

type Data ={title : string;}

const App = {
  template : `<h1>{{title}}</h1>`,
    data() : Data {
      return{
      title : 'My First Vue component',
    }
  }
}
const app = createApp(App)
app.mount('#app')
```

모든 데이터 객체 프로퍼티는 this라는 컴포넌트 인스턴스를 통해 직접 또는 내부적으로 접근할 수 있다. 또한 this는 모든 컴포넌트의 로컬 메서드, computed 프로퍼티, life cycle hook에서 접근할 수 있다.

## 2.6 Vue 반응성 작동 방식

Vue에서는 Watcher 객체를 이용하여 컴포넌트의 데이터가 변경되면 큐에 변경된 Watcher 객체를 추가한다. Vue엔진이 이 큐 에서 Watcher를 Consume하고 Flush하여 DOM에 반영한다. 이 때 `nextTick()` API가 Consume 단계에서 수행된다.

## 2.7 v-model, 양방향 데이터 바인딩

vue는 v-model 디렉티브를 이용해 양방향 바인딩을 매우 간단하게 구현할 수 있다. v-model로 데이터 모델을 바인딩하면 데이터 모델링이 변경되면 자동으로 템플릿이 변경된다.

다음 예시에서 input에 문자를 입력하면 data, `name`에 값이 바인딩 되는 걸 확인 할 수 있다.

```jsx
import { createApp, type ComponentOptions } from 'vue'

const NameInput = {
  template: `
  <label for="name">
  Write your name:
    <input
     v-model="name"
     placeholder="Enter your name"
     id="name"
    />
  </label>
  `,
  data() {
    return {
      name: '',
    }
  },
}
const app = createApp({
  components: {
    NameInput,
  },
  template: `<NameInput/>`,
})
app.mount('#app')

```

# 250422 2.11 v-for ~ 2.12 v-on

## 2.11 v-for를 이용한 데이터 컬렉션 순회

Vue는 배열이나 객체처럼 반복적인 데이터 데이터 컬렉션을 순회하는 용도로 사용할 수 있는 v-for 디렉티브를 제공한다. v-for의 장점은 시간이 지나고 데이터가 아무리 변경되더라도 템플릿의 일관성을 유지할 수 있으며 데이터 컨텐츠를 엘리먼트에 동적으로 매핑할 수 있다는 점이다.

v-for는 배열, json 객체에 대해 순회할 수 있다.

아래는 배열에 의한 순회이다, index 0부터 2까지 배열의 요소를 li 태그안에 값으로 넣는다.

```tsx
const List = {
  template: `
  <ul>
    <li v-for="(task, index) in tasks" :key="task.id">
    {{title}} {{index}}: {{task.description}}
    </li>
  </ul>
  `,
  data() {
    return {
      tasks: [
        { id: 'task01', description: 'Buy Groceries' },
        { id: 'task02', description: 'Do laundry' },
        { id: 'task03', description: 'Watch Moonknight' },
      ],
      title: 'Task',
    }
  },
}
const app = createApp({
  components: { List },
  template: `<List/>`,
})
app.mount('#app')
```

아래는 객체 속성에 대한 순회이다. v-for에서 name은 객체의 키인 title, description, priority를 가르키고 name은 키에 대응대는 값을 나타낸다.

```jsx
//2-11 v-for
import { createApp } from 'vue'

const Collection = {
  data() {
    return {
      collection: {
        title: 'Watch Moonknight',
        description: 'Log in Disney+ and watch all the chapters',
        priority: 5,
      },
    }
  },
  template: `
  <ul>
    <li v-for="(value, name) in collection" :key="key">
    {{name}} : {{value}}
    </li>
  </ul>
  `,
}
const app = createApp({
  components: { Collection },
  template: `<Collection/>`,
})
app.mount('#app')
```

### 2.11.2 속성과 원소 바인딩 고유성

Vue 엔진은 v-for로 렌더링된 엘리먼트를 in-place-patch 전략에 따라 추적하고 업데이트 한다. 그러나 상황에 따라 리스트를 재배치해야 하는 경우가 있다. 또한 엘리먼트가 하위 컴포넌트의 상태에 영향을 받는 경우 원치 않는 동작을 방지할 필요가 있다. 이러한 이유로 Vue는 key라는 속성을 제공한다. key는 리스트 항목마다 각각 바인딩한다. Vue는 key를 단서 삼아 렌더링 노드와 하위 엘리먼트를 추적, 재사용, 정렬한다.

## 2.12 2.12 v-on을 이용한 이벤트 리스너 추가

DOM 이벤트를 리스너에 바인딩하려면 Vue 내장 디렉티브인 v-on 또는 축약형 @문자를 엘리먼트 태그에 적용한다. v-on 디렌티브는 다음과 같은 타입 값을 지정한다.

- 인라인 자바스크립트 구문이 담긴 문자열 형식
- 컴포넌트 옵션의 methods 프로퍼티에 정의된 컴포넌트 메서드명

v-on 디렉티브를 이용해 버튼 클릭 이벤트 구현

```jsx
//2-12 v-on eventlistner
import { createApp, type ComponentOptions } from 'vue'

type Data = {printMsg : string;}

const App = {
  template : `
    <button @click="printMessage">Click me</button>
    <div>{{printMsg}}</div>
  `,
  methods:{
    printMessage(){
      (this as ComponentOptions<Data>).printMsg = 'Button is clicked'
    }
  },
  data(): Data{
    return {
      printMsg: 'Noting to print yet!',
    }
  }
}
const app = createApp(App)
app.mount('#app')
```

## 2.12.1 v-on 이벤트 수정자를 이용한 이벤트 처리

브라우저는 대상 엘리먼트에 이벤트를 전달하기에 앞서 현재 DOM 트리 구조를 바탕으로 해당 이벤트의 전파 경로 목록을 구성한다. 이 경로의 마지막 노드는 대상 자체이고, 이전 경로는 차례로 상위 엘리먼트가 나열된다.

v-on 수정자의 큰 장점은 리스너를 최대한 단순하고 재사용 가능하도록 유지한다는 점이다. preventDefault 또는 stopPropagation처럼 구체적인 이벤트별 상세 기능을 내부적으로 고려할 필요가 없다.

아래 코드는 `stopPropagation()` 을 통해 직접 중지 시키는 예제이다.
method에서 Event의 존재 여부를 확인하고 있으면 `stopPropagation()` 을
호출해야한다.

```jsx
const App = {
template: ` <button @click="printMessage">`
methods:{
	printMessage(e : Event){
		if(e) e.stopPropagation()
		console.log("Button is clicked")
	}
}
```

아래 코드처럼 v-on 이벤트에 `.stop` 수정자를 명시하면 method에서
Event의 존재 여부를 확인 하지 않아도 된다.

```jsx
const App = {
template: ` <button @click.stop="printMessage">`
methods:{
	printMessage(e : Event){
		console.log("Button is clicked")
	}
}
```

### 키 코드 수정자를 이용한 키보드 이벤트 감지

이벤트 수정자는 이벤트 전파 흐름에 끼어들기 위해 사용하는 반면, key modifier는 특정 키가 일으키는 keyup, keydown, keypress 등의 키보드 이벤트를 감지하는 용도로 사용한다. 일반적으로 특정 키를 감지하려면 다음 두 단계를 수행해야 한다.

1. 해당 키가 나타내는 keyCode, key, code를 식별한다. 가령 엔터키의 keyCode는 13이며 key, code는 ‘Enter’다
2. 이벤트 핸들러를 실행할 때 핸들러 내부에서 event.keyCode, event.code, event.key 등이 대상 키와 일치하는 지 수동으로 확인한다.

다음은 key modifier를 이용해 input에 엔터 이벤트를 감지하는 예제 이다.

```jsx
//2-12 v-on eventlistner
import { createApp, type ComponentOptions } from 'vue'

const App = {
  template : `
    <input @keydown.enter="onEnter"/>
  `,
  methods:{
    onEnter(e: KeyboardEvent){
        console.log('Enter key pressed')
    }
  },

}
const app = createApp(App)
app.mount('#app')
```

키 코드를 수정자를 이용하여 Ctrl + Enter 또는 Shift + S와 같은  특수 키 조합을 감지할 수 있다. 이러한 시나리오에서 시스템 키 수정자 .shift, .ctrl, .alt등과 키 코드 수정자를 이어서 사용한다.

키 조작을 엄밀하게 판단해 이벤트를 발동하려면 .exact 수정자를 사용한다. .shift와 .exact가 결합되어 있어 사용자가 오직 shift 키만 누른 상태에서 클릭해야만 이벤트가 실행된다.

```jsx
import { createApp, type ComponentOptions } from 'vue'

const App = {
  template : `
    <div> 1.enter <input @keydown.enter="onEnter"/></div>
    <div> 2.ctrl + enter<input @keydown.ctrl.enter="onEnter"/></div>
    <div> 3.<button @click.shift.extract="onShiftClick">shift+ click</button></div>
    
  `,
  methods:{
    onEnter(e: KeyboardEvent){
        console.log('Enter key pressed')
    },
    onCtrlEntter(e: KeyboardEvent){
      console.log('Ctrl + Enter key pressed')
    },
    onShiftClick(e: KeyboardEvent){
      console.log('Shift + Click key pressed')
    },
  },
  
}
const app = createApp(App)
app.mount('#app')
```
# 250423 2.13 v-if ~ 2.17 v-memo

## 2.13 v-if 를 이용한 조건부 렌더링
Conditional Redering을 이용하면 Dom에서 엘리먼트를 생성하거나 제거할 수 있다.
if…else 논리 표현식으로 if, else, else if 조건 블록을 Vue에서 생성할 수 있다. 

```jsx
import { createApp } from 'vue'

const App = {
  template : `
  <span> 
    <div v-if="isVisible">I'm the visible text</div>
    <div v-else-if="showSubstile">I'm the subtitle text</div>
    <div v-else>I'm the invisible text</div>
  </span>
  `,
  data(){
    return {
      isVisible: false,
      showSubstile: false,
    }
  }
  
}
const app = createApp(App)
app.mount('#app')
```

## 2.14 v-show를 이용한 조건부 표시
v-if와 달리 v-show는 대상 엘리먼트의 가시성만 전환된다. Vue는 조건 판단 결과와 관계없이 대상 엘리먼트를 렌더링한다. 
렌더링 이후 Vue는 조건 판단 결과에 따라 CSS의 display규칙을 이용해 엘리먼트를 숨기거나 표시하는 방식으로 가시성을 제어한다.

```jsx
//2-14 v-show
import { createApp } from 'vue'

const App = {
  template : `
  <span> 
    <div v-show="isVisible">I'm the text in toggle</div>
    <div>Visablility : {{isVisible}}</div>
  </span>
  `,
  data(){
    return {
      isVisible: false
    }
  }
  
}
const app = createApp(App)
app.mount('#app')
```
## 2.15 html을 이용한 동적 HTML 표시

v-html을 이용해 이용해 일반 HTML 코드를 문자열 형태로 DOM에 동적으로 주입한다.

```jsx
//2-15 v-html
import { createApp } from 'vue'

const App = {
  template : `
    <div v-html="innerHtml"/>
  `,
  data(){
    return {
      innerHtml: '<h1>This is the app\'s entrance</h1><h2>We are exploring template syntax</h2>'
    }
  }
  
}
const app = createApp(App)
app.mount('#app')
```

Vue 엔진은 디렉티브값을 정적 HTML 코드 형태로 분석하고 div 엘리먼트의 innerHTML 프로퍼티에 배치한다. 

### v-html의 보안

v-html은 오직 신뢰할 수 있는 컨텐츠 렌더링 또는 서버 측 렌더링에만 사용에만 사용해야 한다. 또한 유효한 HTML 문자열이라도 script태그를 포함할 수 있으며 브라우저가 이 태그 속의 코드를 실행하면 잠재적인 보안 위협을 초래할 수 있다.

## 2.16 v-text를 이용한 텍스트 표시
v-text는 이중 중괄호처럼 엘리먼트 컨텐츠로 데이터를 주입하는 디렉티브이다. 그러나 {{}}와 달리 변경 사항이 있어도 렌더링된 텍스트를 업데이트하지 않는다.

아래 예시는 텍스트를 미리 정의한 다음 컴포넌트 로드가 완료된 후 한 번만 교체하려 할 때 유용하다.

```jsx
//2-16 v-text
import { createApp } from 'vue'

const App = {
  template : `
    <div v-text="text">PlaceHoder</div>
  `,
  data(){
    return {
      text: 'Hello World'
    }
  }
  
}
const app = createApp(App)
app.mount('#app')
```
## 2-17 v-once 및 v-memo를 이용한 렌더링 최적화
v-once는 정적 콘텐츠를 렌더링할 때 유용하다. 정적 엘리먼트를 재차 렌더링하지 않도록 방지함으로써 성능을 보존한다. Vue는 이 디렉티브가 사용된 엘리먼트를 요소를 한 번만 렌더링하며 어떠한 렌더링이 발생해도 업데이트하지 않는다.

아래 예시에서 Vue는 name이 담긴 div 태그를 한 번만 렌더링한다.
input 필드와 v-model을 통해 사용자가 name을 변경하더라도 div의 값은 업데이트 되지 않는다.
```jsx
//2-17 v-once 및 v-memo를 이용한 렌더링 최적화
import { createApp } from 'vue'

const App = {
  template : `
    <div>
      <input v-model="name" placeholder="Enter your name">
    </div>
    <div v-once>{{name}}</div>
  `,
  data(){
    return {
      name: 'My Name is..'
    }
  }
  
}
const app = createApp(App)
app.mount('#app')
```

v-memo는 자바스크립트 조건 표현식이 담긴 배열을 받아 렌더링을 제어하려는 부분의 최상위 엘리먼트에 탑재한다. Vue는 이러한 조건식의 유효성을 검사하고 해당 조건의 판단 결과가 이전과 달라졌을 때만 대상 엘리먼트 블록을 다시 렌더링한다. 
아래 예제에서 선택된 고양이 사진만 테두리가 적용되고 이전 선택된 사진은 테두리가 해제된다 두 가지 엘리먼트의 상태만 v-memo로 변경한다.  
```jsx
//2-17 v-once 및 v-memo를 이용한 렌더링 최적화
import { createApp } from 'vue'

const mainUrl = 'https://res.cloudinary.com/mayashavin/image/upload/w_100,h_100,c_thumb/'
const App ={
  template:`
    <ul>
      <li
        v-for="image in images"
        :key="image.id"
        @click="selected = image.id"
        :style="selected === image.id ? {border: '1px solid blue'} : {}"
        v-memo="[selected === image.id]">
          <img :src="image.url" :alt="image.title"/>
          <div>{{image.title}}</div>
        </li>
      </ul>
  `,
  data() {
    return {
      selected : null,
      images: [
        {
          id: 1,
          title: 'Cute Cat',
          url: mainUrl+'TheCute%20Cat',
        },
        {
          id: 2,
          title: 'Cute Cat no 2',
          url: mainUrl+'cute_cat',
        },
        {
          id: 3,
          title: 'Cute Cat no 3',
          url: mainUrl+'cat_me',
        },
        {
          id: 4,
          title: 'Just Cat',
          url: mainUrl+'cat_1',
        },
      ]
    }
  }
}

const app = createApp(App)
app.mount('#app')
```