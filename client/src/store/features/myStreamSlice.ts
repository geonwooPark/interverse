import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PeerStreamType } from '../../types/client'

interface StreamType {
  myStream: PeerStreamType
  isScreenSharing: boolean
  controller: {
    video: boolean
    audio: boolean
  }
}

const initialState: StreamType = {
  myStream: {
    peerId: '',
    socketId: '',
    nickName: '',
    stream: null,
    isVideoEnabled: false,
    texture: '',
  },
  isScreenSharing: false,
  controller: {
    video: false, // 내 화면 조정
    audio: false,
  },
}

export const MyStreamSlice = createSlice({
  // store의 이름
  name: 'my-stream',
  // 초기값
  initialState,
  // 처리하고자 하는 메서드
  reducers: {
    setMyStream: (state, action: PayloadAction<PeerStreamType>) => {
      state.myStream = action.payload
    },
    controlStream: (state, action: PayloadAction<'video' | 'audio'>) => {
      if (action.payload === 'video') {
        state.controller = {
          ...state.controller,
          video: !state.controller.video,
        }

        state.myStream = {
          ...state.myStream,
          isVideoEnabled: !state.myStream.isVideoEnabled,
        }
      }
      if (action.payload === 'audio') {
        state.controller = {
          ...state.controller,
          audio: !state.controller.audio,
        }
      }
    },
    stopStream: (state) => {
      state.myStream.stream?.getTracks().forEach((track) => track.stop())
    },
    handleScreenSharing: (state, action: PayloadAction<boolean>) => {
      state.isScreenSharing = action.payload
    },
    handleAudio: (state) => {
      if (!state.myStream.stream) return
      const audioTrack = state.myStream.stream.getAudioTracks()[0]
      if (audioTrack.enabled) {
        audioTrack.enabled = false
      } else {
        audioTrack.enabled = true
      }
    },
    handleVideo: (state) => {
      if (!state.myStream.stream) return
      const videoTrack = state.myStream.stream.getVideoTracks()[0]
      if (videoTrack.enabled) {
        videoTrack.enabled = false
      } else {
        videoTrack.enabled = true
      }
    },
  },
})

export const {
  setMyStream,
  stopStream,
  controlStream,
  handleScreenSharing,
  handleAudio,
  handleVideo,
} = MyStreamSlice.actions
