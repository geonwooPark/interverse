# <span id='top'>INTERVERSE</span>

<img width="439" alt="스크린샷 2024-03-15 오후 5 47 08" src="https://github.com/Team94/interverse/assets/136573728/a1092c74-9626-4f8a-9641-c9b1bbce90db">

## 😎 서비스 소개 (누구나 간편하게 회의하고 면접하는 공간! 🖥)

코로나 시기 이후 구인구직 사이트를 통해 확인되는 채용 공고를 살펴보면, 많은 기업들이 면접을 비대면으로 진행하는 경향이 두드러지고 있습니다. 일반적으로 Zoom과 같은 화상 통화 서비스를 주로 활용하는데, 이러한 서비스는 회원가입 및 로그인과 같은 번거로운 절차를 포함하고 있습니다. 사용자들이 보다 간편하게 이용할 수 있는 서비스를 필요로 한다는 생각에, 메타버스를 활용하여 가상의 공간을 제공하고자 했습니다. INTERVERSE는 사용자들이 가상 세계에서 만나 상호작용하며 몰입감 있게 협업할 수 있는 공간으로, 새로운 경험과 재미를 제공하기 위해 노력하고 있습니다.

## 🚀 인터버스 체험하기

> 👨‍👦‍👦 <a href='https://www.interverse.kr'>Interverse </a>

## 🎮 조작법 및 안내서

### 🕹 조작법

- `방향키`를 이용하여 캐릭터를 움직일 수 있습니다.
- `SPACE`를 이용하여 상호작용이 가능합니다.
- `ESC`를 이용하여 상호작용을 종료 할 수 있습니다.
- `ENTER`를 이용하여 채팅창을 열 수 있습니다.

### 🗺 안내서

<img width="800" alt="안내서" src="https://github.com/Team94/interverse/assets/45960361/f8bc3d48-24f0-4dd5-b2a5-75cd19ea21de">

## 👾 아키텍처 및 주요 기능

- ### 아키텍처

<img width="800" alt="flow" src="https://github.com/Team94/interverse/assets/45960361/0dd8de40-a784-405b-ae09-dcb64023dfad">

- ### 물리 엔진

  - Phaser3를 이용한 오브젝트간의 충돌과 인터렉션 구현
  <div style="display: flex;">
  <img width="400" height="300" alt="gif" src="https://github.com/Team94/interverse/assets/45960361/2eeb78d3-de62-4458-83dc-c5c317d8a8a7">
  </div>

- ### 화상 통화
  - Peer-to-Peer(P2P) 연결을 설정하여 브라우저 간에 비디오, 오디오 스트림을 전송
  - Phaser3 플레이어-오브젝트 간의 인터렉션과 연동되어 동작하는 화상 통화
  <div style="display: flex; gap: 10px;">
  <img width="400" height="300" alt="스크린샷 2024-03-19 오후 5 10 29" src="https://github.com/Team94/interverse/assets/136573728/3aca18c7-958d-419b-bbf3-d09adb68980f">
  <img width="400" height="300" alt="스크린샷 2024-03-19 오후 5 10 39" src="https://github.com/Team94/interverse/assets/136573728/c87bfe62-d83f-4b8e-8125-9adb7a891f3a">
  </div>

<br/>

- ### 화면 공유
  - 발표자를 위한 Media Stream 공유 기능
  <div style="display: flex; gap: 10px;">
  <img width="400" height="300" alt="스크린샷 2024-03-19 오후 5 17 32" src="https://github.com/Team94/interverse/assets/136573728/a5130b9c-23f6-4915-bd3f-7721c2738550">
  <img width="400" height="300" alt="스크린샷 2024-03-19 오후 5 17 42" src="https://github.com/Team94/interverse/assets/136573728/dca73bdd-e9b4-49bb-90b6-28e63254e754">
  </div>

<br/>

- ### 실시간 채팅과 멀티플레이

  - Socket IO를 활용한 라이브 채팅 기능과 즉각적인 말풍선 메시지
  - Socket IO를 활용한 플레이어들의 실시간 상태 동기화

  <div style="display: flex; gap: 10px;">
  <img width="352" alt="스크린샷 2024-03-19 오후 5 20 24" src="https://github.com/Team94/interverse/assets/136573728/28bef718-57f8-4e08-b892-3488590784d3">
  <img width="448" alt="스크린샷 2024-03-19 오후 5 24 12" src="https://github.com/Team94/interverse/assets/136573728/8e40e6b5-3d9f-4cb5-9db9-e9b7bc1ce7f9">
  </div>

<br/>

- ### 게임 룸
  - URL을 활용한 다중 게임 룸 관리 및 공유
  - 게임에 재참여하거나 새로고침 발생 시 Cookie의 데이터를 바탕으로 자동 아바타 생성
    <div style="display: flex; flex-direction: column; gap: 10px;">
    <img width="800" alt="스크린샷 2024-03-19 오후 5 45 38" src="https://github.com/Team94/interverse/assets/45960361/69e09ae8-519f-48fe-9a44-ea9d36150c19">
    <img width="800" alt="스크린샷 2024-03-19 오후 7 32 37" src="https://github.com/Team94/interverse/assets/136573728/f90633d0-e4bc-4fb8-b994-8f95b7ac6086">
    </div>

<br/>

## ⚙️ 가이드라인

### 컨벤션 설립

![Husky](https://img.shields.io/badge/Husky-7B32C3?style=for-the-badge&logo=Husky&logoColor=white)
![ESlint](https://img.shields.io/badge/ESlint-4B32C3?style=for-the-badge&logo=ESlint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white)

### 협업 툴

![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-20232A?style=for-the-badge&logo=Notion&logoColor=white)

### 기술 스택

![Phaser](https://img.shields.io/badge/Phaser3-F7DF1E?style=for-the-badge&logo=phaser&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![RTK](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![TypeScript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white)
![Tailwind-CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=Tailwindcss&logoColor=white)
![SocketIO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketio&logoColor=white)
![PeerJS](https://img.shields.io/badge/PeerJS-3178C6?style=for-the-badge&logo=PeerJS&logoColor=white)

<br/>

## 🐶 팀원 소개

| <center>**박건우**</center>                                                        | <center>**강경서**</center>                                                          |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| <img src="https://avatars.githubusercontent.com/geonwooPark" height=180 width=180> | <img src="https://avatars.githubusercontent.com/kangkyeongseo" height=180 width=180> |
| <center>[🔗 GitHub](https://github.com/geonwooPark)</center>                       | <center>[🔗 GitHub](https://github.com/kangkyeongseo)</center>                       |

<br/>
