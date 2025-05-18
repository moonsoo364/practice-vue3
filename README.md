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

브라우저 개발자 도구에서 Elements 탭을 열고 스타일을 살펴보자 .heading 선택자의 color 프로퍼티는 정적인 값이다. 그러나 titleColor의 인라인 해시 CSS와 동일한 값이 지정됐음을 알 수 있다.

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

- 컴포넌트의 props는 문자열 배열로 선언하는 방법도 있다. props: [”name”, “price”] 와 같이 선언하면 배열 원소가 각 prop의 이름이 된다. 이러한 방식은 컴포넌트의 프로토타입을 빨리 만들어야할 때 효과적이다. 그러나 코드 가독성을 높이고 버그를 예방하는데는 방해가 된다, 되도록이면 항상 props 객체 형식을 고수하고 모든 prop에 타입을 지정할 것을 권장한다.

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

이러한 가정은 문제의 소지가 있다. pizza는 Object 타입 데이터를 조건 없이 수용하므로, PizzaComponent를 사용하는 모든 컴포넌트는 pizza에 필요한 필드가 누락된 오브젝트 데이터를 prop으로 전달할 수 있다.

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

커스텀 이벤트는 script setup 코드에서 defineEmits()로 정의한다. defineEmits() 함수의 입력 파라미터 타입은 앞서 배웠던 emits와 동일하다.

```jsx
const emits = defineEmits(['component-event'])
```

`defineEmits()` 가 반환하는 함수 인스턴스를 통해 다음과 같이 특정 이벤르를 호출할 수 있다.

```jsx
emits('component-event', [...args])
```

아래 예시는 script setup 코드 블록에서 this 인스턴스를 사용하지 않으므로 defineComponent를 적용할 필요가 없다.

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

## 4.4 제공/주입 패턴을 이용한 컴포넌트 통신

provide/inject API는 조상 컴포넌트에서 자손으로 데이터 통신을 수립하는 최적의 수단이다. provide 필드는 조상의 데이터를 전달하고, inject는 제공된 데이터를 모든 대상 자손에게 주입하는 역할을 한다.

### 4.4.1 provide와 데이터 전달

컴포넌트 옵션의 provide 필드는 데이터 객체 또는 함수 형식으로 지정할 수 있다.

privide가 데이터 객체일 때, 객체의 각 프로퍼티는 키와 값 형태로 데이터 타입을 표현한다. 아래 예제 에서 ProductList는 모든 자손에게 값이 [1]인 selectedIds 데이터를 제공한다.

```jsx
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {

    },
    provide() {
        return {
            selectedIds: [1]
        }
    }
})
</script>

```

- props와 달리 provide 필드에 함수를 지정하면 자손 컴포넌트에서 호출할 수 있다. 이 특성을 이용하면 부모 컴포넌트를 향해 데이터를 되돌려 보내는 것이 가능하다. 그러나 Vue는 이러한 사용 방식을 안티 패턴으로 간주하므로 주의해서 사용해야 한다.

지금까지 배운 부분은 ProductList에서 provide를 통해 특정 데이터 값을 자손에게 전달하는 방법이었다. 다음으로 이렇게 전달된 값을 주입하고 작동시키는 방법을 알아보자.

### 4.4.2 inject와 데이터 수신

props와 마찬가지로 inject 필드는 문자열 배열 (inject: [selectedId]) 또는 객체를 지정한다. 배열의 각 문자열은 provide에 지정된 데이터 키를 가르킨다.

inject에 객체를 지정할 경우. 객체의 각 프로퍼티는 로컬 데이터 키가 된다. 해당 객체는 다음과 같은 필드 구조를 따라야 한다.

```jsx
{
	from?: string,
	default: any
}
```

로컬 프로퍼티 키가 조상에서 제공된 데이터 키와 동일할 때는 from을 생략할 수 있다.
예제에서 ProductList는 selectedIds 데이터를 자손에 제공하며, ProductComp 컴포넌트는 이 데이터를 수신하고 currentSelectedIds로 로컬 이름을 바꾸어 사용한다.

```jsx
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    inject:{
        currentSelectedIds:{
            from: 'selectedIds',
            default: []
        }
    }
})
</script>

```

이 코드에서 Vue는 주입된 selected 값을 가져와 로컬 데이터 필드인 currentSelectedIds에 할당한다. 주입된 값이 없을 경우 기본값으로 []이 지정된다.

브라우저 개발자 도구의 Vue 탭에서 Component 섹션을 조회한 화면이다. 왼쪽 패널의 컴포넌트 트리에서 ProductComp를 선택하면 오른쪽 패널에서 intected 데이터의 이름이 변경된 것을 확인할 수 있다.

```jsx
injected
selectedIds ➞ currentSelectedIds:Array[5]
0:2
1:2
2:3
3:4
4:5

```

provide와 inject를 적절히 활용하면 props를 드릴링하지 않고도 컴포넌트 사이에서 효율적으로 데이터를 전달할 수 있다. 다음으로 엘리먼트의 특정 콘텐츠 섹셩을 DOM의 특정 위치로 렌더링 시킬 수 있는 Teleport 컴포넌트를 살펴보자

## 4.5 텔레포트 API

컴포넌트를 구현하다 보면 가끔 스타일 제약 조건에 맞춰 엘리먼트를 모다 두어야 하는 경우가 있다. 이러한 엘리먼트는 컴포넌트 단위가 아닌 전체 화면 효과를 기준으로 DOM의 특정 위치에 렌더링해야 한다. 이렇듯 일부 엘리먼트를 원하는 위치로 ‘순간이동’ 시키는 기능은 대체로 구현하기 복잡하다. 개발 난도가 높고 시간도 오래 걸릴 뿐만 아니라 성능에도 안 좋은 영향을 끼친다. 이러한 순간이동 난제에 대한 해답으로 Vue는 Teleport 컴포넌트를 제시한다.

Teleport 컴포넌트는 to라는 속성으로 이동 대상 컴포넌트를 가리킨다. 이 속성으로 이동 대상 컴포넌트를 가리킨다. 이속성은 쿼리 선택자 또는 실제 HTML 엘리먼트를 담고 있다. Sky and clouds라는 영역을 지닌 House 컴포넌트다. Vue엔진은 이 부분을 #sky로 지정된 DOM 엘리먼트로 이동시킨다.

```jsx
<template>
  <div>This is a house</div>
  <Teleport to="#sky">
    <div>Sky and clouds</div>
  </Teleport>
</template>
```

```jsx
<template>
  <section id="sky" ></section>
  <section class="wrapper">
    <House/>
  </section>
</template>

<script lang="ts">
import House from '@/components/do/ch04/4_5_teleport_api/House.vue'
export default {
  name: "SkyComponent",
  components: {House}
}
</script>

<style>

</style>
```

App.vue는 과 같이 House 컴포넌트를 사용한다. 여기에 텔레포트 목적지인 section 엘리먼트를 추가하고 id를 sky로 지정한다.

브라우저 개발자 도구에서 요소 또는 Elements 탭을 열고 DOM 트리를 확인하면 Sky and clouds 영역이 `<section id=”sky’>` 내부로 이동했음 을 알 수 있다.

```jsx
<section id="sky"><div>Sky and clouds</div></section>
<section class="wrapper">
<div> This is a house </div>
<!--teleport start--><!--teleport end-->
</section>
```

`<Teleport>` 컴포넌트의 disabled 속성에 불리언 값을 지정하면 컴포넌트를 이동시킬 지 말지 동적으로 제어할 수 있다. 이러한 컴포넌트는 DOM 트리를 보존하면서 필요한 순간에 우너하는 컨텐츠만 대상 위치로 이동시키는 편리한 도구다. 다음 절은 Teleport의 가장 일반적인 사용처인 모달 기능을 구현할 것이다.

- [Caution] 두 섹션이 하나의 부모 엘리먼트 하위에 있을 때
  텔레포트의 목적지 컴포넌트는 Teleport가 마운트되기 전에 DOM 안에 존재해야 한다. 두 section이 모두 하나의 main 엘리먼트 안에 있다면 Teleport 컴포넌트가 제대로 작동하지 않는다.

### 4.5.1 Teleport와 <dialog> 엘리먼트를 이용한 모달 구현

모달은 화면에서 가장 전면에 나타난느 대화 상자를 일컫는다. 또한 모달은 사용자와 메인페이지의 상호작용을 차단한다. 사용자는 모달 상호작용을 먼저 처리하고 창을 닫아야 메인페이지로 돌아갈수 있다. 모달은 사용자의 주의를 온전히 집중시켜야 할 중요한 알림을 단 한 번만 표시하려고 할 때 매우 편리하다.

기본적인 모달을 설계해보자, 일반적인 대화 상자와 비슷하게 모달은 다음과 같은 요소를 포함한다.

- 전체화면을 덮는 배경(backdrop)은 현재 페이지와 사용자의 상호작용을 차단하는 역할을 한다.
- 제목과 닫기 버튼이 있는 header 콘텐츠가 담긴 main, 통상적인 닫기 버튼이 있는 footer 섹션은 slot을 이용해 커스터 마이징 한다.

```jsx
 <template>
    <dialog :open="open">
        <header>
            <slot name="m-header">
                <h2>{{ title }}</h2>
                <button>X</button>
            </slot>
        </header>
        <main>
            <slot name="m-main"></slot>
        </main>
        <footer>
            <slot name="m-footer">
                <button>Close</button>
            </slot>
        </footer>
    </dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ModalComponent',
    props:{
        open:{
            type:Boolean,
            default:false
        },
        title:{
            type:String,
            default: 'Dialog',
        },
    }
})
</script>

```

이 템플릿에서 사용자는 다음과 같이 3개의 슬롯을 커스터마이징 할 수 있다.

1. 모달 헤더(m-header)
2. 메인 컨텐츠(m-main)
3. 모달 푸터(m-footer)

`<dialog>` 엘리먼트는 open 속성으로 모달의 가시성(visibility)를 제어한다. 이 속성은 데이터 prop인 open에 바인딩한다. 또한 모달의 기본 제목으로 렌더링할 title prop도 추가한다. open과 title이라는 두 prop을 추가한 Modal 컴포넌트 옵션이다.

```jsx
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ModalComponent',
    props:{
        open:{
            type:Boolean,
            default:false
        },
        title:{
            type:String,
            default: 'Dialog',
        },
    }
})
</script>
```

사용자가 닫기 버튼이나 X버튼을 누르면 모달이 닫혀야 한다. 모달의 가시성은ㅇ open prop으로 제어하므로 modal의 부모 컴포넌트에서 open값을 변경하고 closeDialog 이벤트를 발생시켜야 한다. 이 이벤트를 발생시키는 emits와 close 메서드를 선언한다.

```jsx
<template>
    <dialog :open="open">
        <header>
            <slot name="m-header">
                <h2>{{ title }}</h2>
                <button @click="close">X</button>
            </slot>
        </header>
        <main>
            <slot name="m-main"></slot>
        </main>
        <footer>
            <slot name="m-footer">
                <button @click="close">Close</button>
            </slot>
        </footer>
    </dialog>
</template>
```

다음으로 dialog 엘리먼트를 <Teleport> 컴포넌트로 감싸고 부모 컴포넌트의 DOM 트리 밖으로 이동 시켜야 한다. 이동 위치는 id가 modal인 HTML엘리먼트이며 이 정보를 Teleport 컴포넌트에 to prop으로 지정한다. 마지막으로 Vue가 모달 컨텐츠 이동 여부를 제어할 수 있도록 disabled prop과 open 값을 바인딩한다.

```jsx
<template>
  <h2>With Modal components</h2>
  <button @click="openModal = true">Open Modal</button>
  <NoticeModal
    :open="openModal"
    title="Hello World"
    @closeDialog="toggleModal"/>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import NoticeModal from '@/components/do/ch04/4_5_teleport_api/4_1_1_dialog/NoticeModal.vue'

  export default defineComponent({
    name: "TeleportComponent",
    components: {NoticeModal},
    data() {
      return{
        openModal: false,
      }
    },
    methods:{
      toggleModal(newValue: boolean){
        this.openModal = newValue;
      }
    }
  })
</script>

<style>

</style>
```

index.html 파일의 body div 엘리먼트를 추가하고 `id="modal"` 을 추가한다.

```jsx
<template>
  <MyComponent />
  <div id="modal"></div>
</template>
```

id가 modal인 div는 텔레포트 목적지 엘리먼트다. open prop이 true로 바뀔 때마다 vue는 이 div에 modal 텔레포트 컴포넌트를 렌더링한다.

```jsx
<div id="modal">
  <dialog open="">
    <header>
      <h2>Hello World</h2>
      <button>X</button>
    </header>
    <main></main>
    <footer>
      <button>Close</button>
    </footer>
  </dialog>
</div>
```

open prop이 false일 때는 div 내부가 비어 있다.

```jsx
<div id="modal"></div>
```

모달 컴포넌트가 작동하기 시작했지만 모달의 시각적 효과는 아직 부족한면 있다. 모달이 나타날 때 메인 페이지 컨텐츠에는 어두운 오버레이가 깔려야 한다 이 문제는 CSS 스타일로 해결할 수 있다.

```jsx
<style scoped>
    dialog::backdrop{
        background-color: rgba(0,0,0,0.5)
    }
</style>
```

그러나 이렇게 스타일만 추가해서는 모달 배경이 바뀌지 않는다. 브라우저는 dialog.show-modal() 메서드로 모달을 열었을 때만 ::backdrop 선택자를 적용하기 때문이다. 브라우저의 이러한 작동은 open 속성값의 영향을 받지 않는다. 따라서 스타일이 작동하게 하려면 다음과 같이 수정해야 한다.

`<dialog>`엘리먼트를 직접 참조할 수 있도록 ref 속성에 “dialog”를 할당한다.

```jsx
        <dialog ref="dialog">
```

watch에 open을 추가하고 값이 바뀔 때마다 $refs.dialog.showModal() 또는 $refs.dialog.close()를 알맞게 호출한다.

```jsx
        watch:{
        open(newValue){
            const element = this.$refs.dialog as HTMLDialogElement;


            if (element && element.showModal) {
                if(newValue){
                    console.log(newValue);
                    element.showModal();
                }else{
                    element.close();
                }
            }
        }
    }
```

dialog 엘리먼트의 open 속성의 바인딩을 제거한다

```jsx
//<dialog :open="open" ref="dialog">
<dialog ref="dialog">
```

teleport 컴포넌트에서 disabled 속성을 제거한다.

```jsx
<teleport to="#modal" >
```

dialog 엘리먼트의 내장 메서드인 showModal()로 모달을 열면 브라우저는 실제 dialog 엘리먼트에 ::backdrop 가상 선택자를 추가한다. 엘리먼트를 동적으로 목적지에 옮기면브라우저의 이러한 기능이 작동하지 않고 backdrop 스타일도 적용되지 않는다. 다음은 모달 위치를 페이지 중앙에 고정하고 가장 전면에 노출되도록 순서를 재배치하는 CSS 규칙이다.

```jsx
<style scoped>
    dialog{
        position: fixed; z-index: 999;
        inset-block-start: 30%;
        inset-inline-start: 50%; width: 300px;
        margin-inline-start: -150px;
    }
</style>
```

지금까지 Telport로 재사용 Modal 컴포넌트를 구현하고 `dialog` 엘리먼트의 내장 기능과 다양한 활용법을 살펴봤다. 또한 ::backdrop CSS 선택자로 모달 배경 스타일을 지정하는 방법도 배웠다.

지금까지 모달을 표시할 대상 div는 body의 자식 엘리먼트인 동시에 Vue앱의 엔트리 엘리먼트인 `<div id=”app>` 외부에 있었다. 그렇다면 모달의 대상 div를 app.vue 엔트리 컴포넌트 내부로 옮기면 무슨 일이 벌어질까?

### 4.5.2 텔레포트 렌더링 제한

App.vue의 자식 컴포넌트에서 Teleport로 모달을 렌더링하려 시도하면 문제가 발생한다.

```jsx
main.ts:27 [Vue warn]: Failed to locate Teleport target with selector "#modal". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.
  at <NoticeModal open=false title="Hello World" onCloseDialog=fn<bound toggleModal> >
  at <TeleportComponent >
  at <App>
(anonymous)	@	main.ts:27

```

vue의 렌더링 메커니즘에 따르면 부모 컴포넌트는 자식 컴포넌트를 발견하면 자식의 렌더링이 끝날 때까지 대기하다가 완료되고 나서야 자신을 계속 렌더링한다. 또한 자식 엘리먼트의 부모의 template 섹션에 등장하는 순서대로 렌더링된다. 방금 예시에서 Vue는
`WithModalComponent` 를 렌더링하여 `<dialog>` 를 부모 컴포넌트에 있는 목적지로 텔레포트하려 시도한다. 그런나 부모 컴포넌트는 WithModalComponent가 렌더링 할 때 까지 기다리고 있으므로 `<div id="modal">` 엘리먼트는 아직 DOM에 존재하지 않는다. 결과적으로 vue의 목적지인 `<div id="modal>"` 로 `<dialog>` 를 올바르게 이동시킬 수 없으며 에러가 발생한다.

다음과 같이 `<div id =”modal>` 을 WithModalComponent보다 앞에 두면 우회적으로 해결할 수 있다.

```jsx
<template>
  <div id="modal"></div>
  <WithModalComponent />
</template>
```

이 방식은 Vue가 Modal 엘리먼트를 렌더링하고 내용을 이동시키기 이전에 반드시 div가 존재하도록 보장하는 방법이다. 또다른 방안으로 disabled 속성을 이용하여 이동 시점을 연기하는 방법도 있다. 이 방식은 사용자가 Open Modal 버튼을 클릭할 때만 텔레포트가 작동한다. 양쪽 모두 장단점이 있으므로 상화에 따라 적합한 방법을 선택하길 바란다.

가장 일반적인 해결책은 대상 엘리먼트를 body 엘리먼트의 직속으로 배치 함으로써 Vue 렌더링 컨텐스트로 부터 대상을 완전히 격리하는 것이다.

`<Teleport>`를 응용하면 전체 화면 모드, 모달, 사이드바 등의 시각적 효과를 극대화 할 수 있다. 그와 동시에 코드 체계 컴포넌트 격리 구조, 구독성 등의 특성은 고스란히 유지 할 수 있다는 점은 `<Teleport>` 의 큰 장점이다.

## 정리

이번장에서 Vue에 내장된 props, emits, provide/inject 등의 기능과 컴포넌트 통신의 다양한 개념을 살펴보았다, Vue의 데이터 흐름 메커니즘을 거스르지 않으면서 컴포넌트 간 데이터와 이벤트를 전달하는 방법도 배웠다. 또한 부모 컴포넌트의 `<template>` 구조를 유지하면서 텔레포트 API로 DOM 트리 외부에 엘리먼트를 렌더링할 수 있었다. `<Teleport>` 는 팝업, 대화상자, 모달 처럼 메인 페이지 엘리먼트와 나란히 표시할 요소를 컴포넌트로 구성할 때 필수적이다.

다음 장에서는 컴포지션 API를 자세히 알아보고 이를 이용해 Vue 컴포넌트를 구성하는 방법을 살펴볼 것이다.

# 250507 5.1 컴포지션 API를 통한 컴포넌트 설정 ~

## 5.1 컴포지션 API를 통한 컴포넌트 설정

Vue 컴포넌트를 구성할 때는 통상적으로 옵션 API를 사용한다. 그러나 데이터와 메서드가 중복될 염려 없이
컴포넌트 로직 일부를 재사용한다면 옵션 API만으로는 역부족이다. 컴포지션 API는 믹스인을 접목할 수 있어
이러한 요건에 부합하며 가독성과 체계성도 더 좋다. Vue3부터 도입된 컴포지션 API는 setup()훅 또는 `<script setup>` 태그로 반응형 컴포넌트를 구성한다. setup() 혹은 컴포넌트 옵션 객체의 일부이며 컴포넌트 인스턴스 최초 생성 이전(beforeCreate() 훅)에 한 번 실행한다.

컴포지션 API 함수 또는 컴포지블은 setup 혹은 그에 상응하는 <script setup> 태그 안에서만 사용된다. 이러한 방식으로 상태형 기능 컴포넌트를 생성하거나 컴포넌트의 반응형 상태와 메서드를 편리하게 정의할 수 있다. 또한 더욱 간결하고 읽기 쉬운 코드로 라이프사이클 훅을 정의할 수 있다.

컴포지션 API의 위력을 확인하기 위해 컴포넌트의 반응형을 처리하는 ref와 reactive함수를 컴포지션 API에 도입했다.

### 5.2.1 ref()

ref()는 하나의 인수를 초기값으로 받아 반응형 객체를 반환하는 함수다. 이러한 반환 객체를 ref 객체라 부른다. 반환 객체의 현재 값은 script 섹션에서 value라는 프로퍼티로 접근할 수 있다. 가령 초기값이 Hello World인 반응형 객체를 생성한다.

- setup 훅과 옵션 API를 사용할 때는 컴포넌트에서 .value 없이 message에 접근할 수 있다. 즉 message만 쓰면 된다.
- `setup`이 없으면 Vue는 Composition API를 사용하지 않고 Options API를 사용한다고 가정한다.

```jsx
<template>
  <div>{{ message }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const message = ref('Hello, Vue 3!')

console.log('message:', message.value)
</script>

```

template 태그에는 value 프로퍼티 없이 해당 값을 직접사용할 수 있다. 아래는 message를 브라우저에 출력한다.

- ref() 함수는 전달받은 초기값에서 반환 객체의 타입을 추론한다. 반환 객체의 타입을 명시적으로 정의하려면 `ref<string>()`처럼 타입 스크립트의 `ref<type>` 구문으로 함수를 실행해야 한다.

ref 객체는 반응형이며 value 프로퍼티에 값을 할당하는 방식으로 변경할 수 있다. 변화를 감지한 Vue 엔진은 객체의 와처를 실행하고 컴포넌트를 업데이트한다.

아래는 사용자의 입력을 받아 출력 메시지를 변경하는 예제다

```jsx
<template>
  <div>
    <h2 class="heading">{{ message }}</h2>
    <input type="text" v-model="message" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const message = ref('Hello, Vue 3!')
</script>

```

input 필드값을 고치면 브라우저에 표시되는 message도 똑같이 바뀐다. 개발자도구 vue탭에서 보면 ref 객체의 message가 나열되고 Ref라는 표시가 붙는다.

```jsx
message: 안녕하세요(Ref)
```

예제에서는 title이라는 정적 데이터를 컴포넌트에 추가했다. Vue 데브툴을 보면 title프로퍼티가 추가됐지만 Ref 표시는 없다.

아래는 setup 훅 방식으로 동일하게 작성된 코드다.

```jsx
<template>
  <div>
    <h2 class="heading">{{ message }}</h2>
    <input type="text" v-model="message" />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  setup() {
    const message = ref('Hello, Vue 3!')
    return { message }
  },
}
</script>

```

string, number, boolean, null, undefined 등의 모든 우너시 타입은 ref()함수로 반응형 객체를 생성할 수 있다. 그러나 배열이나 객체를 반환할 때는 ref()가 특히 강한 반응형 객체를 생성한다. 그러나 배열이나 객체를 반환할 때는 ref가 특히 강ㅅ한 반응형 객체를 생성한다. ref객체에 소속된 프로퍼티가 반응형으로 설정된다는 뜻이다.

```jsx
<script lang="ts" setup>
import {shallowRef} from 'vue';

type User={
  name: string;
  bio: string;
  avatar_url: string;
  twitter_username: string;
  blog: string;
};

//1
const user = shallowRef<User>({
    name:"",
    bio: "",
    avatar_url: "",
    twitter_username: "",
    blog: "",
});
//2
const error = shallowRef<Error | undefined>();

const fetchData = async () =>{

    try{
        const response = await fetch("https://api.github.com/users/mayashavin");
        //3
        if(response.ok){
            user.value = (await response.json()) as User;
        }
    }catch(e){
        //4
        error.value = e as Error;
    }

}

fetchData();
</script>
```

1. shallowRef에 초기 데이터를 전달해 User 타입의 반응형 변수 user를 만든다.
2. shallowRef로 undifined 또는 Error 타입의 반응형 변수 Error를 만든다.
3. 응답데이터 타입을 User 타입으로 간주하고 user값을 교체한다.
4. 에러가 발생하면 error를 업데이트한다.

### 5.2.2 reactive()

reactive() 함수는 ref()함수와 비슷하지만 다음과 같은 차이가 있다.

- 객체 타입 데이터를 인수로 받는다.
- value나 프로퍼티를 통하지 않고 반응형 반환 객체에 직접 접근할 수 있다.

```jsx
<script lang="ts" setup>
import {reactive} from 'vue';

const user = reactive({
    name:"",
    age: 0,
});

user.name="Rachel";
user.age= 30;

</script>
```

- ref() 내부에서 reactive를 실행한다.

한가지 중요한 점은 reactive() 함수가 반응형 프록시 객체를 만들어 반환한다는 것이다. 따라서 반응형 반환 객체를 변경하면 원본 객체에 반영되며 반대도 마찬가지다.

```sql
<script lang="ts" setup>
import { reactive } from 'vue'

const defaultIser ={
    name: 'maya',
    age: 20,
}

const user = reactive(defaultIser)

user.name='Rachel'
user.age= 30

console.log(user.name) // Rachel
console.log(user.age) // 30
defaultIser.name = 'Samuel'

console.log(user);

</script>

```

이 예제에서 defaultValue나 user의 프로퍼티를 변경하면 나머지 한 쪽의 프로퍼티도 변경된다. reactive() 함수를 사용할 때는 이러한 특성에 각별히 주의해야 한다. reactive()에 객체를 전달할 때 아래처럼 처음부터 전개구문으로 새로운 객체를 생성하는 방법도 있다.

```sql
<script lang="ts" setup>
import { reactive } from 'vue'

const defaultIser ={
    name: 'maya',
    age: 20,
}

const user = reactive({...defaultIser})

user.name='Rachel'
user.age= 30

console.log(user.name) // Rachel
console.log(user.age) // 30
defaultIser.name = 'Samuel'

console.log(user);

</script>

```

- reactive() 함수를 사용하면 초기 객체에 심층적인(profound) 반응성이 부여된다. 따라서 대규모 데이터 구조에서 의도치 않게 성능이 저하될 위험이 있다. 객체 최상위 프로퍼티만 관찰하고 그 이하를 볼 필요가 없을 때는 shallowReactive 함수를 사용하는 것이 좋다.

ref()나 reactive() 안에서 둘을 다시 호출하는 것도 가능하지만 매우 복잡해질 뿐만 아니라 반응성 언래핑 메커니즘까지 고려해야 하므로 권장하지 않는다. 반응형 객체를 이용해 또다른 반응형 객체를 생성하려 할 때는 computed() 를 사용하는 것이 좋다.

| 훅                | 사용예                                                                                                     |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| ref()             | 원시 데이터 타입을 다루는 일반적인 상황 또는 자신의 프로퍼티를 모두 재할당할 수 있는 객체 타입이 필요할 때 |
| shallowRef()      | 프로퍼티를 관찰할 필요가 없고 재할당이 예정된 자리표시자 객체가 필요할 때                                  |
| reactive()        | 객체 타입 데이터의 프로퍼티와 중첩 프로퍼티를 모두 관찰해야 할 때                                          |
| shallowReactive() | 객체 타입 데이터의 프로퍼티를 관찰하지만 중첩 프로퍼티는 관찰할 필요가 없을 때                             |

## 5.2 라이프사이클 훅

컴포지션 API의 라이프 사이클 훅은 on이라는 접두어가 붙는다는 점을 제외하면 옵션 API의 훅과 거의 비슷하다. 가령 mounted는 컴포지션 API에서 onMounted에 해당한다. 아래는 옵션API와 컴포지션 API의 라이프 사이클 훅을 비교 정리한 것이다.

| option          | composition       | 설명                                                        |
| --------------- | ----------------- | ----------------------------------------------------------- |
| beforeMount()   | onBeforeMount()   | 컴포넌트의 최초 렌더링 이전에 호출한다.                     |
| mounted()       | onMounted()       | Vue가 컴포넌트를 렌더링하고 DOM에 마운팅한 이후에 호출한다. |
| beforeUpdate()  | onBeforeUpdate()  | 컴포넌트의 업데이트 프로세스가 시작한 이후에 호출한다.      |
| updated()       | onUpdated()       | 업데이트된 컴포넌트를 DOM에 렌더링한 이후에 호출한다.       |
| beforeUnmount() | onBeforeUnmount() | 컴포넌트를 언마운트하기전에 호출한다.                       |
| unmounted()     | onUnmounted()     | 컴포넌트 인스턴스를 제거하고 파괴한 이후에 호출한다.        |

beforeCreated와 created훅은 컴포지션 API에 없다 대신 setup으로 동일한 효과를 내며 컴포넌트 로직을 더욱 체계적으로 정의할 수 있다.

컴포지션 API는 라이프 사이클 혹은 함수를 인수로 받는다. Vue는 이 함수를 콜백으로 등록 했다가 알맞은 시점에 실행한다.

```sql
<script lang="ts" setup>
    import { onBeforeMount } from 'vue'

    onBeforeMount(() => {
        console.log('onBeforeMount')
        console.log('onBeforeMount', this)
    })
</script>
```

Vue는 setup()을 컴포넌트 인스턴스 생성 전에 실행하므로 setup() 또는 그안에서 등록된 콜백에서 this 인스턴스에 접근할 수 없다. 따라서 위 예제에서 this는 undefined가 출력된다.

그러나 ref() ref디렉티브를 이용하면 마치 옵션 API의 this.$el과 비슷하게 컴포넌트 dom 인스턴스에 접근할 수 있다.

```sql
<template>
    <div>
        <input v-model="message" type="text" ref="inputRef" />
    </div>
</template>
<script lang="ts" setup>
    import { onMounted, onUpdated, ref } from 'vue'
    const inputRef = ref(null)
    const message = ref('')

    onUpdated(() => {
        console.log(' Dom instance after updated: ',inputRef.value); // null
    })

    onMounted(() => {
        console.log(' Dom instance: ',inputRef.value); // null
    })
</script>
```

컴포넌트가 마운팅되면 inputRef는 input 엘리먼트에 해당하는 DOm 인스턴스를 참조하게 된다. 사용자가 input필드를 변경할 때 마다 Vue는 onUpdated() 훅을 실행하고 그에 따라 DOM 인스턴스가 업데이트된다.

컴포지션 API의 라이프사이클 훅은 옵션API보다 활용 범위가 넓다 라이프 사이클 훅을 조합해 한층 복잡한 로직을 만들고 자신만의 재사용 커스텀 훅을 만드는 것도 가능하다.

# 250508 5.3 라이프사이클 훅 ~ 5.4 컴포지션 API의 와처

## 5.3 라이프사이클 훅

컴포지션 API의 라이프 사이클 훅은 on이라는 접두어가 붙는다는 점을 제외하면 옵션 API의 훅과 거의 비슷하다. 가령 mounted는 컴포지션 API에서 onMounted에 해당한다. 아래는 옵션API와 컴포지션 API의 라이프 사이클 훅을 비교 정리한 것이다.

| option          | composition       | 설명                                                        |
| --------------- | ----------------- | ----------------------------------------------------------- |
| beforeMount()   | onBeforeMount()   | 컴포넌트의 최초 렌더링 이전에 호출한다.                     |
| mounted()       | onMounted()       | Vue가 컴포넌트를 렌더링하고 DOM에 마운팅한 이후에 호출한다. |
| beforeUpdate()  | onBeforeUpdate()  | 컴포넌트의 업데이트 프로세스가 시작한 이후에 호출한다.      |
| updated()       | onUpdated()       | 업데이트된 컴포넌트를 DOM에 렌더링한 이후에 호출한다.       |
| beforeUnmount() | onBeforeUnmount() | 컴포넌트를 언마운트하기전에 호출한다.                       |
| unmounted()     | onUnmounted()     | 컴포넌트 인스턴스를 제거하고 파괴한 이후에 호출한다.        |

beforeCreated와 created훅은 컴포지션 API에 없다 대신 setup으로 동일한 효과를 내며 컴포넌트 로직을 더욱 체계적으로 정의할 수 있다.

컴포지션 API는 라이프 사이클 혹은 함수를 인수로 받는다. Vue는 이 함수를 콜백으로 등록 했다가 알맞은 시점에 실행한다.

```sql
<script lang="ts" setup>
    import { onBeforeMount } from 'vue'

    onBeforeMount(() => {
        console.log('onBeforeMount')
        console.log('onBeforeMount', this)
    })
</script>
```

Vue는 setup()을 컴포넌트 인스턴스 생성 전에 실행하므로 setup() 또는 그안에서 등록된 콜백에서 this 인스턴스에 접근할 수 없다. 따라서 위 예제에서 this는 undefined가 출력된다.

그러나 ref() ref디렉티브를 이용하면 마치 옵션 API의 this.$el과 비슷하게 컴포넌트 dom 인스턴스에 접근할 수 있다.

```sql
<template>
    <div>
        <input v-model="message" type="text" ref="inputRef" />
    </div>
</template>
<script lang="ts" setup>
    import { onMounted, onUpdated, ref } from 'vue'
    const inputRef = ref(null)
    const message = ref('')

    onUpdated(() => {
        console.log(' Dom instance after updated: ',inputRef.value); // null
    })

    onMounted(() => {
        console.log(' Dom instance: ',inputRef.value); // null
    })
</script>
```

컴포넌트가 마운팅되면 inputRef는 input 엘리먼트에 해당하는 DOm 인스턴스를 참조하게 된다. 사용자가 input필드를 변경할 때 마다 Vue는 onUpdated() 훅을 실행하고 그에 따라 DOM 인스턴스가 업데이트된다.

컴포지션 API의 라이프사이클 훅은 옵션API보다 활용 범위가 넓다 라이프 사이클 훅을 조합해 한층 복잡한 로직을 만들고 자신만의 재사용 커스텀 훅을 만드는 것도 가능하다.

## 5.4 컴포지션 API의 와처

옵션 API의 watch()와 마찬가지로 컴포지션 API의 watch() 혹은 반응형 데이터의 변화를 관찰하고 콜백을 호출하는 용도로 사용한다. watch()는 세 개의 인수를 받고 문법은 다음과 같다.

```jsx
<script lang="ts" setup>
  watch( sources: WatchSouce, cb: (newValue: T, oldValue: T, cleanup:(func)=>void) => any,
  options?:WatchOptions ): WatchStopHandle
</script>
```

- sources는 Vue가 관찰할 반응형 데이터다 데이터 일부 조각 또는 반응형 데이터를 반환하는 getter함수이며, 이들을 배열로 지정할 수 있다.
- cb는 sources가 변경될 때 Vue가 실행할 콜백 함수다. 이 함수의 핵심 인수는 newValue와 oldValue다. 다음 번 호출에 대비해 부수 효과를 정리하려면 cleanup 함수를 추가로 지정한다.
- options는 Watch혹의 선택적 설정 옵션이며 필드 목록은 아래 표에 나열되어 있다.

| 프로퍼티  | 설명                                                                                    | 허용타입        | 기본값    | 필수 |
| --------- | --------------------------------------------------------------------------------------- | --------------- | --------- | ---- |
| deep      | 대상 데이터에 중첩 프로퍼티가 있을 때 이에 대한 관찰 여부를 지정한다.                   | boolean         | false     | N    |
| immediate | 컴포넌트 탑재 후 핸들러 즉시 실행 여부를 지정한다.                                      | boolean         | false     | N    |
| flush     | 핸들러 실행 시점을 지정한다. 기본적으로 Vue는 컴포넌트 업데이트 전에 핸들러를 실행한다. | pre, post, sync | pre       | N    |
| onTrack   | 반응형 데이터 추적 함수, 디버깅에 사용하며 개발 모드 전용이다.                          | 함수            | undefined | N    |
| onTrigger | 콜백 트리거 시 호출하는 함수, 디버깅에 사용하며 개발 모드 전용이다.                     | 함수            | undefined | N    |

watch()가 반환하는 WatchStopHandle 함수를 실행하면 언제든지 해당 와처를 중지할 수 있다.

기본 user 객체에서 user.name과 user.age를 수정하는 예시이다. 이 템플릿을 그대로 가져와 UserWatcherComponent를 실습해보자. <script> 영역은 아래와 같이 컴포지션 API로 작성할 것이다.

```jsx
<template>
    <div>
        <h2>Watch User Name</h2>
        <p>Name: {{ user.name }}</p>
        <p>Age: {{ user.age }}</p>
        <button @click="user.name = 'newName'">Change Name</button>
        <button @click="user.age++">Increase Age</button>
    </div>
</template>
<script setup lang="ts">
import {reactive,watch} from 'vue'

interface User {
    name: string
    age: number
}

const user = reactive<User>({
    name: 'maya',
    age: 20,
})

watch(
    () => user.name,
    (newValue, oldValue) => {
        console.log('name changed from', oldValue, 'to', newValue)
    },
    { immediate: true }//undefined -> maya 로그 출력
)

</script>

```

기본적으로 Vue는 user가 변경될 때만 콜백 함수를 실행한다. 그러나 reactive()로 user를 생성하므로 Vue는 자동으로 deep을 활성화하고 모든 프로퍼티를 관찰한다. Vue가 user.name 등의 특정 프로퍼티만 관찰하게 하려면 해당 프로퍼티를 반환하는 getter함수를 만들고, 이를 watch의 sources 인수로 전달하면 된다.

아래 예제에서 user.name 혹은 user.age 가 변경되면 와처가 실행되고 콘솔 로그에 변경 내역이 출력된다.

- 여러 데이터를 관찰하고 관련 작업을 처리할 때는 watchEffect()를 쓰는 것이 낫다. 이 함수 내부에서 사용된 모든 반응형 의존성은 자동으로 추적된다. 또한 컴포넌트 렌더링 직후 최초로 실행되며 의존성 항목의 값이 변경될 때마다 재실행된다. 그러나 의존성 범위가 넓고 이들 간에 업데이트 빈도가 높다면 성능에 영향을 미칠 우려가 있다.

```jsx
 <template>
    <div>
        <h2>Watch User Name</h2>
        <p>Name: {{ user.name }}</p>
        <p>Age: {{ user.age }}</p>
        <button @click="user.name = 'newName'">Change Name</button>
        <button @click="user.age++">Increase Age</button>
    </div>
</template>
<script setup lang="ts">
import {reactive,watch} from 'vue'

interface User {
    name: string
    age: number
}

const user = reactive<User>({
    name: 'maya',
    age: 20,
})

watch(
    [() => user.name, () => user.age],
    ([newName, newAge], [oldName, oldAge]) => {
        console.log('name changed from', oldName, 'to', newName)
        console.log('age changed from', oldAge, 'to', newAge)
    },
    { immediate: true }
)

</script>

```

watch() 혹은 특정 반응형 데이터나 프로퍼티를 관찰하고 동적으로 처리할 수 있는 훌륭한 도구다. 그러나 기존 반응형 데이터를 바탕으로 새로운 반응형 데이터를 생성할 때는 computed()를 사용해야 한다.

## 5.5 computed()

computed 프로퍼티와 마찬가지로 computed() 또한 특정 반응형 데이터를 바탕으로 새로운 반응형 데이터와 캐시 데이터 값을 생성한다. ref() 또는 reactive()와 달리 computed()는 읽기 전용 참조 객체를 반환한다. 다시 말해 값을 직접 재할당할 수 없다.

옵션 API로 작성된 computed()를 훅 방식으로 고치면 다음과 같다.

```jsx
<script lang="ts" setup>
import { computed, ref} from 'vue';

const message = ref('Hello, Vue 3!');
const reversedMessage = computed<string>((
    () => message.value.split('').reverse().join('')
));

</script>
```

computed()는 script 섹션에서 객체를 반환하며, 이 객체는 ref()나 reactive()처럼 value 프로퍼티를 통해 (reversedMessage.value) 값에 접근한다.

아래는 comptuted() 를 이용하여 reversedMessage를 가져와 message가 회문인지 확인하는 예제이다.

```jsx
<template>
    <div>
        <h2>Palindrome Checker</h2>
        <p>Message: {{ message }}</p>
        <p>Reversed Message: {{ reversedMessage }}</p>
        <p v-if="isPalindrome">The message is a palindrome!</p>
        <p v-else>The message is not a palindrome.</p>
        <input v-model="message" placeholder="Type a message" />
    </div>
</template>
<script lang="ts" setup>
import { computed, ref} from 'vue';

const message = ref('Hello, Vue 3!');
const reversedMessage = computed<string>((
    () => message.value.split('').reverse().join('')
));
const isPalindrome = computed<boolean>(
    () => message.value === reversedMessage.value
)
</script>
```

이 예제는 타입 추론 에러를 방지하기 위해 reversedMessage와 isPalidrome의 타입을 명시적인 string과 boolean으로 선언한다.

- computed()는 기본적으로 읽기 전용 반응형 데이터 참조를 반환한다. 그럼에도 {get, set} 객체를 computed()의 인수로 전달하면 쓰기 가능 상태로 선언할 수 있다. 이런 메커니즘은 옵션 API의 computed 프로퍼티와 나란히 일관성을 유지시키기 위해 존재한다. 읽고 쓰야할 데이터는 ref()나 reactive()로 처리 해야 한다.

# 250509 5.6 컴포저블

## 재사용 컴포저블

컴포저블(composable)은 컴포지션 API 함수를 활용해 만드는 재사용 가능한 상태형 훅이다. 공통 로직을 보기 좋게 컴포저블로 나누어 구성하고 다양한 컴포넌트의 데이터 상태 변화를 관리할 수 있다. 이 과정에서 상태 관리 로직과 컴포넌트 로직이 분리된고 컴포넌트의 복잡도는 낮아지는 효과가 생긴다.

컴포저블을 경험하기 위해 먼저 새로운 타입스크립트 파일을 생성하고 반응형 데이터 객체를 반환하는 함수를 만들어 익스포트한다.

```jsx
import { reactive } from 'vue'
export const userMyComposable = () => {
  const myComposableData = reactive({
    title: 'This is my composable data',
  })
  return myComposableData
}
```

스크립트가 export하는 useComposable 함수는 reactive()로 생성한 my-composableData라는 반응형 데이터 객체를 반환한다.

- 컴포저블 파일은 프로젝트 어느 곳에 두어도 상관없지만 파일 구조를 정돈된 상태로 유지 하려면 src/composables 폴더에 배치하는 것이 좋다 또한 컴포저블 파일임을 명료하게 인식할 수 있도록 파일명에 관행적으로 use라는 접두어를 붙이도록 한다.

이제 컴포넌트 템플릿과 로직에서 myComposableData에 접근하고 이를 로컬 반응형 데이터처럼 취급할 수 있다.

```jsx
<script lang="ts" setup>
  import {useMyComposable} from '@/composables/useMyComposable'; const {myComposableData} =
  useMyComposable();
</script>
```

```jsx
import {ref, type Ref, type UnwrapRef} from 'vue'
type FetchResponse<T> = {
    data: Ref<UnwrapRef<T> | null>;
    error: Ref<UnwrapRef<Error | null>>;
    loading: Ref<boolean>;
}

export function useFetch<T>(url: string): FetchResponse<T> {
    const data = ref<UnwrapRef<T> | null>(null) as Ref<UnwrapRef<T> | null>;
    const loading = ref<boolean>(false);
    const error = ref<Error | null>(null);

    const fetchDate = async () => {
        try{
            loading.value = true;
            const response = await fetch(url);

            if(response.ok){
                throw new Error(`Failed to fetch date from ${url}`);
            }
            data.value = await response.json();
        }
        catch(err){
            error.value = err as Error;
        }finally{
            loading.value = false;
        }
    }
    fetchDate();
    return {
        data,
        error,
        loading,
    }
}
```

1. 데이터를 가져올 내부 로직을 선언
2. 컴포넌트 생성 과정에서 fetchData() 실행 데이터 자동으로 업데이트한다.
3. 선언된 반응형 변수를 반환한다.

```jsx
import { useFetch } from '@/composables/ch05/useFetch'

type Repo = {}
export const useGitHubRepos = (username: string) => {
  return useFetch<Repo[]>(`https://api.github.com/users/${username}/repos`)
}

```

```jsx
<script lang="ts" setup>
import { useGitHubRepos } from '@/composables/ch05/useGitHubRepos'
const { data: repos } = useGitHubRepos('mayashavin')

</script>
<template>
  <div>
    <h2 class="heading">GitHub Repositories</h2>
    <ul>
      <li v-for="repo in repos" :key="repo.id">
        <a :href="repo.html_url" target="_blank">{{ repo.name }}</a>
      </li>
    </ul>
  </div>
</template>

```

1. data를 가져와 repos로 이름을 변경한다.
2. repos를 순회하며 각 repo의 정보를 표시한다.

가져오기가 완료된 후 브라우저에서 리포지터리 목록을 볼 수 있다.

컴포저블을 잘 쓰면 애플리케이션의 상태 관리 로직의 모듈화, 구조화 수준을 높일 수 있다. 자신만의 컴포저블 라이브러리를 구축하고 전혀 다른 Vue 프로젝트에서 재사용할 수도 있다. 테마 제어, 데이터 유입, 매장 결제 관리 등등 활용 범위는 무궁무진하다. 참고로 VueUse는 각종 컴포저블 자료의 보고다. 다양한 요건에 대응하며 꼼꼼히 테스트되었고, 지금 당장 프로젝트에 투입될 수 있는 수많은 Vue 컴포지션 유틸리티로 가득하다.

# 250512 6.1 ~ 6.6

## 6.1 Axios란

Vue 개발자가 HTTP로 외부 리소스를 요청하는 방법은 다양하다. 내장 Fetch 메서드, 고전적인 XMLHttpRequest, Axios 같은 서드파티 라이브러리 등 여러 선택지가 있다. Http Request요청 데이터를 가져오기만 하려면 내장 fetch도 나쁘지 않다 그러나 장기적인 관점으로 복잡한 외부 리소스 API처리까지 고려한다면 다양한 추가 기능이 있는 Axios가 최선의 선택이다. Axios는 HTTP 요청을 처리하는 자바스크립트 오픈 소스 경량 라이브러리다. Fetch와 마찬가지로 프로미스 기반 HTTP 클라이언트이며, 서버와 브라우저 모두 사용할 수 있다.

Axios는 HTTP 요처을 가로채거나 취소할 수 있으며 사이트 간 요청 위조 방지 기능이 클라이언트에 내장되어 있다.또한 응답 데이터를 JSON 형식으로 자동 변환한다.

## 6.3 라이프 사이클 훅과 Axios

데이터를 가져오는 부가 작업은 beforeCreate, created, beforeMounted 등의 라이프사이클 훅에서 처리할 수 있다. 그러나 외부 데이터를 가져와 컴포넌트나 옵션 API에서 쓰려면 beforeCreate는 제외해야 한다. 반응형 데이터를 초기화하기 전 이므로 beforeCreate에서 할당한 데이터를 Vue가 무시하기 때문이다. 따라서 created 또는 beforeMounted를 선택해야 한다. 그러나 beforeMounted는 서버 사이드 렌더링에 사용할 수 없으며 created 훅은 컴포지션 API에 대응하는 라이프 사이클 함수가 없다.

가장 좋은 방법은 setup() 혹은 script setup에서 반응형 컴포지션 함수로 외부데이터를 가져오는 것이다.

axios.get() 메서드로 Github 공개 프로필을 가져오는 비동기 GET 요청을 만들어 보자. axios.get()은 프로미스를 반환하며, 프로미스의 체인 메서드인 then()에서 응답 데이터를 처리한다. Axios는 HTTP 응답 본문 데이터를 JSON 형식으로 자동 분석한다.

```jsx
<script lang="ts" setup>
import axios from 'axios'
import {ref} from 'vue'

const user = ref(null)

axios.get('https://api.github.ocm/users/mayashavin')
.then(response=>{
    user.value = response.data;
})
</script>
```

위를 await/async 방식으로 고치면 다음과 같다.

```
async function getUser(){
    const response = await axios.get('https://api.github.ocm/users/mayashavin');
    user.value = response.data;
}
getUser();
```

요청 도중 발생한 에러를 처리하려면 try catch문으로 감싸야한다.

```jsx
//try catch
async function getUser1() {
  try {
    const response = await axios.get('https://api.github.ocm/users/mayashavin')
    user.value = response.data
  } catch (error) {
    err.value = error
  }
}
getUser1()
```

아래는 axios로 Github에서 프로필을 조회한 후 화면에 정보를 표시하는 컴포넌트다, axios의 요청이 성공적으로 완료되면 프로필 정보가 렌더링된다.

```jsx
<script lang="ts" setup>
import axios from 'axios'
import {ref} from 'vue'
type User ={
    name: string;
    bio: string;
    avatar_url: string;
    twitter_username: string;
    blog: string;
}
const user = ref<User>()
const err = ref<unknown>(null)

async function getUser1(){
    try{
        const response = await axios.get('https://api.github.ocm/users/mayashavin');
        user.value = response.data;
    }catch(error){
        err.value = error;
    }

}
getUser1();
</script>
<template>
    <div class="user-profile" v-if="user">
        <img :src="user.avatar_url" :alt="`${user.name} Avatar`" width="200" />
        <div>
            <h1>{{ user.name }}</h1>
            <p>{{ user.bio }}</p>
            <p>Twitter : {{ user.twitter_username }}</p>
            <p>Blog: {{ user.blog }}</p>
        </div>
    </div>
</template>
```

비슷한 방식으로 에러가 발생했을 때 메시지를 표시할 조건문을 추가할 수도 있다.

```
    <div class="error" v-else-if="err">
        {{ err }}
    </div>
```

컴포넌트가 생성되는 도중에 비동기 요처을 실행하면 Vue 내부에는 어떤 일이 벌어질까? 컴포넌트의 라이프사이클은 동기식으로 진행된다. 즉, Vue는 비동기 요청과 무관하게 컴포넌트 생성 작업을 계속 진행한다. 이러한 특성으로 인해 런타임 도중에 다양한 컴포넌트에서 서로 다른 데이터 요청을 처리하면 특수한 조치가 필요하다.

## 6.4 런타임 중 비동기 데이터 요청

Vue는 항상 동기식으로 동작한다. 실행 도중 비동기 요청이 발생해도 Vue는 요청이 완료될 때까지 기다리지 않고 작업을 계속한다. 그런 다음 컴포넌트 생성 프로세스가 끝나면 비동기 요청 실행 순서에 따라 해결/거부 결과를 차례로 처리한다.

컴포넌트의 onBeforeMounted, onMounted,onUpdated 훅에 다음과 같이 콘솔 로그를 추가해 보자.

```jsx
<script lang="ts" setup>
import { onBeforeMount, onMounted, onUpdated, ref } from 'vue';
import axios from 'axios';
type User ={
    name: string;
    bio: string;
    avatar_url: string;
    twitter_username: string;
    blog: string;
}

type Error ={
    message: string;
}
const user = ref<User>()
const err =  ref<Error>()

async function getUser1(){
    try{
        const response = await axios.get('https://api.github.com/users/mayashavin');
        user.value = response.data;
        console.log(user.value?.name);

    }catch(error){
         err.value = { message: (error as Error).message };
    }

}

onBeforeMount(async()=> {
    console.log('created');
    getUser1();
})
onMounted(()=>{
    console.log('mounted');
})
onUpdated(()=>{
    console.log('updated');
})

</script>
```

브라우저 콘솔을 보면 아래와 같이 로그가 출력된다.

```jsx
created
MyComponent.vue:35 mounted
MyComponent.vue:22 Maya Shavin
```

비동기 요청이 해결/거부되고 컴포넌트 데이터가 변경되면 Vue 렌더러가 컴포넌트 업데이트 프로세스를 트리거한다. Vue가 DOM에 컴포넌트를 마운팅하는 시점은 아직 응답 데이터가 없다. 따라서 서버 데이터를 받기 전까지는 컴포넌트의 로딩 상태를 관리해야한다.

아래 처럼 컴포넌트 데이터에 loading 프로퍼티를 추가하고 요청이 해결/거부된 다음 로딩 상태를 비활성화시킬 수 있다.

```jsx
const loading = ref<boolean>()

async function getUser1(){
  loading.value = true;
    try{
        const response = await axios.get('https://api.github.com/users/mayashavin');
        user.value = response.data;
        console.log(user.value?.name)

    }catch(error){
         err.value = { message: (error as Error).message };
    }finally{
      loading.value = false
    }

}
```

그리고 템플릿 섹션에 v-if 로딩을 추가한다.

```jsx
<template>
    <div v-if="loading">
      Loading...
    </div>
    <div class="user-profile" v-else-if="user">
        <img :src="user.avatar_url" :alt="`${user.name} Avatar`" width="200" />
        <div>
            <h1>{{ user.name }}</h1>
            <p>{{ user.bio }}</p>
            <p>Twitter : {{ user.twitter_username }}</p>
            <p>Blog: {{ user.blog }}</p>
        </div>
    </div>
    <div class="error" v-else-if="err">
        {{ err.message}}
    </div>
</template>
```

이 코드는 비동기 요청이 진행되는 동안 로딩 메시지를 렌더링하고 요청이 해결되면 사용자의 프로필 정보를 표시하고 실패하면 에러 메시지를 내보낸다.

재사용 래퍼 컴포넌트를 만들어 비동기 데이터 요청에 따른 다양한 상태를 처리하는 방법도 있다, 그 중에는 목록 컴포넌트를 로딩하는 동안 화면에 내보일 스켈레톤 플레이스 홀더가 있다.

## 6.5 재사용 fetch 컴포넌트 생성

비동기 데이터 요청 상태 처리는 Vue 컴포넌트의 공통적 과제다. 로딩 상태는 일반적으로 로딩 메시지나 회전 아이콘으로 UI에 표시하고 요청이 거부됐을 때는 에러 컴포넌트로 화면을 꾸미곤 한다. 이러한 부분에 공통적으로 사용할 FetchComponent를 만들어 보자.

FetchComponent의 template 섹션은 slot과 v-if를 이용해 세 가지 영역을 구현한다.

### loading: 로딩 메시지를 표시할 슬롯

이 슬롯은 컴포넌트의 isLoading 상태에 따라 렌더링한다.

### error 에러 메시지를 표시할 슬롯

error 객체를 슬롯 props로 전달하며 error가 있을 때만 에러 미싲를 렌더링한다.

### default 수신 data가 있을 때 컴포넌트 컨텐츠를 표시할 기본 슬롯

슬롯 props로 data를 전달한다.

또한 에러와 로딩 메시지를 기본 메시지 대신 표시하기 위해 다음과 같이 slot에 이름을 지정한다.

```jsx
<template>
  <slot name="loading" v-if="isLoading">
    <div class="loading-message">Loading...</div>
  </slot>
  <slot :data="data" v-if="data"></slot>
  <slot name="error" v-if="error">
    <div class="error">
      <p>Error: {{ error.message }}</p>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const data = ref<object | undefined>();
const error = ref<Error | undefined>();
const isLoading = ref(false);

</script>
```

컴포넌트 요청 URL과 요청 메서드를 prop으로 전달받는다.

```jsx
const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    default: "GET",
  },
})

async function ferchData() {
  try{
    const response = await fetch(props.url, {
      method: props.method,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    data.value = await response.json();
  } catch (err) {
    error.value = err as Error;
  } finally {
    isLoading.value = false;
  }
}
ferchData();
```

- data의 타입이 사전에 정해져 있다면 any 또는 Object 대신 정확한 타입을 지정하는 것이 좋다. 그래야 타입스크립트의 유효성 검사 범위에 포함된다.

```jsx
<template>
  <slot name="loading" v-if="isLoading">
    <div class="loading-message">Loading...</div>
  </slot>
  <slot :data="data" v-if="data"></slot>
  <slot name="error" v-if="error">
    <div class="error">
      <p>Error: {{ error.message }}</p>
    </div>
  </slot>
</template>

<script lang="ts" setup>
import { ref,defineProps } from 'vue';

const data = ref<object | undefined>();
const error = ref<Error | undefined>();
const isLoading = ref(false);

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    default: "GET",
  },
})

async function ferchData() {
  try{
    const response = await fetch(props.url, {
      method: props.method,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    data.value = await response.json();
  } catch (err) {
    error.value = err as Error;
  } finally {
    isLoading.value = false;
  }
}
ferchData();
</script>

```

```jsx
<template>
  <FetchComponent url="https:/api.github.com/users/mayashavin">
    <template #default="defaultProps">
      <div class="user-profile">
        <img
          :src="(defaultProps.data as User).avatar_url"
          :alt="(defaultProps.data as User).name"
          width="200"
          />
          <div>
            <h1>{{ (defaultProps.data as User).name }}</h1>
            <p>{{ (defaultProps.data as User).bio }}</p>
            <p>Twitter : {{  (defaultProps.data as User).twitter_username }}</p>
            <p>Blog : {{  (defaultProps.data as User).blog }} </p>
          </div>
      </div>
    </template>
  </FetchComponent>
</template>

<script lang="ts" setup>
import FetchComponent from '@/components/do/ch06/6_5_fetch/FetchComponent.vue';
import type {User} from "@/types/ch06/User"

</script>
```

- FetchComponent를 사용하고 요청 URL을 prop으로 전달한다.
- 컴포넌트 콘텐츠를 #default로 감싸고 template으로 지정한다. 또한 이 슬롯에 전달된 props를 default props 객체에 바인딩한다. defaultProps.data는 Object 타입이므로 타입 스크립트 유효성을 검사를 거치도록 User로 캐스팅한다.
- defaultProps.data로 요청 결과 데이터에 접근하고 UI에 값을 표시한다.
- 데이터를 가져오던 기존 로직 코드는 모두 제거한다.
  Vue 컴포넌트 UI에서 외부 데이터를 요청하고 에러를 처리할 수 있다. 그러나 Vue가 컴포넌트를 생성할 때마다 데이터를 가져오는 방식은 최선이 아니다 특히 컴포넌트의 데이터가 자주 변경되지 않는 경우 더욱 그렇다.

이러한 문제가 단적으로 드러나는 상황은 웹 애플리케이션의 페이지를 전환할 때다. 페이지 데이터는 뷰를 처음 로드할 때 한 번만 거져와야 한다. 따라서 이런 경우에는 브라우저 로컬 저장소를 외부 데이터베이스로 삼거나 Vuex, 피니아 등의 상태 관리 서비스로 데이터를 캐시에 저장해야 한다.

로컬 저장소는 브라우저에 내장된 localStorage API로 다룬다. 가령 다음은 사용자의 GitHub 프로필 데이터를 로컬 저장소에 저장하는 코드다.

```jsx
localStorage.setItem('user', JSON.stringfy(user))
```

브라우저의 localStorage는 각 항목을 문자열로 저장하므로, 저장할 객체는 다음과 같이 문자열로 변환해야 한다.

```jsx
const user = JSON.parse(localStorage.getItem('user'))
```

아래 코드는 페이지를 처음 로드할 때만 비동기 호출을 실행한다. 첫 실행 때 데이터를 성공적으로 저장했다면 다음 부터는 로컬 저장소에서 직접 로드한다.

- 실제 애플리케이션과 localStorage
  localStorage에는 몇 가지 제약 사항이 있으므로 실제 애플리케이션에서는 사용하지 않는 것이 좋다. 브라우저는 사설/익명 세션의 localStorage를 사설/익명 세션의 localStorage를 매번 초기화한다. 사용자 또한 localStorage 기능을 끌 수 있다. 따라서 localStorage 대신에 Vuex 또는 피니아 등의 상태 관리 도구를 사용하는 것이 좋다.

```jsx
<script lang="ts" setup>
import FetchComponent from '@/components/do/ch06/6_5_fetch/FetchComponent.vue'
import type { User } from '@/types/ch06/User'
import axios from 'axios'

async function getUser() {
  try {
    console.log('getUser')

    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user === '{}') return (user.value = user)
    const response = await axios.get('https://api.github.com/users/mayashavin')
    user.value = response.data
    localStorage.setItem('user', JSON.stringify(user.value))
    console.log(user.value)
  } catch (err) {
    console.error(err)
  }
}
getUser()
</script>
```

# 250513 7.1 렌더함수와 JSX

Vue는 컴포넌트를 렌더링할 때 Vue 컴파일러 API를 통해 HTML 탬플릿을 가상 DOM으로 컴파일한다. Vue 컴포넌트 데이터가 갱신되면 Vue는 내부 렌더 함수를 트리거하며, 바뀐 값을 가상 DOM으로 전달한다.

대부분의 컴포넌트는 template 영역을 컴파일하고 렌더링한다. 그러나 일부 특수한 작업은 HTML 탬플릿 분석 단계를 우회해야 한다. 성능 최적화, 서버 사이드 렌더링 애플리케이션, 동적 컴포넌트 라이브러리 등의 작업이 대표적인 사례다. 이런 경우render()로 가상 DOM을 직접 렌더링하고 가상 노드를 변환하면 템플릿 컴파일 프로세스를 건너뛸 수 있다.

### 7.1.1 렌더 함수

Vue2에서 render() 함수는 createElement 콜백을 파라미터로 받고 createElement에 인수를 전달한 다음 유효한 VNode를 반환한다. 이러한 createElement 콜백은 일반적으로 h함수로 반환한다.

vue3에서는 h함수를 파라미터로 사용하지 않고 대신 vue 패키지에서 제공하는 전역 함수 h로 VNode를 생성한다.

- h는 하이퍼자바스크립트를 의미

```jsx
import { createApp, h } from 'vue'
const App = {
  render() {
    return h('div', { id: 'test-id' }, 'this is a render function test with Vue')
  },
}
```

- 렌더 함수의 다중 루트 노드 지원
  : Vue 3는 컴포넌트 템플릿에 복수의 루트 노드를 둘 수 있다. 이 때 render()는 VNode 배열을 반환하며, 각 VNode는 모두 동일한 DOM 계청 수준에 주입된다.

```jsx
import { createApp, h } from 'vue'

const App = {
  render() {
    return h('div', { id: 'test-id' }, 'this is a render function test with Vue')
  },
}

const app = createApp(App) // App을 Vue 인스턴스로 생성
app.mount('#app')
```

### 7.1.2 h 함수와 VNode

vue는 매우 유연하게 h함수를 설계했다. h 함수의 세 가지 입력 파라미터와 다양한 타입을 나열한다.

| 파라미터  | 필수   | 데이터 타입        | 설명                                                                                        |
| --------- | ------ | ------------------ | ------------------------------------------------------------------------------------------- |
| 컴포넌트  | 예     | 문자열, 객체, 함수 | 문자열 텍스트, HTML 태그 엘리먼트 컴포넌트 함수, 옵션 객체 형태로 전달할 수 있다.           |
| props     | 아니요 | 객체               | 컴포넌트에 전달할 모든 props 속성, 이벤트를 담은 객체, template에 작성하는 방식과 비슷하다. |
| 중첩 자손 | 아니요 | 문자열, 배열, 객체 | VNode 목록, 텍스트 컴포넌트, slots 객체 형태로 자식 노드를 전달한다.                        |

h 함수의 문법은 다음과 같다.

```jsx
h(
  component,
  {
    /*props*/
  },
  children,
)
```

가령 루트 엘리먼트가 div 태그이며 내부에 id, 인라인 border 스타일 하나의 input 엘리먼트가 있는 컴포넌트를 가정해보자. 이러한 컴포넌트는 다음과 같이 h 함수로 생성할 수 있다.

```jsx
import { createApp, h } from 'vue'

const inputElem = h('input', {
  placeholder: 'Enter some text',
  type: 'text',
  id: 'text-input',
})
const comp = h(
  'div',
  {
    id: 'my-test-comp',
    style: { border: '1px solid blue' },
  },
  inputElem,
)

const App = {
  render() {
    return h(comp)
  },
}

const app = createApp(App) // App을 Vue 인스턴스로 생성
app.mount('#app')
```

### 7.1.3 렌더 함수와 자바스크립트 XML

JSX(자바스크립트 XML)은 자바스크립트 안에서 HTML 코드를 작성할 수 있도록 리액트 프레임워크가 도입한 자바스크립트의 확장이다. JSX는 다음과 같은 형식으로 HTML과 자바스크립트 코드를 함께 작성한다.

```jsx
const JSXComp = <div>This is a JSX components</div>
```

이 코드는 “This is a JSX component”라는 텍스트가 담긴 div 태그 렌더 컴포넌트다. 이 컴포넌트는 다음과 같이 render함수에서 그대로 사용할 수 있다.

```jsx
import { createApp } from 'vue'
const JSXComp = <div>This is a JSX compnent</div>
const App = {
  render() {
    return JSXComp
  },
}
const app = createApp(App)
app.mount('#app')
```

Vue 3.0은 기본적으로 JSX를 지원하지만 사용 문법은 Vue 템플릿과 다르다. 데이터를 바인딩하려면 단일 중괄호를 사용한다.

```jsx
import { createApp } from 'vue'
const name = 'JSX'
const JSXComp = <div>This is a {name} compnent</div>
const App = {
  render() {
    return JSXComp
  },
}
const app = createApp(App)
app.mount('#app')
```

동적 데이터도 같은 방식으로 바인딩한다. 표현식을 ‘’로 감쌀 필요없이 다음 예시처럼 div의 id 속성에 값을 지정할 수 있다.

```jsx
const id = 'jsx-comp'
const JSXComp = <div id={id}>This is a {name} compnent</div>
```

Vue와 리액트는 바인딩 방식이 약간 다르다. 가령 Vue는 리액트처럼 class를 className으로 변형하지 않고 원래 형태를 유지한다. 엘리먼트의 이벤트 리스너도 마찬가지다(on-Click 대신 onclick을 사용한다.) 옵션 API로 작성한 Vue 컴포넌트도 components에 JSX컴포넌트를 등록할 수 있다. JSX 컴포넌트와 render 함수를 결합하면 동적 컴포넌트를 편리하게 만들 수 있으며 대부분의 경우 가독성이 향상된다.

## 7.2 기능성 컴포넌트

기능성 컴포넌트는 무상태 컴포넌트이며 통상적인 컴포넌트 라이프사이클을 따르지 않는다. 옵션 API로 만드는 일반 컴포넌트와 달리 기능성 컴포넌트는 렌더 함수를 반환하는 일종의 함수 형태로 표현한다.

기능성 컴포넌트는 상태를 저장하지 않으므로 this 인스턴스에 접근할 수 없다. 대신 Vue는 컴포넌트 외부의 props와 context를 함수 인수로 전달한다. 기능성 컴포넌트는 vue 패키지 전역함수 h()로 가상 노드 인스턴스를 생성해 반환하며 전체 구문은 다음과 같다.

```jsx
import { h } from 'vue'

export function MyFuctionComp(props, context) {
  return h()
}
```

context는 컴포넌트의 컨텍스트 프로퍼티들을 노출한다. 여기에는 이벤트 이미터가 담긴 emits, 상위 컴포넌트에서 전달된 attrs, 컴포넌트의 중첩 엘리먼트가 담긴 slots 등이 포함된다.

heading 엘리먼트를 표시하는 컴포넌트인 MyHeading을 만들어보자. 이 컴포넌트는 전달받은 모든 텍스트를 헤딩 태그로 출력하며 해당 단계는 level props로 전달받는다.

예를 들어 “Hello World” 텍스트를 2단계 헤딩 태그로 표시하려면 다음과 같이 사용한다.

```jsx
import { h } from 'vue'

export function MyFuctionComp(props, context) {
  return h()
}

export function MyHeading(props, context) {
  const heading = `h${props.level}`
  return h(heading, context.$attrs, context.$slots)
}
```

기능성 컴포넌트는 Vue의 렌더링 프로세스를 거치지 않는다. 대신 Vue는 렌더러 파이프라인 진행 도중 기능성 컴포넌트 가상 노드를 직접 선언한다. 이러한 생성 원리상 기능성 컴포넌트는 중첩된 슬롯이나 속성을 가질 수 없다.

# 250514 7.3 ~ 7.6

## 7.3 기능성 컴포넌트의 props와 emits 정의

다음은 기능성 컴포넌트의 props와 emits을 명시적으로 정의하는 구문이다.

```jsx
MyfunctionComp.props = ['prop-one', 'prop-two']
MyFunctionComp.emits = ['event-one', 'event-two']
```

context.props를 직접 정의하지 않으면 context.attr와 동일한 값이 지정된다. context.attrs는 컴포넌트에 전달된 모든 속성을 담고 있다.

기능성 컴포넌트는 컴포넌트 렌더링을 프로그램 방식으로 제어하는 강력한 도구이다. 특히 까다로운 사용자 요건을 처리하기 위한 저수준 유연성을 갖춘 컴포넌트 라이브러리를 제작할 때 매우 유용하다.

## 7.4 Vue 플러그인으로 전역 커스텀 기능 추가하기

Vue 애플리케이션은 서드 파티 라이브러리 또는 커스텀 기능을 플러그인 형태로 추가하고 전역적으로 사용할 수 있다. Vue 플러그인은 install()이라는 단일 메서드를 노출하는 객체이며, 자신의 설치 코드를 담고 있다.

```jsx
import type { App } from 'vue'

export default {
  install(app: App<Element>, options: any) {
    //intall
    const truncate = (str: string) => {
      if (str.length > options.limit) {
        return `${str.slice(0, options.limit)}...`
      }
      return str
    }
    app.config.globalProperties.$truncate = truncate
  },
}

```

Vue 엔진은 truncate 플러그인을 설치하고 초기 limit를 10자로 설정한다. 플러그인은 app 인스턴스에 속한 모든 Vue 컴포넌트에서 사용할 수 있다. 다음과 같이 script 섹션에서 this.$truncate로 template 섹션에서 $truncate로 이 플러그인을 호출할 수 있다.

```tsx
import { createApp, defineComponent } from 'vue'
import truncate from '@/main_ts/ch07/7_4_plugin/plugin.ts'

// import './assets/main.css'
//원

const App = defineComponent({
  template: `
    <h1> {{ $truncate('My truncated long text') }} </h1>
    <h2> {{ truncatedText }} </h2>
  `,
  data() {
    return {
      truncatedText: this.$truncate('My 2nd truncated text'),
    }
  },
})

const app = createApp(App)
app.use(truncate, { limit: 10 }) // 플러그인 사용

app.mount('#app')
```

$truncate는 오직 `template` 섹션 혹은 options API가 적용된 script 섹션에서 호출할 수 있다. `<script setup>` 과 setup()에서 플러그인을 사용하려면 제공/주입 패턴을 따라야 한다. plugins/truncate.ts의 install 함수에 다음과 같이 제공 코드를 추가한다.

```jsx
import type { App } from 'vue'

export default {
  install(app: App<Element>, options: any) {
    //intall
    const truncate = (str: string) => {
      if (str.length > options.limit) {
        const sliced :string = str.slice(0, options.limit);
        console.log(sliced);

        return `${sliced}...`
      }
      return str
    }
    app.config.globalProperties.$truncate = truncate
    app.provide('plugins', { truncate }) // provide
  },
}

```

```jsx
import { createApp } from 'vue'
import truncate from '@/main_ts/ch07/7_4_plugin/plugin_setup.ts'

//SFC파일
import MyComponent from './components/do/MyComponent.vue'

// import './assets/main.css'
//원본 코드
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(truncate, { limit: 10 }) // 플러그인 사용
app.use(createPinia())
app.component('MyComponent', MyComponent)
app.use(router)
app.mount('#app')
```

```jsx
<template>
    <div>
        <h1>{{ truncateText }}</h1>
    </div>
</template>
<script setup lang="ts">
import { inject } from 'vue'

interface Plugins {
  truncate: (text: string) => string
}

const plugins = inject<Plugins>('plugins')
const truncateText = plugins?.truncate('My 2nd truncated text') ?? ''
</script>
```

플러그인은 전역 메서드를 구성하고 다른 애플리케이션에서 재사용하려 할 때 매우 유용하다. 또한 외부 라이브러리를 설치하는 과정에 추가 로직을 작성할 수 있다는 장점이 있다. Axios로 외부 데이터를 가져오거나 i18n로 지역화를 구현하는 경우가 대표적이다.

## 7.5 component 태그를 이용한 동적 렌더링

component 태그는 Vue 컴포넌트를 렌더링할 플레이스홀더 역할을 하며, 다음과 같이 isProps로 컴포넌트 참조명을 지정한다.

```jsx
<component is="targetCompnentName" />
```

대상 컴포넌트가 app에 등록됐거나 다른 부모 컴포넌트의 component에서 사용됐다고 가정해보자. 이 경우 Vue 엔진은 컴포넌트 참조명으로 대상 컴포넌트를 조회하고 component 태그를 실제 컴포넌트로 교체할 수 있다. 대상 컴포넌트는 <component>로 전달된 모든 props도 상속받는다.

다음과 같이 ‘Hello World’ 텍스트를 렌더링하는 HelloWorld 컴포넌트가 있다고 가정해보자.

```jsx
<template>
  <div>Hello World</div>
</template>
```

이 컴포넌트를 App에 등록하면 다음과 같이 <component> 태그를 통해 동적으로 렌더링할 수 있다.

```jsx
<template>
  <component :is="HelloWorld" />
</template>

<script setup lang="ts">
import HelloWorld from '@/components/do/ch07/HelloWorld.vue'
</script>
```

또한 v-bind 디렉티브 또는 : 문자로 is props에 참조 컴포넌트를 바인딩 할 수 있다. 다음 과 같이 코드를 고치면 이전 예제의 두 코드 블록을 하나의 App 컴포넌트로 압축할 수 있다.

```jsx
<template>
  <component :is="myComp" />
</template>

<script lang="ts">
import HelloWorld from '@/components/do/ch07/HelloWorld.vue'
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return{
            myComp:{
                template: '<div>Hello'
            }
        }
    },
});
</script>
```

위 코드에서 참조 컴포넌트 myComp는 옵션 API 방식으로 작성되었지만 SFC 컴포넌트를 임포트하고 전달하는 방법도 있다. 두 방식 모두 출력 결과는 같다.

<component> 태그 활용법은 무궁무진하다. 갤러리 컴포넌트를 예를 들자면, 각 갤러리 항목에 component를 적용해 Card 혹은 Row 컴포넌트를 선택적으로 교체하여 렌더링할 수 있다.

그러나 Vue 컴포넌트를 전환하는 과정에서 현재 엘리먼트를 완전히 언마운팅하고 컴포넌트의 데이터 상태를 모두 지운다. 결국 이전 컴포넌트로 전환한다 해도 새로운 데이터 상태로 새로운 인스턴스가 만들어 지는 셈이다. 이러한 재생성의 단점을 보완하고, 향후 컴포넌트 전환 시 과거 엘리먼트의 상태를 보존하려면 keep-alive 컴포넌트를 사용해야 한다.

## 7.6 keep-alive로 컴포넌트 인스턴스를 활성 상태로 유지하기

<keep-alive>는 Vue 내장 컴포넌트이며 비활성 모드에서 동적 엘리먼트를 감싸고 컴포넌트의 상태를 보존하는 역할을 한다.

StepOne과 StepTwo라는 두 컴포넌트가 있다고 가정해보자. StepOne 컴포넌트에는 다음과 같이 문자열 input 필드가 있으며 로컬 데이터의 name 프로퍼티를 v-model로 양방향 바인딩하고 있다.

```jsx
<template>
    <div>
        <label for="name">Step one's input</label>
        <input v-model="name" type="text" id="name" />
    </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
const name = ref<string>("")
</script>
```

```jsx
<template>
    <div>
        {{ name }}
    </div>
</template>
<script lang="ts" setup>
    const name = "Step 2";
</script>
```

App 템플릿은 compnent 태그에서 로컬 데이터 activeComp 프로퍼티를 참조해 컴포넌트를 렌더링한다. activeComp의 초기값은 StepOne이며 이 값을 StepTwo로 번갈아하는 버튼이 있다.

```jsx
<template>
    <div>
        <keep-alive>
            <component :is="activeComp"/>
        </keep-alive>
        <div>
            <button @click="activeComp ='StepOne'" v-if="activeComp === 'StepTwo'">
                Go to Step Two
            </button>
            <button @click="activeComp ='StepTwo'" v-else>
                Go to Step One
            </button>
        </div>
    </div>
</template>
<script lang="ts" >
import { defineComponent } from 'vue';
import StepOne from '@/components/do/ch07/7_6_keep_alive/StepOne.vue'
import StepTwo from '@/components/do/ch07/7_6_keep_alive/StepTwo.vue'

export default defineComponent({
    components: { StepOne, StepTwo},
    data() {
      return {
        activeComp: "StepOne"
      }
    },
})
</script>
```

```jsx
<template>
    <div>
        <label for="name">Step one's input</label>
        <input v-model="name" type="text" id="name" />
    </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
const name = ref<string>("")
</script>
```

```jsx
<template>
    <div>
        {{ name }}
    </div>
</template>
<script lang="ts" setup>
    const name = "Step 2";
</script>
```

StepOne과 StepTwo를 전환할 때마다 Vue는 input 필드에 입력된 name 프로퍼티 값을 그대로 보존한다. 따라서 StepOne으로 전환할 때 값이 초기화되지 않고 이전 값이 유지된다.

keep-alive가 캐시로 유지할 인스턴스의 최대 개수는 다음과 같이 max props로 정의할 수 있다.

```jsx
<keep-alive max="2">
    <component :is="activeComp"/>
</keep-alive>
```

위 코드에서 `max=”2”` 설정은 keep-alive 인스턴스의 최대 개수를 2개로 정의한다. 캐시 인스턴스 수가 이를 넘기면 Vue는 가장 먼저 사용됐던 캐시 목록에서 제거하고 새로운 인스턴스를 추가한다.(Least recently used)

# 250515 8.1 ~ 8.2

## 8.1 라우팅이란

사용자는 웹을 탐색할 때 브라우저 주소창에 URL을 입력한다. URL은 웹 리소스를 나타내는 주소다. URL은 여러 의미와 요소를 담고 있지만 다음과 같은 큰 구획으로 나눌 수 있다.

위치

요청 리소스의 경로, 웹 개발 시 사전 정의한 경로 패턴을 기준으로 브라우저에 렌더링할 컴포넌트를 결정한다.

쿼리 파라미터

& 기호로 구분된 키-값 쌍이며 추가 정보를 서버에 전달하는 역할을 한다. 페이지 사이에서 데이터를 전달하는 용도로 사용한다.

앵커

`#` 문자에 이은 모든 텍스트, 엘리먼트 id값을 지정해 페이지 내 특정 엘리먼트로 이동하거나 미디어 엘리먼트의 특정 시간으로 이동하는 역할을 한다.

```jsx
https://mayashavin.com/blog?tag=vue&sortBy=asc#summary
```

브라우저는 사용자가 입력한 URL을 근거로 서버와 통신하며 서버는 요청 리소스를 반환한다. 리소스는 이미지나 비디오 등의 정적 파일, 웹 페이지나 웹 애플리케이션 등의 동적 페이지로 이루어진다.

싱글 페이지 애플리케이션은 라우팅 메커니즘을 브라우저가 담당하며 브라우저를 새로 고치지 않아도 자연스럽게 페이지 사이를 오갈 수 있다. 라우팅 시스템은 페이지 URL에서 경로 패턴을 분석하고 이에 해당하는 애플리케이션 컴포넌트를 결정한다.
Vue는 프런트엔드 프레임워크로써 SPA 컴포넌트를 구축하는 틀을 제공하지만 라우팅 서비스는 별개의 문제다. 사용자에게 온전한 내비게이션 경험을 제공하려면 애플리케이션 라우팅 기능이 반드시 필요하다. SPA의 통상적 과제인 히스토리 관리, 북마크 등의 기능을 포함해 라우팅 서비스 전체를 설계하고 개발해야 한다.

## 8.2 Vue 라우터

Vue 라우터는 Vue 애플리케이션의 공식 라우팅 서비스이며, 페이지 내비게이션 기능과 제어 메커니즘을 제공한다. Vue 라우터로 애플리케이션의 라우팅 시스템을 구성하면 컴포넌트와 페이지를 매핑하고 SPA 클라이언트 측면에서 원활한 사용자 경험을 전달할 수 있다.

- Vue 라우터 웹사이트에서 공식 문서 API 참고 사례등의 정보를 알 수 있다.

Vue 라우터 기능을 시연할 가상의 피자 주문 시스템을 SPA로 구축해보자. 애플리케이션 헤더에는 Home,About,Pizzas,Login 페이지 링크가 있다.

각 링크는 Vue 애플리케이션 페이지로 연결된다. 따라서 각각의 컴포넌트를 추가하고 views 폴더에 저장할 것이다. 다음은 피자 하우스 코드베이스의 뷰 컴포넌트 목록이다.

HomeView
환영 메시지와 피자 목록을 표시한다.

AboutView
애플리케이션에 대한 간단한 설명이 포함된 정보 페이지다.

PizzasView
주문용 피자 목록을 표시한다.

ContactView
연락하기 폼을 표시한다.

LoginView
로그인 폼을 표시한다.

| URL                           | 컴포넌트   | 라우트 경로 |
| ----------------------------- | ---------- | ----------- |
| http://localhost:4000         | HomeView   | /           |
| http://localhost:4000/about   | AboutView  | /about      |
| http://localhost:4000/pizzas  | PizzasView | /pizzas     |
| http://localhost:4000/contact | Contact    | /contact    |
| http://localhost:4000/login   | LoginView  | /login      |

### 8.2.2 라우트 정의

라우트 페이지 URL에 대응하는 경로 패턴이다. Vue 라우터는 RouteRecordRaw 인터페이스로 설정 객체를 만들어 라우트를 정의한다. 아래는 RouterRecordRaw 배열로 rotues를 설정한 예이다.

```jsx
import { type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import PizzasView from '@/views/PizzasView.vue'
import ContactView from '@/views/ContactView.vue'
import LoginView from '@/views/LoginView.vue'

const routes:RouteRecordRaw[] =[
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
    {
    path: '/pizzas',
    name: 'pizzas',
    component: PizzasView
  },
    {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
    {
    path: '/login',
    name: 'login',
    component: LoginView
  },
]

export default routes

```

- 명명된 라우트
  이번 장의 예제는 name 프로퍼티를 지닌 명명된 라우터를 사용한다. 코드 가독성을 높이고 관리하기 쉽게 유지하려면 라우트에 이름을 지정하는 것이 좋다.

### 8.2.3 라우터 인스턴스 생성

라우터 인스턴스는 vue-router 패키지의 createRouter 메서드로 생성한다. 이 메서드의 인수는 RouterOptions 타입 객체이며 주요 프로퍼티는 다음과 같다.

history
해시 기반 또는 웹 기반 히스토리 모드를 설정하는 객체 웹 방식은 HTML5 히스토리 API로 URL을 읽고 새로고침 없이 페이지를 탐색할 수 있다.

rotues
라우터 인스턴스에서 사용할 라우트 배열

linkActiveClass
링크가 활성 상태일 때 적용할 클래스명. 기본값은 router-link-active다.

linkExactActiveClass
활성 상태의 링크가 정확하게 일치할 때 적용할 클래스명 기본값은 rotuer-link-exact-active

다음 예제는 vue-rotue 패키지의 createWebHistory 메서드로 웹 기반 history 객체를 생성한다. 이 메서드는 베이스 URL 문자열을 선택적 인수로 전달한다.

```jsx
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import PizzasView from '@/views/PizzasView.vue'
import ContactView from '@/views/ContactView.vue'
import LoginView from '@/views/LoginView.vue'

const routes:RouteRecordRaw[] =[
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
    {
    path: '/pizzas',
    name: 'pizzas',
    component: PizzasView
  },
    {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
    {
    path: '/login',
    name: 'login',
    component: LoginView
  },
]

export const router = createRouter({
  history: createWebHistory('http://localhost')
  ,routes
})

```

그러나 베이스 URL을 정적 문자열로 지정하는 것은 좋은 방법이 아니다. 베이스 URL 설정은 개발, 프로덕션 등다양한 환경과 무관한 격리된 상태로 유지하는 것이 최선이다. 이러한 취지에서 vite은 BASE_URL 프로퍼티가 포함된 import.meta.env라는 환경 객체를 제공한다. BASE_URL은 .env로 시작하는 전용 환경 파일에 추가하거나 Vite 서버를 실행할 때 명령줄에 지정할 수 있다.

```jsx
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
```

### 8.2.4 라우터 인스턴스 탑재

애플리케이션 인스턴스 app은 main.ts 파일에서 초기화한다. router 인스턴스 또한 이곳에서 import하고 app.user 메서드에 인수로 전달한다.

### 8.2.5 RouterView 컴포넌트로 현재 페이지 렌더링하기

URL 경로에 맞추어 뷰를 동적으로 생성하려면 Vue 라우터가 제공하는 플레이스홀더 컴포넌트인 RotuerView를 써야한다. Vue 라우터는 애플리케이션 실행 중에 이 컴포넌트를 URL 패턴 설정과 일치하는 엘리먼트로 교체한다.

```jsx
<script setup lang="ts">
import {RouterView} from 'vue-router';
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>

```

주소창에 /about을 치면 해당 라우트에 맞는 컴포넌트가 화면에 표시된다.

RouterView도 Vue 컴포넌트이므로 props, 속성, 이벤트 리스너를 지정할 수 있으며 RouterView는 이들을 뷰로 전달한다. 다음은 RotuerView에 class를 전달하는 예시다.

```jsx
<template>
  <RouterView class="view" />
</template>
```

이렇게 전달된 class 속성은 렌더 컴포넌트의 최상위 컨테이너 엘리먼트에 지정되며 이를 통해 css 스타일을 제어할 수 있다.

### 8.2.6 RouterLink 컴포넌트로 내비게이션 바 만들기

Vue 라우터는 이터랙티브 내비게이션 앨리먼트를 생성할 수 있는 RouterLink 컴포넌트를 제공한다. 이 컴포넌트는 특정 라우터의 path 문자열을 to props로 지정할 수 있다. 다음 예제는 about 페이저로 이동하는 링크를 나타낸다.

```jsx
<router-link :to="{name:'about'}">About</router-link>
```

기본적으로 이 컴포넌트 href와 활성 링크 클래스를 담아 앵커 엘리먼트(a)를 렌더링한다. 활성 링크 클래스는 이전에 설명했던 router-link-active 또는 router-link-exact-active다. 기본 엘리먼트 대신 다른 엘리먼트로 렌더링하는 방법도 있다. 다음 예시는 불리언 속성인 custum과 v-slot 디렉티브를 적용해 button 엘리먼트를 렌더링한다.

```jsx
  <router-link :to="{name:'about'}" v-slot="{navigate}">
    <button @click="natigate">About</button>
  </router-link>
  <RouterView class="view"/>
```

이 코드는 a엘리먼트가 아닌 button 엘리먼트를 렌더링하며 클릭 이벤트를 navigate 함수와 바인딩한다.

- custom 속성
  custom 속성을 사용할 때는 navigate 함수를 클릭 핸들러로 바인딩하거나, v-slot으로 href 값을 가져와 직접 링크를 걸어야 한다. 그렇지 않으면 링크가 제대로 작동하지 않는다. 이떄 router-link-active 등의 클래스명은 커스텀 엘리먼트에 적용되지 않다.

```jsx
<script setup lang="ts">
// import {RouterView} from 'vue-router';
</script>

<template>
<nav>
  <router-link :to="{name:'home'}">home</router-link>
  <router-link :to="{name:'about'}">About</router-link>
  <router-link :to="{name:'pizzas'}">pizzas</router-link>
  <router-link :to="{name:'contact'}">contact</router-link>
  <router-link :to="{name:'login'}">login</router-link>
</nav>
  <!-- <RouterView class="view"/> -->
</template>

<style scoped>
nav {
  display: flex;
  gap: 30px;
  justify-content: center;
}
.router-link-active, .rotuer-link-exact-active{
  text-decoration: underline;
}

</style>

```

App 컴포넌트에 NavBar를 추가하면 페이지상단에 네비게이션 바가 나타난다.

### 250516 8.3

라우트 사이에 데이터를 전달하려면 다음과 같이 to 라우터 객체에 query 필드를 추가한다.

```jsx
<router-link :to="{ name: 'pizzas', query: { id: 1 } }" class="link">Pizza 1</router-link>
```

query 필드는 경로에 전달하려면 쿼리 파라미터 정보가 담긴 객체다. Vue 라우터는 이 객체를 쿼리 문자열로 변환하고 다음과 같이 ? 문자를 붙여 완전한 href 경로를 만든다.

```jsx
<a
  data-v-7a7a37b1=""
  href="/pizzas?id=1"
  class="router-link-active router-link-exact-active link"
  aria-current="page"
>
  Pizza 1
</a>
```

이렇게 전달된 쿼리 파라미터는 라우트 컴포넌트에서 useRoute() 함수로 접근할 수 있다. 다음은 PizzasView에서 쿼리 파라미터로 접근하는 예시이다.

```jsx
<template>
  <div>
    <h1>This is an Pizzas page</h1>
    <p v-if="pizzaId">Pizza Id: {{ pizzaId }}</p>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
const pizzaId = route.query?.id
</script>

```

브라우저에서 http:localhost:port/pizzas?id=1 URL에 접근하면 다음 렌더링 화면이 나온다.

```jsx
This is an Pizzas page
Pizza Id: 1
```

PizzasView에 검색기능을 추가해보자.

```jsx
<template>
  <div>
    <h1>This is an Pizzas page</h1>
    <p v-if="pizzaId">Pizza Id: {{ pizzaId }}</p>
    <ul>
      <li v-for="pizza in pizzas" :key="pizza.id">
        <PizzaCard :pizza="pizza"/>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import PizzaCard from '@/components/do/ch08/PizzaCard.vue'
const route = useRoute()
const pizzaId = route.query?.id
</script>

```
