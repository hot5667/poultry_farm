
# 🐔 양계장
## 👨‍👩‍👧‍👦 팀 소개

[내일배움캠프] 미(美)치기7조전

## 👨‍👩‍👧‍👦 팀원 소개

|   김도현   |      김태흔      |        임기철        |  박규리  |         유재희         |
| :--------: | :--------------: | :------------------: | :------: | :--------------------: |
|  **팀장**  |     **팀원**     |       **팀원**       | **팀원** |        **팀원**        |
| 회원가입, 로그인 | 디테일페이지 | 커뮤니티페이지 | 메인페이지 | 마이페이지 |


## 👨‍🏫 프로젝트 소개

## 집중력있게 챌린지를 끝낼 수 있도록 도와주며 자랑할 수 있는 웹사이트!
사용자가 설정한 디데이와 투두 리스트를 기반으로 챌린지를 상세하게 설정하고, 그 진행상황을 “알”로 시작해 점점 “닭”으로 키우는 과정을 보며 보다 재미있고 집중력 있게 챌린지를 끝낼 수 있는 사이트.

## 🚩 프로젝트 개요

- **프로젝트명** &nbsp; :&nbsp; **양계장**
- **진행 기간** &nbsp;: &nbsp; **24.10.10 ~ 24.10.18**

---

## 📚 STACKS

<div align=Left>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white">
<img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/git actions-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
<img src="https://img.shields.io/badge/VSCODE-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
<img src="https://img.shields.io/badge/VERCEL-007ACC?style=for-the-badge&logo=VERCEL&logoColor=white">
<img src="https://img.shields.io/badge/SLACK-green?style=for-the-badge&logo=SLACK&logoColor=white">
<img src="https://img.shields.io/badge/TailwindCss-06B6D4?style=for-the-badge&logo=java&logoColor=white">
</div>

---

## 설치 패키지

- 프로젝트 세팅 : npx create-next-app@latest
  - 실행 : yarn dev
- tanstack query 설치 : yarn add @tanstack/react-query @tanstack/react-query-devtools
- react-router-dom 설치 : yarn add react-router-dom

---

## ✔️ Code Convention

- 컴포넌트일 경우에만 .jsx확장자 사용
- customHook을 사용하는 경우 : use + 함수명
- Props의 경우: on (onClick 등등)
- 함수인 경우: handle (handleClick 등등)
- 주석 최대한 활용하기 : 해당 코드 제목, 설명 간단하게 적어놓기

## ✔️ Git Commit Convention

작업 타입 작업내용

- update : 해당 파일에 새로운 기능이 생김
- add : 없던 파일을 생성함, 초기 세팅
- bugfix : 버그 수정
- refactor : 코드 리팩토링
- fix : 코드 수정
- move : 파일 옮김/정리
- del : 기능/파일을 삭제
- test : 테스트 코드를 작성
- style : css
- gitfix : gitignore 수정

## 🗂️ 기능 설명

#### 메인 페이지
- 챌린지 추가
  : 챌린지 타이틀과 디데이를 입력하고, 수정은 디테일 페이지로 넘어가도록 구현.
- 타이머 작업
- 누적 집중시간 기록
  : 챌린지 별 누적 집중시간을 기록할 수 있도록 구현.
- 동기부여 랜덤글
  : 목데이터를 불러와 랜덤으로 동기부여 글이 보여지도록 구현. 


<img width="1151" alt="스크린샷 2024-10-17 오전 4 58 17" src="https://github.com/user-attachments/assets/fafb1003-0390-44b2-bb29-cadde84a5078">


#### 디테일 페이지
- 캘린더
  : 디데이 설정 날짜를 색으로 한눈에 보기 쉽게 표현.
- 챌린지 수정, 삭제
  : 내가 설정한 챌린지의 수정, 삭제 구현.

<img width="1154" alt="스크린샷 2024-10-17 오전 11 09 46" src="https://github.com/user-attachments/assets/c4e1d9e0-319d-4651-bd2e-cd9e0902cd8f">


---

#### 커뮤니티 페이지
-  챌린지 피드
  : 챌린지를 누구나 자유롭게 볼 수 있는 페에지.
- 댓글 CRUD
  : 댓글의 수정, 삭제 구현.
- 피드 검색
  : 제목으로 피드 검색 기능  구현
  

---

#### 마이 페이지
- 프로필 이미지
  : 프로필 이미지 수정 기능 구현.
- 닉네임 변경
  : 닉네임 수정 기능 구현.
- 내 챌린지 진행상황 보기
  : 챌린지 진행상황을 귀여운 아이콘과 함께 볼 수 있도록 구현.
  
<img width="1153" alt="스크린샷 2024-10-17 오전 11 10 12" src="https://github.com/user-attachments/assets/ddc780e5-404d-474a-8a59-4ab6932a47ec">
---

#### 회원가입 페이지
- 회원가입 페이지
  : 회원가입 구현.
<img width="1151" alt="스크린샷 2024-10-17 오전 11 11 01" src="https://github.com/user-attachments/assets/9180c051-246e-4565-88e5-818441d9344e">

---

#### 로그인 페이지
- 로그인 페이지
  : 로그인 구현.
<img width="1155" alt="스크린샷 2024-10-17 오전 11 10 45" src="https://github.com/user-attachments/assets/c8b4a9ee-fbf2-417e-b7a2-ba28dcf7fc96">

---

## 💥 Trouble Shooting
<h3> vercel에 배포할때에 배포가 되지 않는 다양한 오류를 만남. </h3>

- 로컬스토리지 접근 문제
: 배포 환경에서 클라이언트 측 스토리지 접근 시 발생한 오류는 useEffect를 사용하여 해결하였습니다.

- ESLint 설정 문제
: ESLint 설정은 문법 오류와 잠재적인 버그를 찾는 데 도움을 줍니다. 따라서 ESLint 규칙을 무시하거나 강제로 끄지 않는 것이 좋습니다. 올바른 규칙을 설정하고 팀에서 공유하여 코드의 품질을 높이는 방향이 중요합니다.

- any 타입 사용 문제
 : any 타입은 타입 안정성을 저해하고 런타임 오류의 가능성을 높입니다. 대신 명확한 타입을 사용하는 것이 좋으며, 이를 통해 타입스크립트의 이점을 최대한 활용할 수 있습니다.


