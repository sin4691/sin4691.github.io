# 신재윤 포트폴리오 사이트

Unity/C# 기반 게임 클라이언트 개발자 신재윤님의 포트폴리오 웹사이트입니다.
순수 HTML/CSS/JS로 만들어져 있어 별도 빌드 없이 바로 GitHub Pages에 올릴 수 있습니다.

## 폴더 구성

```
sin4691.github.io/
├── index.html   # 페이지 본문
├── style.css    # 디자인
├── script.js    # 모바일 메뉴, 스크롤 애니메이션, 링크/영상/이미지 자동 채우기
├── config.js    # 링크·유튜브 ID·교육 줄을 넣는 곳 (여기만 고치면 됨)
├── assets/      # 스크린샷·배너를 넣는 곳 (파일 이름 규칙은 assets/README.txt)
└── README.md    # 이 파일
```

## 1. GitHub Pages로 배포하는 방법 (가장 쉬운 방법)

### 방법 A. 계정 대표 페이지로 배포 (`sin4691.github.io`)

> 이미 `sin4691/sin4691.github.io` 저장소가 있으므로 새로 만들 필요 없이, 이 폴더의 파일로 **기존 파일을 덮어쓰기**만 하면 됩니다. (`config.js` 는 새 파일이니 함께 올리세요.)

1. GitHub에서 **새 저장소(New repository)**를 만듭니다.
   - 저장소 이름을 정확히 `sin4691.github.io` 로 입력 (본인 GitHub 아이디와 동일해야 함)
   - Public으로 생성
2. 이 폴더(`index.html`, `style.css`, `script.js`, `config.js`, `assets/`) 안의 내용을 그 저장소에 업로드합니다.
   - GitHub 웹사이트에서 "Add file → Upload files"로 드래그해서 올려도 되고,
   - 아래처럼 git 명령어로 올려도 됩니다.

```bash
cd sin4691.github.io
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

## 2. 스크린샷·영상·링크 추가하는 방법 (index.html 을 고칠 필요 없음)

- 이미지: `assets/` 폴더에 정해진 이름(`B1.png`, `factory.jpg` 등)으로 넣으면 자동으로 나타납니다. 이름 규칙은 `assets/README.txt`.
- 유튜브: `config.js` 의 `videos` 에 영상 ID 만 적으면 해당 프로젝트 개요 아래에 플레이어가 생깁니다.
- 링크(PDF, YouTube, Steam, 모바일 공장 저장소, APK): `config.js` 의 `links` 에 주소를 적으면 버튼/링크가 나타납니다.
- 값을 비워 두면 그 요소는 사이트에 보이지 않습니다. 빈 자리나 죽은 링크가 노출되지 않습니다.

## 3. 내용 수정하기

- 소개 문구: `index.html` 맨 위 `.intro`, 기술: `#skills` 섹션
- 프로젝트 설명/링크: `index.html`의 `#factory`, `#back-together`, `#under-hall`, `#deadline` 섹션 (`<article class="project">` 단위). 프로젝트 순서를 바꾸려면 이 article 블록과 상단 목록(`#projects`), 위쪽 메뉴의 순서를 함께 옮기면 됩니다
- 이메일/연락처: `index.html`의 `#contact` 섹션
- 에셋 크레딧 표: `index.html`의 `#credits` 섹션
- 색상/디자인: `style.css` 상단 `:root` 의 변수(`--accent` 등)에서 바꿀 수 있고, 어두운 화면 설정을 쓰는 방문자에게는 자동으로 다크 색이 적용됩니다
- 글꼴은 Pretendard(CDN)이고, 인쇄/PDF 저장 시에는 메뉴·영상이 빠진 인쇄용 스타일이 적용됩니다

## 4. 로컬에서 미리보기

별도 서버 없이 `index.html` 파일을 브라우저로 더블클릭해서 열어도 대부분 잘 보입니다.
(폰트는 인터넷 연결이 있어야 Google Fonts에서 불러와집니다.)
