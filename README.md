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

키 코드를 수정자를 이용하여 Ctrl + Enter 또는 Shift + S와 같은 특수 키 조합을 감지할 수 있다. 이러한 시나리오에서 시스템 키 수정자 .shift, .ctrl, .alt등과 키 코드 수정자를 이어서 사용한다.

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
  template: `
  <span> 
    <div v-if="isVisible">I'm the visible text</div>
    <div v-else-if="showSubstile">I'm the subtitle text</div>
    <div v-else>I'm the invisible text</div>
  </span>
  `,
  data() {
    return {
      isVisible: false,
      showSubstile: false,
    }
  },
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
  template: `
  <span> 
    <div v-show="isVisible">I'm the text in toggle</div>
    <div>Visablility : {{isVisible}}</div>
  </span>
  `,
  data() {
    return {
      isVisible: false,
    }
  },
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
  template: `
    <div v-html="innerHtml"/>
  `,
  data() {
    return {
      innerHtml: "<h1>This is the app's entrance</h1><h2>We are exploring template syntax</h2>",
    }
  },
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
  template: `
    <div v-text="text">PlaceHoder</div>
  `,
  data() {
    return {
      text: 'Hello World',
    }
  },
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
  template: `
    <div>
      <input v-model="name" placeholder="Enter your name">
    </div>
    <div v-once>{{name}}</div>
  `,
  data() {
    return {
      name: 'My Name is..',
    }
  },
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
const App = {
  template: `
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
      selected: null,
      images: [
        {
          id: 1,
          title: 'Cute Cat',
          url: mainUrl + 'TheCute%20Cat',
        },
        {
          id: 2,
          title: 'Cute Cat no 2',
          url: mainUrl + 'cute_cat',
        },
        {
          id: 3,
          title: 'Cute Cat no 3',
          url: mainUrl + 'cat_me',
        },
        {
          id: 4,
          title: 'Just Cat',
          url: mainUrl + 'cat_1',
        },
      ],
    }
  },
}

const app = createApp(App)
app.mount('#app')
```

# 250424 2.18 전역 컴포넌트 ~ 3.1 싱글 컴포넌트 구조

## 2.1 2.18 전역 컴포넌트 등록

옵션 API의 components 프로퍼티에 등록한 컴포넌트는 단지 현재 컴포넌트 내부에서 명시적으로 사용할 수 있다. 현재 컴포넌트의 다른 하위 엘리먼트는 이러한 컴포넌트에 접근할 수 없다.

Vue인스턴스 메서드인 `Vue.component()` 는 다음과 같이 두 개의 파라미터를 인수로 입력 받는다.

- 컴포넌트 등록 이름을 나타내는 문자열
- 컴포넌트 인스턴스, 임포트된 SFC 모듈 또는 옵션 API 형식의 컴포넌트 설정 객체

컴포넌트를 전역적으로 등록하려면 app 인스턴스의 component()를 호출해야 한다.

아래 예제에서 MyComponent를 전역적으로 사용해야 할 때 app 인스턴스의 component()를 호출한다.

```jsx
import { createApp } from 'vue'

//SFC파일
import MyComponent from './components/my/MyComponent.vue'

// import './assets/main.css'
//원본 코드
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.component('MyComponent', MyComponent)
app.use(router)
app.mount('#app')
```

```jsx
<template>
  <MyComponent />
</template>
```

## 3.1 Vue 싱글 파일 컴포넌트 구조

Vue는 자체 표준 파일 형식인 Vue SFC를 도입하고 .vue라는 확장자를 붙였다. SFC는 컴포넌트의 HTML 템플릿 코드, 자바 스크립트 로직, CSS 스타일을 하나의 파일로 저장하며 고유한 코드 영역에서 관리한다.

**템플릿** : HTML 코드 블록이며 컴포넌트의 UI Vue를 렌더링한다. 컴포넌트마다 최상위 엘리먼트로 한 번만 나와야한다.

**스크립트** : 컴포넌트의 로직이 포함한 자바 스크립트 블록이다, 파일당 한 번만 나와야한다.

**스타일** : 컴포넌트의 스타일을 담는 CSS 코드 블록이며 하나의 컴포넌트 파일에 필요한 만큼 여러 번 추가할 수 있다.

```jsx
<template>
    <h2 class="heading">I am a Vue Component</h2>
</template>

<script lang="ts">
export default{
    name: "MyFirstComponent",
}
</script>
```

.vue 파일 형식은 고유한 확장 표준이므로 Webpack과 같은 빌드도구로 사전 컴파일해야한다. 컴파일 결과 .vue 파일은 브라우저가 처리할 수 있는 자바스크립트 및 CSS로 변환된다. Vite로 새 프로젝트를 생성하면 스캐폴딩 과정에서 이미 빌드 도구가 설정된다. 따라서 컴포넌트를 ES 모듈로 임포트하거나 다른 컴포넌트 파일 내부에서 Components로 선언 할 수 있다.

# 250428 3.2 타입 스크립트 지원 ~ 3.3 컴포넌트 라이프사이클 훅
## 3.2 defineComponent()와 타입 스크립트 지원
defineComponent() 메서드는 설정 객체를 입력받는 래퍼 함수다. 반환 결과는 같지만 타입 추론(inference)를 거쳐 컴포넌트를 정의한다. 

defineComponent() 는 Vue3.x 이상에서 사용할 수 있으며 타입 스크립트와 관련된 역할만 한다.

```jsx
<template>
  <h2 class="heading">{{ message }}</h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MyMessageComponent',
  data() {
    return {
      message: 'Welcome to Vue 3!',
    }
  },
})
</script>

```

defineComponent()는 가급적 복잡한 컴포넌트를 다룰 때만 사용하도록 한다. this 인스턴스로 컴포넌트 프로퍼티를 조작하는 경우가 대표적이다.  간단한 컴포넌트는 표준 메서드만으로 SFC 컴포넌트를 저으이해도 무방하다.

## 3.3 컴포넌트 라이프사이클 훅

Vue 컴포넌트의 라이프사이클은 Vue가 컴포넌트를 인스턴스화할 때 시작되고 인스턴스를 삭제할 때 끝난다.

전체 라이프사이클은 여러 단계로 나뉜다.

- initialize phase : Vue 렌더러가 컴포넌트 옵션 설정을 로드하고 인스턴스 생성을 준비한다.
first render phase : Vue 렌더러가 컴포넌트용 DOM을 생성하고 DOM 트리에 삽입한다.

- mounting phase : 컴포넌트에 속한 엘리먼트는 Dom 트리에 마운트 및 연결되어 있다. Vue 렌더러는 이 컴포넌트를 부모 컨테이너에 연결한다. 이 페이즈부터 컴포넌트의 Dom 노드를 `$el` 프로퍼티에 접근할 수 있다. 

- updating phase : 이 페이즈는 컴포넌트의 반응형 데이터가 변경될 때만 수행된다. Vue 렌더러는 변경된 데이터로 컴포넌트 Dom 노드를 다시 렌더링하고 패치 업데이트를 수행한다. 마운팅 페이즈와 마찬가지로 업데이트도 자식 엘리먼트부터 적용하기 시작해 컴포넌트 본체에서 완료된다.

- unmounting phase : Vue 렌더러가 Dom에서 컴포넌트를 분리하고 인스턴스와 모든 반응형 데이터를 제거한다. 마지막 단계로 애플리케이션에서 컴포넌트가 더이상 사용되지 않을 때 발생한다. 컴포넌트는 모든 자식 요소가 언마운팅되고 나서야 자신을 언마운팅할 수 있다.

### 3.3.1 setup
setup은 컴포넌트 라이프사이클이 시작되기 전에 발생하는 첫 이벤트 훅이다. 이 훅은 Vue가 컴포넌트를 인스턴스화하기 직전에 한 번 실행된다. 이 때는 아직 컴포넌트 인스턴스가 존재하지 않으므로 this에 접근할 수 없다.

```jsx
export default{
	setup(){
		console.log('setup hoook')
		console.log(this) // undefined
	}
}
```

### 3.3.2 beforeCreate

beforeCreate는 Vue 렌더러가 컴포넌트 인스턴스를 생성하기 전에 실행한다. 이때 Vue엔진 컴포넌트를 초기화했지만 아직 data() 함수를 실행하거나 computed 속성을 계산하지 않은 상태다. 따라서 반응형 데이터를 아직 사용할 수 없다.

### 3.3.3 created

created 훅은 Vue 엔진이 컴포넌트 인스턴스를 생성한 이후에 실행된다. 컴포넌트 인스턴스와 반응형 데이터, 와쳐, computed 프로퍼티, 메서드 정의 등이 존재하는 단계다.  그러나 Vue엔진은 아직 컴포넌트 인스턴스를 DOM에 마운팅하지 않았다.
created 혹은 컴포넌트의 최초 렌더링 이전에 실행된다. 외부 리소스에서 컴포넌트로 데이터를 로드할 때처럼 this가 필요한 작업을 실행하는 단계다.

### 3.3.4 beforeMount

beforeMount 훅은 created 다음에 실행된다. 이 시점에 Vue는 컴포넌트 인스턴스를 생성하고 최초 렌더링에 사용할 템플릿 컴파일을 마친다.

### 3.3.5 mounted

mounted 훅은 컴포넌트의 최초 렌더링 다음에 실행된다. 이 페이즈가 되면 $el 프로퍼티를 통해 컴포넌트가 렌더링한 DOM 노드에 엑세스할 수 있다. 컴포넌트의 DOM 노드를 이용해 부차적인 계산을 해야하는 경우 이 훅에서 처리한다.

### 3.3.6 beforeUpdate

Vue 렌더러는 로컬 데이터 상태가 변경될 때마다 컴포넌트의 Dom 트리를 업데이트한다.
beforeUpdate 훅은 업데이트 프로세스가 시작되기 이전에 실행되므로 아직까지 컴포넌트의 상태를 내부적으로 수정할 수 있다.

### 3.3.7 updated

updated 훅은 Vue 렌더러가 컴포넌트 DOM 트리를 업데이트한 다음 실행된다.

- updated, beforeUpdate, beforeMount, mounted 혹은 SSR에서 사용할 수 없다.

이 훅은 DOM이 조금이라도 업데이트되면 무조건 실행되므로 주의해서 사용해야 한다.

- updated 훅 내부에서 컴포넌트의 로컬 데이터 사앹를 변경하면 안된다.

### 3.3.8 beforeUnmount

beforeUnmount 혹은 Vue 렌더러가 컴포넌트를 언마운팅하기 전에 실행된다. 아직까지는 DOM 노드인 $el을 사용할 수 있다.

### 3.3.9 unmounted

unmounted 훅은 언마운트 프로세스가 정상적으로 완료되고 컴포넌트 인스턴스를 사용할 수 없게 된 이후로 실행된다. DOM 이벤트 리스너 등의 부가 옵저버 효과를 이 훅에서 정리할 수 있다.