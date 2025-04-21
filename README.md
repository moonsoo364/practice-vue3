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
