# SPA 라우터 구현하기

## 과제 요구사항

**1) 해당 주소로 진입했을 때 아래 주소에 맞는 페이지가 렌더링 되어야 한다.**

- `/` → `root` 페이지
- `/about` → `about` 페이지

**2) 버튼을 클릭하면 해당 페이지로, 뒤로 가기 버튼을 눌렀을 때 이전 페이지로 이동해야 한다.**

- 힌트) `window.onpopstate`, `window.location.pathname` ,History API(`pushState`)

**3) Router, Route 컴포넌트를 구현해야 하며, 형태는 아래와 같아야 한다.**

```tsx
ReactDOM.createRoot(container).render(
  <Router>
    <Route path="/" component={<Root />} />
    <Route path="/about" component={<About />} />
  </Router>
);
```

**4) 최소한의 push 기능을 가진 useRouter Hook을 작성한다.**

```tsx
const { push } = useRouter();
```

## 힌트 사용하기

힌트를 쓰려면 일단 저 이벤트들이 뭔지부터 찾아봐야했다. 알아야 하는 건 총 세 가지, `window.onpopstate`, `window.location.pathname`, History API(`pushState`) 인데 그나마 저 중 2가지는 어렴풋하게 개념을 알고 있었다. 하지만 그것보다 훨씬 구체적으로 정립해보았다.

### window.onpopstate와 window.location.pathname

#### 1. window.onpopstate

> MDN Web docs: **window.onpopstate**
>
> Window 인터페이스의 popstate 이벤트는 사용자의 세션 기록 탐색으로 인해 현재 활성화된 기록 항목이 바뀔 때 발생합니다. 만약 활성화된 엔트리가 `history.pushState()` 메서드나 `history.replaceState()` 메서드에 의해 생성되면, popstate 이벤트의 state 속성은 히스토리 엔트리 state 객체의 복사본을 갖게 됩니다.

MDN에서 언급한 것처럼 `pushState` 이벤트나 `replaceState` 이벤트에 의해 생성된 히스토리 엔트리가 활성화되면 `popState` 내 프로퍼티인 `state`가 이 히스토리 엔트리의 복사본을 갖고 있게 된다.

이런 특성 때문에 `pushState`와 함께 여러 가지 기능을 만드는데 쓰는 예시들을 많이 찾을 수 있었다.

#### 2. window.location.pathname

> MDN Web docs: **window.location.pathname**
>
> `pathname` 속성은 URL의 경로와 그 앞의 /로 이루어진 USVString을 반환합니다. 경로가 없는 경우 빈 문자열을 반환합니다.

`window.location.pathname`, `document.location.pathname`, `location.pathname`, `url.pathname` 등 여러 인터페이스에서 호출이 가능한 이 `pathname` 속성은 URL에서 '/' 이후 문자열을 반환하므로 페이지 이동을 구현할 때 자주 보게 된다.

URL을 통해 서버로 GET 요청을 보내게 되므로 `pathname`에는 어떤 정보를 요청하는지 자세한 내용을 담게 된다. 만약 쇼핑몰 같은 웹사이트에서 회원별로 숫자 ID를 무작위로 부여해 그 숫자로 마이페이지로 이동하는 기능이 있다고 가정해보자. 그럼 URL은 "www.shopping.com/mypage/394812" 와 같은 형식이 되고, `pathname`인 "/mypage/394812"에는 이동할 페이지와 회원의 ID 같은 정보를 담고 있게 된다.

### History API(`pushState`)

> MDN Web docs: **History.pushState()**
>
> HTML 문서에서, `history.pushState()` 메서드는 브라우저의 세션 기록 스택에 상태를 추가합니다.
>
> ```javascript
> history.pushState(state, title[, url]);
> ```

SPA 단점 중 하나가 주소가 바뀌지 않는다는 것인데, 이를 해결하기 위해 초창기에는 /#(해쉬), /#!(해쉬뱅)을 붙이고, pathname을 붙였다고 한다. 하지만 아무 의미도 없는 해쉬를 중간에 넣어 pathname을 지정하는 건 보기에도 이상했고, 서버에서도 제대로 된 주소로 인식하지 않았다.

이에 따라 브라우저에서 제공하는 History API를 통해 주소를 변경하는 방식으로 바꾸게 되었고, 요즘의 SPA 라우터들은 이 API를 사용하고 있다고 한다.

History API의 경우 기존 `window.history` 객체를 그대로 활용하기 때문에 JavaScript를 활용해 *뒤로 가기, 앞으로 가기, 지정한 위치*로 가기 기능을 모두 구현할 수 있다.

히스토리 스택은 하나의 목록이고, *뒤로 가기와, 앞으로 가기*는 목록 내에서 이동하는 셈이다. 그래서 목록에 새 히스토리를 추가하면 페이지를 이동한 게 되는데, 이를 추가하기 위한 메소드가 바로 `pushState`다. 이를 활용하면 **페이지는 갱신되지 않았는데 주소만 바뀐 효과**를 누릴 수 있다! 이게 바로 SPA에서 필요한 기능이라는 걸 깨달았다. 하나의 페이지에서 머무르는 것처럼 사용자가 느끼지 않게 요청하는 컴포넌트를 라우팅 기능으로 보여주자.

## Vite로 보일러 플레이트 구성하기

Vite를 사용해 React-ts 환경을 구성

![명령어 콘솔창 입력](image.png)
