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

defineComponent()는 가급적 복잡한 컴포넌트를 다룰 때만 사용하도록 한다. this 인스턴스로 컴포넌트 프로퍼티를 조작하는 경우가 대표적이다. 간단한 컴포넌트는 표준 메서드만으로 SFC 컴포넌트를 저으이해도 무방하다.

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
export default {
  setup() {
    console.log('setup hoook')
    console.log(this) // undefined
  },
}
```

### 3.3.2 beforeCreate

beforeCreate는 Vue 렌더러가 컴포넌트 인스턴스를 생성하기 전에 실행한다. 이때 Vue엔진 컴포넌트를 초기화했지만 아직 data() 함수를 실행하거나 computed 속성을 계산하지 않은 상태다. 따라서 반응형 데이터를 아직 사용할 수 없다.

### 3.3.3 created

created 훅은 Vue 엔진이 컴포넌트 인스턴스를 생성한 이후에 실행된다. 컴포넌트 인스턴스와 반응형 데이터, 와쳐, computed 프로퍼티, 메서드 정의 등이 존재하는 단계다. 그러나 Vue엔진은 아직 컴포넌트 인스턴스를 DOM에 마운팅하지 않았다.
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

# 250428 3.4 메서드 ~ 3.6 watcher 프로퍼티

메서드 로직은 일반적으로 컴포넌트 데이터에 의존하지 않도록 작성한다. 그러나 this 인스턴스를 사용하면 메서드 내부에서 컴포넌트의 로컬 상태에 접근할 수는 있다. 컴포넌트 메서드는 methods 프로퍼티에 함수 형태로 정의한다. message 프로퍼티를 역순으로 바꾸는 메서드 정의 예시다.

```jsx
<template>
 <h2 class="heading">I am {{ reversedMessage() }}</h2>
 <input v-model="message" type="text" placeholder="Enter your name"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ReversedMessage',
  data() {
    return {
      message: '',
    }
  },
  methods:{
    reversedMessage():string {
      return this.message.split('').reverse().join('');
    }
  }

})
</script>

```

또한 컴포넌트 메서드는 this 인스턴스를 통해 다른 프로퍼티 또는 라이프사이클 훅 내부에서 실행할 수 있다. 예를 들어 다음 코드는 reverseMessage를 작게 나누어 reverse()와 arrToString() 이라는 두 메서드를 추가한다.

```jsx
<template>
 <h2 class="heading">I am {{ reversedMessage(message) }}</h2>
 <input v-model="message" type="text" placeholder="Enter your name"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ReversedMessage',
  data() {
    return {
      message: '',
    }
  },
  methods:{
    reverse(message: string):string[]{
      return message.split('').reverse()
    },
    arrToString(arr: string[]):string{
      return arr.join('')
    },
    reversedMessage(message : string):string {
      return this.arrToString(this.reverse(message))
    }
  }

})
</script>

```

메서드를 잘 쓰면 컴포넌트를 체계적으로 유지할 수 있다. Vue는 필요한 경우에만 메서드를 실행하며 그때마다 로컬 데이터를 이용해 새로운 데이터를 동적으로 계산할 수 있다. 템플릿 내부에서 메서드를 호출하는 위 예제가 이런 예시이다. 그러나 Vue는 메서드 실행 결과를 캐시로 저장하지 않으며 매번 렌더링할 때 마다 새로 실행한다. 따라서 계산된 데이터가 필요할 때는 computed 프로퍼티를 사용하는 것이 낫다.

## 3.5 computed 프로퍼티

computed 프로퍼티는 Vue의 고유 기능이며 컴포넌트의 기존 반응형 데이터를 이용해 새로운 반응형 데이터 프로퍼티를 계산하는 역할을 한다. computed 프로퍼티 필드 내부에 나열된 함수는 각각의 계산값을 반환한다.

```jsx
<template>
 <h2 class="heading">I am {{ reversedMessage }}</h2>
 <input v-model="message" type="text" placeholder="Enter your name"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ReversedMessage',
  data() {
    return {
      message: '',
    }
  },
  computed:{
    reversedMessage(){
      return this.message.split('').reverse().join('')
    }
  },


})
</script>

```

컴포넌트 로직에서 this 인스턴스를 통해 computed 프로퍼티에 접근할 수 있다. 로컬 데이터 프로퍼티와 동일한 접근 방식이다. 또한 기존 computed 프로퍼티값을 이용해 또 다른 computed를 계산하는 것도 가능하다.

```jsx
<template>
  <h2 class="heading">I am {{ reversedMessage }}</h2>
  <h2 class="heading">length : {{ reverseMessageLength }}</h2>
  <input v-model="message" type="text" placeholder="Enter your name" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ReversedMessage',
  data() {
    return {
      message: '',
    }
  },
  computed: {
    reversedMessage() {
      return this.message.split('').reverse().join('')
    },
    reverseMessageLength() {
      return this.reversedMessage.length
    },
  },
})
</script>

```

Vue 엔진은 computed 프로퍼티의 값을 자동으로 캐시에 저장하고 해당 프로퍼티와 관련된 반응형 데이터가 변경될 때만 값을 다시 계산한다.
computed 프로퍼티를 잘 쓰면 복잡한 데이터 조작 과정을 재사용 가능한 데이터 블록으로 구성할 수 있다. 따라서 코드는 줄고 정돈되며 컴포넌트 성능은 향상된다. 또한 computed 프로퍼티 함수 로직에 포함된 반응형 데이터는 자동으로 와처 설정되는 효과를 얻는다.

그러나 이러한 자동 와처 메커니즘은 특정 상황에서 컴포넌트 성능 유지 목적으로 오버헤드를 발생시킬 우려가 있다. 이럴 경우에는 watch 프로퍼티 필드를 통해 직접 와처를 설정하는 것이 좋다.

## 3.6 와처

와처는 컴포넌트의 반응형 데이터 프로퍼티 변화를 프로그램 방식으로 관찰하고 처리하는 기능이다. 각 와처는 하나의 함수이며 newValue와 oldValue라는 두 인수를 전달 받는다. 전자는 관찰 데이터의 새로운 값 후자는 기존값을 나타낸다. 반응형 데이터에 와처를 정의하려면 다음과 같이 watch 프로퍼티 필드에 함수를 추가한다.

```jsx
<template>
  <input v-model="message" type="text" placeholder="Enter your name" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ReversedMessage',
  data() {
    return {
      message: '',
    }
  },
  watch: {
    message(newValue: string, oldValue: string) {
      console.log(`new Value : ${newValue}, old Value : ${oldValue}`)
    },
  },
})
</script>

```

한편 와처의 작동 방식을 직접 설정하고 이를 객체에 담아 와처 이름에 전달하는 방법도 있다.

| 필드      | 설명                                                               | 타입      | 기본값 | 필수   |
| --------- | ------------------------------------------------------------------ | --------- | ------ | ------ |
| handler   | 대상 데이터 값이 변경될 때 실행되는 콜백 함수                      | function  | N/A    | 예     |
| deep      | 대상 데이터의 하위 프로퍼티 변화 관찰여부                          | boolean   | false  | 아니요 |
| immediate | 컴포넌트 마운트 이후 핸들러 즉시 실행 여부                         | boolean   | false  | 아니요 |
| flush     | 핸들러 실행 시점 , Vue는 컴포넌트 업데이트 전에 핸들러를 실행한다. | pre, post | pre    | 아니요 |

### 3.6.1 하위 프로퍼티 변화 관찰

deep 옵션 필드를 설정하면 하위 프로퍼티의 변화를 관찰할 수 있다.

```jsx
<template>
  <div>
    <div>
      <label for="name"
        >Name:
        <input v-model="user.name" placeholder="Enter Your name" id="name" />
      </label>
    </div>
    <div>
      <label for="age"
        >Age:
        <input type="number" v-model="user.age" placeholder="Enter your age" id="age" />
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

type User = {
  name: string
  age: number
}
export default defineComponent({
  name: 'userWatcherComponent',
  data(): { user: User } {
    return {
      user: {
        name: 'John',
        age: 30,
      },
    }
  },
  watch: {
    user: {
      handler(newValue: User, oldValue: User) {
        console.log({ newValue, oldValue })
      },
      deep: true,
    },
  },
})
</script>

```

Vue 엔진은 user.name 또는 user.age 값이 변경될 때 마다 user 와처를 실행한다. 아래는 user.name 값을 변경했을 때 user 와처가 출력하는 콘솔 로그 화면이다.

```jsx
{newValue: Proxy(Object), oldValue: Proxy(Object)}
newValue
:
Proxy(Object) {name: 'moons', age: 300}
oldValue
:
Proxy(Object) {name: 'moons', age: 300}
[[Prototype]]
:
Object
```

출력 결과를 보면 user의 newValue와 oldValue가 같다. 그 이유는 user라는 인스턴스 자체는 업데이트에 관계없이 동일한 대상이기 때문이다. 변경사항은 name 필드의 값일 뿐이다.

또한 deep 플래그를 켜면 Vue엔진은 user 객체의 모든 프로퍼티와 하위 프로퍼티를 순회하며 변화를 관찰한다. 따라서 user 객체 내부 데이터 구조가 과하게 복잡할 경우 성능에 지장을 줄 우려가 있다. 이럴 때는 모니터링 대상 프로퍼티를 명확히 지정하는 것이 좋다.

# 250429 3.7 slot

## 3.7 슬롯

Vue의 경우 엘리먼트의 기본 UI 디자인을 필요에 따라 동적으로 교체할 수 있도록 <slot> 컴포넌트를 제공한다.

<template>
  <ul class="list-layout">
    <li class="list-layout__item" v-for="item in items" :key="item.id">
      <div class="list-layout__item__name">{{ item.name }}</div>
      <div class="list-layout__item__description">{{ item.description }}</div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Item{
    id: number
    name: string
    description: string
    thumbnamil?: string
  }
const subPath = "https://res.cloudinary.com/mayashavin/image/upload/v1643005666/Demo/"

export default defineComponent({

  name: 'ListLayout',
  data(): { items : Item[] } {
    return {
      items:[
        {
          id: 1,
          name: 'Item 1',
          description: "This is item 1",
          thumbnamil: subPath+'supreme_pizza'
        },
        {
          id: 2,
          name: 'Item 2',
          description: 'This is item 2',
          thumbnamil: subPath+'hawaiian_pizza'
        },
        {
          id: 3,
          name: 'Item 3',
          description: 'This is item 3',
          thumbnamil: subPath+'pina_colada_pizza'
        }
      ]
    }
  },
})
</script>

이 코드는 일정 범위 안에서 특정 데이터 프로퍼티를 참조하는 슬롯을 생성한다. 여기서 item은 destructuring 구문이라 부른다. 아래는 커스텀 템플릿 컨텐츠에서 item을 직접 다룰 수 있다.

```html
<template>
  <ul class="list-layout">
    <li class="list-layout__item" v-for="item in items" :key="item.id">
      <slot :item="item">
        <div class="list-layout__item__name">{{ item.name }}</div>
        <div class="list-layout__item__description">{{ item.description }}</div>
      </slot>
    </li>
  </ul>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  interface Item {
    id: number
    name: string
    description: string
    thumbnamil?: string
  }
  const subPath = 'https://res.cloudinary.com/mayashavin/image/upload/v1643005666/Demo/'

  export default defineComponent({
    name: 'ListLayout',
    data(): { items: Item[] } {
      return {
        items: [
          {
            id: 1,
            name: 'Item 1',
            description: 'This is item 1',
            thumbnamil: subPath + 'supreme_pizza',
          },
          {
            id: 2,
            name: 'Item 2',
            description: 'This is item 2',
            thumbnamil: subPath + 'hawaiian_pizza',
          },
          {
            id: 3,
            name: 'Item 3',
            description: 'This is item 3',
            thumbnamil: subPath + 'pina_colada_pizza',
          },
        ],
      }
    },
  })
</script>
```

```html
<template>
  <ListLayout v-slot="{item}">
    <img
      v-if="item.thumbnamil"
      class="list-layout__item__thumnail"
      :src="item.thumbnamil"
      :alt="item"
    />
    <div class="list-layout__item__name">{{ item.name }}</div>
  </ListLayout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import ListLayout from './ListLayout.vue'

  export default defineComponent({
    components: { ListLayout },
    name: 'ProductItemList',
  })
</script>

<style scoped>
  .list-layout__item__thumnail {
    width: 400px; /* 원하는 너비 */
    height: auto; /* 비율 유지 */
    object-fit: cover; /* 이미지가 잘리지 않도록 조정 */
  }
</style>
```

```html
<template>
  <ProductItemList></ProductItemList>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import ProductItemList from './ProductItemList.vue'

  export default defineComponent({
    components: { ProductItemList },

    name: 'MyComponent',
  })
</script>
```

이 예제는 엘리먼트를 단일 슬롯으로 지정해 템플릿을 커스터마이징하는 slot 컴포넌트 사용 사례다 훨씬 복잡한 시나리오도 얼마 든지 있다. 가령 상품 카드 섬네일, 상세설명 기능 영역 등을 각각 커스터마이징 한다면 어떨까? 이러 상황은 slot의 특기중 하나인 명명 기능(naming capability) 을 활용해 대처할 수 있다.

## 3.8 템플릿과 v-slot으로 명명된 슬롯

아이템 이름과 설명부 UI를 단일 슬롯에 담아 커스터마이징 영열을 설정했다. 이러한 영역을 섬네일, 상세 설명, 기능 푸터 등으로 각각 분할하려면 아래 예제처럼 name 속성을 지정해야 한다.

```html
<template>
  <ul class="list-layout">
    <li class="list-layout__item" v-for="item in items" :key="item.id">
      <slot name="thumnail" :item="item"></slot>
      <slot name="main" :item="item">
        <div class="list-layout__item__name">{{ item.name }}</div>
        <div class="list-layout__item__description">{{ item.description }}</div>
      </slot>
      <slot name="actions" :items="item"></slot>
    </li>
  </ul>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  interface Item {
    id: number
    name: string
    description: string
    thumbnamil?: string
  }
  const subPath = 'https://res.cloudinary.com/mayashavin/image/upload/v1643005666/Demo/'

  export default defineComponent({
    name: 'ListLayout',
    data(): { items: Item[] } {
      return {
        items: [
          {
            id: 1,
            name: 'Item 1',
            description: 'This is item 1',
            thumbnamil: subPath + 'supreme_pizza',
          },
          {
            id: 2,
            name: 'Item 2',
            description: 'This is item 2',
            thumbnamil: subPath + 'hawaiian_pizza',
          },
          {
            id: 3,
            name: 'Item 3',
            description: 'This is item 3',
            thumbnamil: subPath + 'pina_colada_pizza',
          },
        ],
      }
    },
  })
</script>
```

각 슬롯에는 thumnail, main, actions라는 이름이 할당된다. 이들 중 main 슬롯은 아이템 이름과 설명을 표시하는 fallback 컨텐츠 템플릿을 담고 있다.

커스텀 컨텐츠를 특정 슬롯에 전달하려면 먼저 컨텐츠를 template 태그로 감싼다. 그리고 해당 슬롯에 정의된 이름을 template 태그의 v-slot 디렉티브로 전달한다. 가령 다음 템플릿 컨텐츠는 이름이 slot-name인 슬롯으로 전달한다.

```html
<template #slot-name> </template>
```

# 250430 3.9 ref ~ 3.10 믹스인

## 3.9 ref의 이해

Vue는 통상적으로 대부분의 DOM 상호작용을 알아서 처리한다. 그러나 일부상황에서 DOM을 세밀하게 조작하기 위해 컴포넌트 DOM 엘리먼트에 직접 접근할 필요가 있다. 이를테면 사용자가 버튼을 클릭할 때 모달 대화 상자를 연다거나, 컴포넌트 마운트 직후 특정 입력 필드에 포커스를 두려 하는 상황이다. 이러한 경우 ref 속성을 이용해 대상 DOM 엘리먼트 인스턴스에 접근할 수 있다.

ref는 Vue 내장 속성이며 DOM 엘리먼트 또는 마운팅된 자식 인스턴스의 직접 참조를 전달해준다. ref 속성이 참조하는 대상 엘리먼트는 template 섹션에 있으며 대상 엘리먼트를 가르키는 참조 문자열을 ref 속성값으로 할당한다. ref는 아래는 DOM 엘리먼트 input을 참조하는 messageRef 생성예시다.

```jsx
<template>
  <div>
    <input type="text" ref="messageRef" placeholder="Enter a message"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyComponent',
})
</script>

```

script 섹션에서 this.$refs.messageRef 인스턴스를 통해 messageRef에 접근하고 input 엘리먼트를 조작할 수 있다. messageRef는 참조 인스턴스로써 input 엘리먼트의 모든 프러퍼티와 메서드를 보유한다. 가령 this.$refs.messageRef.focus()를 실행하면 프로그램 방식으로 input 엘리먼트에 포커스를 지정할 수 있다.

- ref 속성은 컴포넌트를 마운팅한 이후에 접근할 수 있다.

참조 인스턴스는 대상 DOM 엘리먼트 또는 자식 컴포넌트 인스턴스의 모든 프로퍼티와 메서드를 보유한다. 구체적인 종류는 대상 엘리먼트의 타입에 따라 다르다. 만일 v-for를 적용한 엘리먼트에 ref 속성을 지정하면 참조 인스턴스는 반복 엘리먼트 전체가 순서없이 나열된 배열이 된다.

```jsx
<template>
  <div>
    <ul>
      <li v-for="(task,index) in tasks" :key="task.id" ref="tasksRef">
        {{ title }} {{ index }} : {{ task.description }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import type { Task } from '@/ts_class/Task.ts'
import { defineComponent } from 'vue'
interface Task {
    id: string;
    description: string;
}
export default defineComponent({
  name: 'TaskListComponent',
  data() : {tasks: Task[],title: string}{
    return {
      tasks: [
        {id: 'task01', description: 'Buy Groceries'},
        {id: 'task02', description: 'Do laundry'},
        {id: 'task03', description: 'Watch Moonknight'},
      ],
      title: 'Task'
    };
  }
})
</script>

```

Vue가 TaskListComponent를 마운팅하면 3개의 li DOM 엘리먼트가 담긴 taskRef 인스턴스가 refs의 프로퍼티로 지정된다. tasksRef는 Vue 데브툴에서 확인할 수 있다.

this.$refs.taskRef를 통해 테스크 목록에 접근하고 원하는 데로 테스트를 추가하거나 수정할 수 있다.

- ref앞에 :문자를 붙이면 문자열이 아닌 함수를 할당할 수 있다. 이 함수는 해당 엘리먼트의 참조 인스턴스를 파라미터로 입력받는다.

## 3.10 믹스인과 컴포넌트 설정 공유

서로 다른 컴포넌트가 유사한 데이터와 행동을 공유하는 것은 그리 드문 일이 아니다. 카페 컴포넌트와 레스토랑 컴포넌트를 상상하면 이해하기 쉽다. 둘 모두 예약, 결제 로직을 공유하는 동시에 자신만의 고유한 기능도 필요하다. 이러한 경우 두 컴포넌트가 공유할 표준 기능성을 (functionality) mixins 프로퍼티로 생성해두면 좋다.

아래는 DiningComponent와 CafeComponent라는 두 컴포넌트의 표준 기능성을 담은 restrantMixin 객체를 생성한다.

DiningComponent를 created 훅이 먼저 실행되고 mixin.ts 에 있는 created hook이 호출된다.

```jsx
import { defineComponent } from 'vue'

export const retraurantMixin = defineComponent({
  data() {
    return {
      menu: [],
      reservations: [],
      payments: [],
      title: 'Resturant',
    }
  },
  methods: {
    makeReservation() {
      console.log('Reservation made')
    },
    acceptPayment() {
      console.log('Payment accepted')
    },
  },
  created() {
    console.log(`Welcome to ${this.title}`)
  },
})
```

```jsx
<template>
    <h1>title</h1>
    <button @click="getDressCode">getDressCode</button>
    <button @click="makeReservation">Make a reservation</button>
    <button @click="acceptPayment">Accept a payment</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {retraurantMixin} from '@/components/do/ch03/3_10_mixin/RestaurantMixin'

export default defineComponent({
    name: 'DiningComponent',
    mixins: [retraurantMixin],
    data() {
        return {
            title: 'Dining',
            menu: [
                { id: 'menu01', name: 'Steak' },
                { id: 'menu02', name: 'Salad' },
                { id: 'menu03', name: 'Soup' },
            ]
        };
    },
    methods:{
        getDressCode(){
            console.log('Dress code: Casual');
        }
    },
    created() {
     console.log('DiningComponent component created');
    }
})
</script>

```

```jsx
<template>
    <h1>{{title}}</h1>
    <p>Open time: 8am ~ 4pm</p>
    <ul>
        <li v-for="menuItem in menu" :key="menuItem.id">
            {{ menuItem.name }}

        </li>
    </ul>
    <button @click="acceptPayment">Accept a payment</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {retraurantMixin} from '@/components/do/ch03/3_10_mixin/RestaurantMixin'

export default defineComponent({
    name: 'CafeComponent',
    mixins: [retraurantMixin],
    data() {
        return {
            title: 'Cafe',
            menu: [
                { id: 'menu01', name: 'Cafe' ,price:5},
                { id: 'menu02', name: 'Tea' ,price:3},
                { id: 'menu03', name: 'Cale' ,price:7},
            ] as { id: string; name: string; price: number }[],
        };
    },
    methods:{
        getDressCode(){
            console.log('Dress code: Casual');
        }
    },
    created() {
     console.log('CafeComponent component created');
    }
})
</script>

```

```jsx
<template>
  <DiningComponent></DiningComponent>
  <cafe-component></cafe-component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DiningComponent from '@/components/do/ch03/3_10_mixin/DiningComponent.vue'
import CafeComponent from '@/components/do/ch03/3_10_mixin/CafeComponent.vue'

export default defineComponent({
  components: {DiningComponent,CafeComponent},

  name: 'MyComponent'
    ,

})
</script>

```

컴포넌트가 생성되면 Vue 엔진은 믹스인 로직을 컴포넌트에 병합한다. 컴포넌트의 데이터 정의와 믹스인이 상충할 경우 우선권은 데이터에 있다. DiningComponent와 CafeComponent는 menu, reservations, payments, title 등의 프로퍼티를 동일하게 보유하지만 각각의 값은 다르다. 또한 restrauranMixins에 선언된 메서드와 훅은 두 컴포넌트에서 동일하게 사용할 수 있다. 이러한 작동 방식은 컴포넌트가 믹스인 훅의 행동을 오버라이드하지 않는 다는 점을 제외하면 마치 상속 패턴과 비슷하다. 다만 Vue 엔진은 믹스인의 훅을 먼저 호출한 다음 컴포넌트 훅을 호출한다.

Vue가 DiningComponent를 마운팅하면 브라우저 콘솔에 다음과같이 출력된다.

```jsx
Welcome to Dining
DiningComponent component created
```

출력 결과를 보면 두 컴포넌트의 title값이 다르게 설정되었음을 알 수 있다. 또한 Vue는 restraurantMixin의 created 훅을 먼저 실행하고 각 컴포넌트에 선언된 훅을 이어서 실행했다.

믹스인은 컴포넌트 사이에 공통 로직을 공유하고 코드 조직화를 하는데 큰 역할을 한다. 그러나 믹스인을 남발하면 다른 개발자가 코드를 읽거나 디버깅할 때 큰 혼란을 야기하기 쉽다. 믹스인을 선택하기 전에 Composition API등의 대안이 더 적합한 상황이 아닌 지 검토해본다.

# 250501 ~ 250502, 3.10 scoped ~  

## 3.11 컴포넌트 스타일과 적용 범위

일반 HTML 페이지 구조와 마찬가지로 SFC 컴포넌트 또한 <style> 태그로 CSS 스타일을 정의할 수 있다.

style 섹션은 일반적으로 Vue SRC 컴포넌트에 마지막 순서로 등장한다.
복수의 섹션이 존재해도 무방하다. 컴포넌트가 DOM에 마운팅되면 Vue엔진은  
style 태그에 정의된 CSS 스타일을 애플리케이션 전체에 적용한다. 이때 적용 대상은 전체 엘리먼트 혹은 DOM 선택자와 일치하는 엘리먼트다. 다시 말해 컴포넌트의 style에 작성된 CSS 규칙은 일단 마운팅된 후 전역적으로 적용된다.

```jsx
<template>
  <h1 class="heading">{{ title }}</h1>
  <p class="class">{{ description }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeadingComponent',
  data(): { title: string; description: string } {
    return {
      title: 'Welcome to Vue Restaurant',
      description: 'A Vue.js project to learn Vue.js',
    }
  },
})
</script>

<style scoped>
.heading {
  color: #178c0e;
  font-size: 2em;
}

.description {
  color: #b76210;
  font-size: 1em;
}
</style>

```

컴포넌트에서 h1과 p 엘리먼트는 각각 heading과 description이라는 CSS 클래스 선택자가 지정된다. Vue가 컴포넌트를 마운팅하면 브라우저는 지정된 스타일에 맞게 엘리먼트를 표현한다.

HeadingComponent의 부모 컴포넌트인 App.vue에 span 엘리먼트를 추가하고 동일하게 heading 클래스 선택자를 지정한다.

```jsx
<template>
  <section class="wrapper">
    <HeadingComponent />
    <span class="heading">This is span a element in parent</span>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeadingComponent from '@/components/do/ch03/3_11_style/HeadingComponent.vue'

export default defineComponent({
  name: 'ParentComponent',
  components: { HeadingComponent },
  data(): { title: string; description: string } {
    return {
      title: 'Welcome to Vue Restaurant',
      description: 'A Vue.js project to learn Vue.js',
    }
  },
})
</script>

<style scoped></style>

```

HeadingComponent에 템플릿이 없거나 애플리케이션 런타임에 포함되기 전이라면 App.vue의 span 엘리먼트는 heading 클래스 선택자와 일치하는 CSS 규칙을 찾을 수 없다.

이러한 사고를 방지하려면 스타일 규칙과 선택자를 더욱 효과적으로 제어할 수 있어야 한다. 이를 위해 Vue는 scoped 속성이라는 고유한 기능을 제공한다. Vue는 style scoped 의 CSS 규칙을 컴포넌트 내부 엘리먼트에 한해 적용하며 애플리케이션의 나머지 영역으로 유출되지 않도록 한다. 이러한 Vue 메커니즘은 다음과 같은 과정으로 진행된다.

1. 대상 엘리먼트에 데이터 속성을 추가한다. 속성명은 data-v 접두어와 무작위 데이터를 연결한 문자열이다.
2. style scoped 태그에 저으이된 CSS 선택자가 이 데이터 속성을 포함하도록 추가한다.

이 기능이 실제로 어떻게 동작하는 지 살펴보자.

```jsx
<style scoped>
.heading {
  color: #178c0e;
  font-size: 2em;
}

.description {
  color: #b76210;
  font-size: 1em;
}
</style>
```

부모컴포넌트에 정의된 span 엘리먼트는 HeadingComponent의 h1 엘리먼트와 CSS 스타일이 다르다.
브라우저 개발자도구에서 Elements 요소를 보면 아래와 같이 data-v-xxxx 속성이 지정되어 있다.

```jsx
<h1 data-v-3fefa2fa="" class="heading">Welcome to Vue Restaurant</h1>

.heading[data-v-3fefa2fa] {
    color: #178c0e;
    font-size: 2em;
}
```

컴포넌트를 작성할 때부터 scoped 속성을 지정할 것을 권장한다. 프로젝트 성장에 따른 예기치 못한 CSS 버그를 방지하는 좋은 습관이다.

- 브라우저 CSS 스펙에 따라 스타일 적용 순서를 결정한다. Vue scoped 메커니즘은 컴포넌트 스타일에 속성 선택자 [data-v-xx]를 추가한다. 따라서 부모 컴포넌트에 .heading이 있다 헤도 자식 컴포넌트의 .heading 선택자만으로 이를 오버라이딩 할 수 없다.

### 3.11.2 슬롯 컨텐츠에 scoped 스타일 적용하기

설계 의도상 style scoped 태그에 정의된 모든 스타일은 해당 컴포넌트의 기본 template만 관할한다. 따라서 Vue는 슬롯 컨텐츠에 data-v-xxxx 속성을 추가하지 않는다. 슬롯 컨텐츠에 스타일을 지정하려면 :slotted([CSS 선택자]) 형태로 의사 클래스를 사용하거나 부모 선에서 슬롯 전용 style 섹션을 마련하고 체계적으로 관리해야 한다.

### 3.11.3 스타일 태그에서 v-vind()로 컴포넌트 데이터 접근하기

컴포넌트 데이터에 접근해 값을 얻고 이를 CSS 프로퍼티에 대입해야할 때가 종종 있다. 가령 애플리케이션은 사용자가 선택한 결정에 따라 다크 모드를 전환하거나 테마 색상을 변경해야 한다. 이런 경우는 의사 클래스 v-bind()를 사용할 수 있다. 

v-bind()는 하나의 인수를 입력받으며, 인수 형태는 컴포넌트의 데이터 프로퍼티 또는 자바 스크립트 표현식 문자열이다. 가령 [예제-35]는 titleColor 데이터 프로퍼티 값을 HeadingComponent의 h1 엘리먼트 색상으로 지정한다.

```jsx
<template>
  <h1 class="heading">{{ title }}</h1>
  <p class="description">{{ description }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeadingComponent',
  data(): { title: string; description: string; titleColor: string } {
    return {
      title: 'Welcome to Vue Restaurant',
      description: 'A Vue.js project to learn Vue.js',
      titleColor: '#178c0e',
    }
  },
})
</script>

<style scoped>
.heading {
  color: v-bind(titleColor);
  font-size: 2em;
}

.description {
  color: #b76210;
  font-size: 1em;
}
</style>

```

```jsx
<template>
  <section class="wrapper">
    <HeadingComponent />
    <span class="heading">!!This is span a element in parent</span>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeadingComponent from '@/components/do/ch03/3_11_style/3_11_3_v-bind/HeadingComponent.vue'

export default defineComponent({
  name: 'ParentComponent',
  components: { HeadingComponent },
  data(): { title: string; description: string } {
    return {
      title: 'Welcome to Vue Restaurant',
      description: 'A Vue.js project to learn Vue.js',
    }
  },
})
</script>

<style scoped>
/* .wrapper :deep(p) {
  color: #000;
} */
</style>

```

v-bind() 의사 클래스는 titleColor 데이터 프로퍼티 값을 인라인해서 CSS 변수로 변환한다.

```jsx
<h1 data-v-f0f3fbad="" class="heading" style="--f0f3fbad-titleColor: #178c0e;">Welcome to Vue Restaurant</h1>
<p data-v-f0f3fbad="" class="description" style="--f0f3fbad-titleColor: #178c0e;">A Vue.js project to learn Vue.js</p>
```

브라우저 개발자 도구에서  Elements 탭을 열고 스타일을 살펴보자 .heading 선택자의 color 프로퍼티는 정적인 값이다. 그러나 titleColor의 인라인 해시 CSS와 동일한 값이 지정됐음을 알 수 있다.

```css
element.style {
    --f0f3fbad-titleColor: #178c0e;
}
.heading[data-v-f0f3fbad] {
    color: var(--f0f3fbad-titleColor);
    font-size: 2em;
}
```

v-bind()는 컴포넌트에서 데이터를 가져와 CSS 프로퍼티에 동적으로 바인딩할 수 있는 편리한 도구다. 그러나 이 방식은 단반향 바인딩에 지나지 않는다. template에 정의된 CSS 스타일을 엘리먼트에 바인딩하려면 이어서 다룰 CSS 모듈을 사용해야 한다.

## 3.12 CSS 모듈과 컴포넌트 스타일
포넌트 단위로 CSS 스타일의 범위를 지정하는 또 하나의 수단은 CSS 모듈이다. CSS 모듈은 평범하게 작성한 CSS 스타일을 template 및 script 섹션에서 자바스크립트 객체 형태로 소비할 수 있도록 해준다.

```jsx
<template>
  <h1 :class="$style.heading">{{ title }}</h1>
  <p :class="$style.description">{{ description }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeadingComponent',
  data(): { title: string; description: string; titleColor: string } {
    return {
      title: 'Welcome to Vue Restaurant',
      description: 'A Vue.js project to learn Vue.js',
      titleColor: '#178c0e',
    }
  },
})
</script>

<style module>
.heading {
  color: #178c0e;
  font-size: 2em;
}

.description {
  color: #b76210;
  font-size: 1em;
}
</style>

```

브라우저 출력 결과는 동일하다. 그러나 브라우저 개발자 도구의 elements 탭을 확인하면 Vue가 해시 클래스명 방식으로 스타일 적용 범위를 관리하고 있음을 알 수 있다.

```jsx
<h1 class="_heading_v3861_2">Welcome to Vue Restaurant</h1>
<p class="_description_v3861_7">A Vue.js project to learn Vue.js</p>

<style>
._description_v3861_7 {
    color: #b76210;
    font-size: 1em;
}
</style>
```

추가로 module 속성에 문자열을 할당하면 $style이라는 이름을 원하는 대로 바꿀 수 있다.

```jsx
<template>
  <h1 :class="headerClasses.heading">{{ title }}</h1>
  <p :class="headerClasses.description">{{ description }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeadingComponent',
  data(): { title: string; description: string; titleColor: string } {
    return {
      title: 'Welcome to Vue Restaurant',
      description: 'A Vue.js project to learn Vue.js',
      titleColor: '#178c0e',
    }
  },
})
</script>

<style module="headerClasses">
.heading {
  color: #178c0e;
  font-size: 2em;
}

.description {
  color: #b76210;
  font-size: 1em;
}
</style>

```

- 컴포넌트에 script setup 또는 setup() 함수가 있다면 내부에서 useCssModule() 훅으로 스타일 객체 인스턴스에 접근할 수 있다. 이함수는 스타일 객체명을 인수로 받는다.

이제 컴포넌트는 style태그에 scoped 속성을 적용했을 때 한층 격리된 구조를 띤다. 코드는 더욱 체계화되었지만 외부에서 컴포넌트 스타일을 오버라이딩하기는 어려워졌다. Vue가 CSS 선택자에 무작위 해쉬를 대입하기 때문이다. 컴포넌트의 구조적 우위는 결국 프로젝트의 요구 사항에 달려있다. 때에 따라서는 원하는 결과를 얻기 위해 scoped 속성과 module 속성을 병용할 수도 있음을 명심하기 바란다.

### 정리

이번장에서는 SFC 표준에 따라 컴포넌트를 생성하고 defineCompnent()로 Vue 애플리케이션에 타입스크립트를 온전히 활서오하시키는 방법을 배웠다. 또한 슬롯을 이용해 재사용 가능한 컴포넌트를 만들고 여러 컨텍스트에서 스타일을 격리했으며 믹스인 설정을 공유하는 방법도 배웠다. 또한 옵션 API를 탐색하며 컴포넌트 라이프사이클 훅, computed, methods, watch 프로퍼티 등으로 컴포넌트를 구성했다. 다음 장은 이러한 지식을 바탕으로 커스텀 이벤트를 생성하여 제공/주입 패턴을 따라 컴포넌트 간 상호작용을 개발할 것이다.

## 4. 컴포넌트 상호작용

3장에서는 라이프사이클 훅, computed 프로퍼티, 와처 메서드 등의 기능으로 컴포넌트를 구성하는 방법을 심도 있게 살펴봤다. 

이런 기초 지식을 발판 삼아 이번 장에서는 커스텀 이벤트와 제공/주입패턴으로 컴포넌트 상호작용을 구축하는 방법을 알아볼 것이다. 또한 텔레포트 API라는 편리한 기능을 선보인다. 텔레포트 API는 컴포넌트 내부에서 엘리먼트를 유지한 채 DOM 트리의 원하는 위치로 이동시킬 수 있는 도구이다.

## 4.1 자식 컴포넌트 상호작용

Vue 컴포넌트 내부에 다른 Vue 컴포넌트를 중첩시킬 수 있다. 이러한 특성을 이용해 사용자는 복잡한 UI 프로젝트를 작은 코드로 나누어 재사용성을 높이고 각 코드 조각을 효과적으로 관리할 수 있다. 이제부터 중첩 엘리먼트는 자식 컴포넌트로, 이들을 담고 있는 컴포넌트는 부모 컴포넌트로 지정한다. Vue 애플리케이션의 데이터 흐름은 기본적으로 단방향이다. 다시 말해, 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는데 그 반대 방향으로는 전달할 수 없다. props는 부모가 자식 컴포넌트에 데이터를 전달하는 수단이다. 자식 컴포넌트는 커스텀 이벤트를 emits에 담아 부모 컴포넌트로 이벤트를 발산한다. 아래는 컴포넌트 사이의 데이터 흐름을 나타낸다.

```
부모 컴포넌트 (props)-> 자식 컴포넌트 (props)-> 손자 컴포넌트
부모 컴포넌트 (emits) <- 자식 컴포넌트 (emits) <- 손자 컴포넌트
```

- props의 함수 전달 : 여타 프레임워크와 달리 Vue는 함수 형태로 자식 컴포넌트에 prop을 전달할 수 없다. 함수를 전달하려면 커스텀 이벤트 형태로 emiter에 바인딩해야 한다.

### 4.1.1 props를 통한 컴포넌트 데이터 전달

Vue 컴포넌트의 props 필드는 객체 또는 배열 형태로 정의한다. props는 부모 엘리먼트로 부터 수신할 모든 데이터 프로퍼티를 담고 있으며 각 프로퍼티는 대상 컴포넌트의 prop과 대응된다. 컴포넌트 옵션 객체에 props필드를 선언하면 부모로부터 데이터를 수신할 수 있다.

```jsx
<template>
    <section class="wrapper">
      <span class="heading">!!This is span a element in parent</span>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  
  export default defineComponent({
    name: 'ChildComponent',
    props:{
      name: String  
    },
    data(): { title: string; description: string } {
      return {
        title: 'Welcome to Vue Restaurant',
        description: 'A Vue.js project to learn Vue.js',
      }
    },
  })
  </script>
  
  <style scoped>
  
  </style>
  
```

```jsx
<template>
  <ChildComponent></ChildComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChildComponent from './ch04/4.1.1_props/ChildComponent.vue';

export default defineComponent({
  name: 'ParentComponent',
  components: { ChildComponent },
  data(): { title: string; description: string } {
    return {
      title: 'Welcome to Vue Restaurant',
      description: 'A Vue.js project to learn Vue.js',
    }
  },
})
</script>

<style scoped>
/* .wrapper :deep(p) {
  color: #000;
} */
</style>

```

name prop은 String 타입이다. 부모 컴포넌트는 name prop을 통해 자식 컴포넌트에 데이터를 전달 할 수 있다. 정적 문자열 ‘Red Sweater’를ChildCompnent에 name값으로 전달한다. 동적데이터 변수를 넘기려면 v-bind 속성 또는 : 문자를 사용하면 된다. 다음은 children 배열의 첫번쨰 값을 name으로 전달한다. 

```jsx
<template>
  <!-- <ChildComponent name="Red Sweater"></ChildComponent> -->
  <ChildComponent :name="children[0]"></ChildComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChildComponent from './ch04/4.1.1_props/ChildComponent.vue';

export default defineComponent({
  name: 'ParentComponent',
  components: { ChildComponent },
  data(): { children: string[] } {
    return {
      children: ['Red Sweater','Blue T-shirt','Gereen Hat']
    }
  },
})
</script>

<style scoped>

</style>

```

자식 컴포넌트에 둘 이상의 props가 있어도 같은 방식으로 각각의 데이터를 prop에 전달할 수 있다. 아래는 name과 price를 ProductComp 컴포넌트에 전달하는 예이다.

```jsx
<template>
  <ProductComp :name="product.name" :price="product.price" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductComp from '@/components/do/ch04/4.1.1_product_exam/ProductComp.vue'

export default defineComponent({
  name: 'ProductList',
  components: { ProductComp },
  data(): { product: { name: string; price: number } } {
    return {
      product: {
        name: 'Red Sweater',
        price: 19.99
      }
    }
  },
})
</script>

<style scoped>

</style>

```

```jsx
<template>
  <div>
    <p>Product : {{ name }}</p>
    <p>Price : {{ price }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductComp',
  props: {
    name: String,
    price: Number
  },
})
</script>

<style scoped>

</style>

```

또한 다음과 같이 v-bind를 사용하면 product 객체를 한번에 전달하고 각 프로퍼티를 자식 컴포넌트의 props에 바인딩 할 수 있다. 이 경우 `:`문자로 축약하지 않는다.

```jsx
<template>
  <div>
    <p>Product : {{ product.name }}</p>
    <p>Price : {{ product.price }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductComp',
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({
        name: '',
        price: 0,
      }),
    },
  },
})
</script>

<style scoped>

</style>
 
```

```jsx
<template>
  <!-- <ProductComp :name="product.name" :price="product.price" /> -->
  <ProductComp :product="product" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductComp from '@/components/do/ch04/4.1.1_product_exam/ProductComp.vue'

export default defineComponent({
  name: 'ProductList',
  components: { ProductComp },
  data(): { product: { name: string; price: number } } {
    return {
      product: {
        name: 'Red Sweater',
        price: 19.99
      }
    }
  },
})
</script>

<style scoped>

</style>

```

자식 컴포넌트는 자신이 정의한 props만 할당 받는다. 따라서 부모 컴포넌트에 product.description이라는 필드가 있다 해도 자식 컴포넌트에서 이 필드에 접근할 수 없다.

- 컴포넌트의 props는 문자열 배열로 선언하는 방법도 있다. props: [”name”, “price”] 와 같이 선언하면 배열 원소가 각 prop의 이름이 된다. 이러한 방식은 컴포넌트의 프로토타입을 빨리 만들어야할 때 효과적이다. 그러나 코드 가독성을 높이고 버그를 예방하는데는 방해가 된다, 되도록이면 항상 props  객체 형식을 고수하고 모든 prop에 타입을 지정할 것을 권장한다.

props를 선언하고 타입을 지정하는 방법을 배웠다, 그렇다면 자식 컴포넌트 props로 전달된 데이터의 유효성은 어떻게 검증해야 할까? 또한 값이 전달되지 않았을 때 사용할 폴백값은 어떻게 설정할 수 있을까? 이어서 알아보자

### 4.1.2 prop 타입 유효성 검사 및 기본값

name prop을 String 타입으로 선언했다. 런타임 도중 컴포넌트가 name prop에 문자열이 아닌 값을 전달하면 Vue는 경고를 보낸다. 이러한 Vue의 타입 검사기능을 온전히 활용하려면 다음과 같은 전체 선언 구문을 살펴봐야 한다.

```jsx
{
    type: String | Number | Boolean | Array | Object | Data | Function | Symbol,
    default?: any,
    requird?: boolean,
    validator?: (value: any)
}
```

다음은 선언 구문의 각 항목에 대한 설명이다.

- type: prop의 타입, 내장 타입 혹은 생성자 함수(또는 커스텀 클래스)를 지정할 수 있다.
- default: 값이 전달되지 않았을 때 prop의 기본값, 기본값이 Object Function, Array 타입인 경우 초기값을 반환하는 함수 형태로 정의한다.
- required: prop의 필수 여부를 나타내는 불리언값, required가 true면 부모 컴포넌트는 prop에 값을 반드시 전달해야 한다. 그렇지 않은 경우 prop을 생략할 수 있다.
- validator: prop에 전달된 값을 검증하는 함수, 개발 디버깅에 활용하면 편리하다.

```jsx
<template>
    <section class="wrapper">
      <span class="heading">!!This is span a element in parent</span>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  
  export default defineComponent({
    name: 'ChildComponent',
    props:{
      name: {
        type: String,
        default: 'Child Component'
      }
    },
  })
  </script>
  
  
```

부모 컴포넌트가 값을 전달하지 않으면 자식 컴포넌트는 name prop의 기본값인 Child Component로 대체된다.

또한 아래와 같이 name을 자식 컴포넌트의 필수 프로퍼티로 설정하고 전달 데이터 유효성 검사기를 추가할 수 있다.

```jsx
<template>
    <section class="wrapper">
      <span class="heading">!!This is span a element in parent</span>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  
  export default defineComponent({
    name: 'ChildComponent',
    props:{
      // name: {
      //   type: String,
      //   default: 'Child Component'
      // },
      name: {
        type: String, required: true,
        validator: value => value !== "Child component"
      },
    },
  })
  </script>
  
  
```

name prop에서 값을 전달하지 않거나 전달한 값이 Child component와 일치할 경우 Vue는 개발 모드에서 다음과 같은 경고를 한다.

```jsx
MyComponent.vue?t=1746151682858:56 [Vue warn]: Invalid prop: custom validator check failed for prop "name". 
  at <ChildComponent name="Child component" > 
  at <ProductList > 
  at <App>
```

- default 필드에서 Function 타입이 지정된 경우, prop의 초기값을 반환하는 함수를 전달해야 한다. 이 함수는 데이터를 부모 컴포넌트로 되돌려 보내지 않으며, 이 함수에서 변경되는 데이터를 부모 수준에서 감지할 수 없다.

내장 타입은 Vue가 기본적으로 유효성을 검사한다. 추가로, 자바 스크립트 Class 또는 함수 생성자에 타입스크립트를 추가하면 커스텀 prop을 만들고 유효성을 검사할 수 있다.
### 4.1.3 커스텀 prop 타입 검사

Array, String, Object 등의 기본 타입만 있어도 대부분의 사용 요건에 대응할 수 있다. 그러나 애플리케이션이 성장하면 컴포넌트도 복잡하지기 마련이며 기본 타입으로만으로 타입 안정성을 지키기 힘든 상황이 벌어지기도 한다. PizzaCompnent에 담긴 다음과ㅏ 같은 템프릿 코드를 살펴보자

```jsx
<template>
    <header>Title : {{ pizza.title }}</header>
    <div class="pizza--details-wrapper">
        <img :src="pizza.image" :alt="pizza.title" width="300"/>
        <p>Description : {{ pizza.description }}</p>
        <div class="pizza-inventory">
            <div class="pizza--invertory-stock">Quantity: {{ pizza.quantity }}</div>
            <div class="pizza--invertory-price">Price: {{ pizza.price }}</div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PizzaComponent',
    props:{
        pizza:{
            type: Object,
            required: true
        }
    }
})
</script>

```

간단 명료한 구조다. 그러나 pizza를 Object 타입으로 선언하는 배경에는 부모가 올바른 오브젝트를 전달한다는 가정이 깔려 있다. 다시말해, pizza를 렌더링하기 위해 필요한 title, image, description, quantity, price 등의 필드가 오브젝트 안에 존재해야 한다.

이러한 가정은 문제의 소지가 있다. pizza는  Object 타입 데이터를 조건 없이 수용하므로, PizzaComponent를 사용하는 모든 컴포넌트는 pizza에 필요한 필드가 누락된 오브젝트 데이터를 prop으로 전달할 수 있다.

### 4.1.4 defineProps()와 withDefaults()를 이용한 prop선언
타입스크립트를 활용하면 컴포넌트별 타입을 선언할 수 있다. 이를 defineProps()로 전달하면 컴파일 과정에서 유효성을 검사한다.

```jsx
<template>
    <header>Name : {{ name }}</header>
  </template>
  
  <script lang="ts">
  import { defineProps } from 'vue'
  type ChildProps = {
    name?: string
  }
 const props = defineProps<ChildProps>()
  </script>
  
```

이 상태에서 name prop의 기본값을 선언하려면 defineProps()를 with-Defaults()로 감싸면 된다.

```jsx
<template>
    <header>Name : {{ name }}</header>
  </template>
  
  <script lang="ts">
  import { defineProps, withDefaults } from 'vue'
  type ChildProps = {
    name?: string
  }
 const props = withDefaults(defineProps<ChildProps>(),{
  name: 'Hello from the child component'
 }) 
  </script>
  
```

- 타입 스크립트의 유효성와 defineProps() : withDefaults()를 쓰면 props 타입의 런타임 검사와 컴파일타임 검사가 동시에 작동하지 않는다. 가급적 defineProps() 사용하면서 코드 가독성을 높이고 Vue와 타입 스크립트의 유효성 검사를 병행하기 바란다.

## 4.2 커스텀 이벤트와 컴포넌트 간 통신

커스텀 이벤트는  script setup 코드에서 defineEmits()로 정의한다. defineEmits() 함수의 입력 파라미터 타입은 앞서 배웠던 emits와 동일하다.

```jsx
const emits = defineEmits(['component-event'])
```

`defineEmits()` 가 반환하는 함수 인스턴스를 통해 다음과 같이 특정 이벤르를 호출할 수 있다.

```jsx
emits('component-event',[...args])
```

아래 예시는  script setup 코드 블록에서 this 인스턴스를 사용하지 않으므로 defineComponent를 적용할 필요가 없다.

단일 문자열 대신 특정 타입으로 task-completed-toggle 이벤트를 선언하면 타입 유효성을 효과적으로 검증할 수 있다.

```jsx
<script lang="ts" setup>
import { defineProps, type PropType } from 'vue';
import type { Task } from '@/components/do/ch04/type/Class';
// emit 타입 선언
type EmitEvents={
  (e: 'task-completed-toggle',task: Task): void;
};

const emits = defineEmits<EmitEvents>()
//const emits = defineEmits(['task-completed-toggle']);

const props = defineProps({
  task:{
    type: Object as PropType<Task>,
      required: true,
  }
})

const  onTaskCompleted = (event: Event) =>{
  emits("task-completed-toggle",{
    id: props.task.id,
    title: props.task.title,
    completed: (event.target as HTMLInputElement)?.checked,
  });
}
</script>
```

```jsx
// emit 타입 선언
type EmitEvents={
  (e: 'task-completed-toggle',task: Task): void;
};

const emits = defineEmits<EmitEvents>()
```

이렇게 하면 반드시 이벤트에 알맞은 메서드가 바인딩되도록 보장할 수 있다. 이제 모든 이벤트는 task-complete-toggle처럼 다음과 같은 선언 패턴을 따라야 한다.

```jsx
(e: 'component', [...arguments]):void
```

이 문법에서 e는 이벤트명이며 arguments는 이벤트 이미터에 전달될 모든 입력 인수다. task-complete-toggle 이벤트의 경우, 인수는 task이며 타입은 Task이다.

emits는 Vue의 데이터 흐름 메커니즘을 거스르지 않고 부모와 자식 컴포넌트 사이에 양방향 통신을 가능케하는 강력한 기능이다. 그러나 props와 emits는 부모 자식 간 직접적인 데이터 통신에 한해 사용할 수 있다.

컴포넌트 데이터를 손자 또는 그보다 하위 컴포넌트로 전달하려면 다른 방식으로 문제에 접근해야 한다. 이어서 provide와 inject API를 통해 컴포넌트에서 자식 또는 손자 컴포넌트로 데이터를 전달하는 방법을 알아보자
