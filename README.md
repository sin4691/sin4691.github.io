# 신재윤 포트폴리오 사이트

Unity/C# 기반 게임 클라이언트 개발자 신재윤님의 포트폴리오 웹사이트입니다.
순수 HTML/CSS/JS로 만들어져 있어 별도 빌드 없이 바로 GitHub Pages에 올릴 수 있습니다.

## 폴더 구성

```
portfolio/
├── index.html   # 페이지 본문
├── style.css    # 디자인
├── script.js    # 모바일 메뉴, 스크롤 애니메이션
├── assets/      # 프로젝트 스크린샷 넣는 곳 (지금은 비어있음)
└── README.md    # 이 파일
```

## 1. GitHub Pages로 배포하는 방법 (가장 쉬운 방법)

### 방법 A. 계정 대표 페이지로 배포 (`sin4691.github.io`)

1. GitHub에서 **새 저장소(New repository)**를 만듭니다.
   - 저장소 이름을 정확히 `sin4691.github.io` 로 입력 (본인 GitHub 아이디와 동일해야 함)
   - Public으로 생성
2. 이 폴더(`index.html`, `style.css`, `script.js`, `assets/`) 안의 내용을 그 저장소에 업로드합니다.
   - GitHub 웹사이트에서 "Add file → Upload files"로 드래그해서 올려도 되고,
   - 아래처럼 git 명령어로 올려도 됩니다.

```bash
cd portfolio
git init
git add .
git commit -m "포트폴리오 사이트 첫 배포"
git branch -M main
git remote add origin https://github.com/sin4691/sin4691.github.io.git
git push -u origin main
```

3. 몇 분 후 `https://sin4691.github.io` 접속하면 사이트가 보입니다.
   (저장소 Settings → Pages에서 배포 상태를 확인할 수 있습니다.)

### 방법 B. 특정 프로젝트 저장소의 하위 페이지로 배포

계정 페이지 대신 별도 저장소(예: `portfolio`)를 만들고, 저장소 Settings → Pages에서
Branch를 `main` (또는 `gh-pages`), 폴더를 `/ (root)`로 지정하면
`https://sin4691.github.io/저장소이름/` 주소로 배포됩니다.

## 2. 나중에 스크린샷 추가하는 방법

`assets/` 폴더에 이미지를 넣고 (예: `back-together.jpg`),
`index.html`에서 해당 프로젝트의 `<span class="thumb-placeholder">...</span>` 부분을
`<img src="assets/back-together.jpg" alt="...">`로 바꿔주세요.
자세한 안내는 `assets/README.txt` 참고.

## 3. 내용 수정하기

- 소개/스킬 문구: `index.html`의 `#about` 섹션
- 프로젝트 설명/링크: `index.html`의 `#projects` 섹션 (`<article class="project-card">` 단위)
- 이메일/연락처: `index.html`의 `#contact` 섹션
- 색상/디자인: `style.css` 상단 `:root { --accent: ... }` 부분에서 컬러 변경 가능

## 4. 로컬에서 미리보기

별도 서버 없이 `index.html` 파일을 브라우저로 더블클릭해서 열어도 대부분 잘 보입니다.
(폰트는 인터넷 연결이 있어야 Google Fonts에서 불러와집니다.)
