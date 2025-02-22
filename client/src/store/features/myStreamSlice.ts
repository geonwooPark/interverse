import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PeerStreamType } from '../../../../types/client'

interface StreamType {
  myStream: PeerStreamType
  currentStream: PeerStreamType
  peerStreams: PeerStreamType[]
  isScreenSharing: boolean
  controller: {
    video: boolean
    audio: boolean
  }
}

const initStream = {
  peerId: '',
  socketId: '',
  nickname: '',
  stream: null,
  isVideoEnabled: false,
  texture: '',
}

const initialState: StreamType = {
  myStream: initStream,
  currentStream: initStream,
  peerStreams: [],
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
    setCurrentStream: (state, action: PayloadAction<PeerStreamType>) => {
      state.currentStream = action.payload
    },
    addPeerStream: (state, action: PayloadAction<PeerStreamType>) => {
      state.peerStreams = [...state.peerStreams, action.payload]
    },
    deletePeerStream: (state, action: PayloadAction<string>) => {
      state.peerStreams = state.peerStreams.filter(
        (r) => r.socketId !== action.payload,
      )
    },
    updatePeerStreamVideo: (
      state,
      action: PayloadAction<{ socketId: string; isVideoEnabled: boolean }>,
    ) => {
      state.peerStreams = state.peerStreams.map((stream) => {
        if (stream.socketId === action.payload.socketId) {
          return { ...stream, isVideoEnabled: action.payload.isVideoEnabled }
        }
        return stream
      })
    },
    updatePeerStreamSound: (state, action: PayloadAction<string>) => {
      state.peerStreams = state.peerStreams.map((stream) => {
        if (stream.peerId === action.payload) {
          return { ...stream, sound: !stream.sound }
        }
        return stream
      })
    },
    controlVideoStream: (state) => {
      state.controller = {
        ...state.controller,
        video: !state.controller.video,
      }

      state.myStream = {
        ...state.myStream,
        isVideoEnabled: !state.myStream.isVideoEnabled,
      }

      if (state.myStream.peerId === state.currentStream.peerId) {
        state.currentStream = {
          ...state.currentStream,
          isVideoEnabled: !state.currentStream.isVideoEnabled,
        }
      }
    },
    controlAudioStream: (state) => {
      state.controller = {
        ...state.controller,
        audio: !state.controller.audio,
      }
    },
    stopStream: (state) => {
      state.myStream.stream?.getTracks().forEach((track) => track.stop())
      state.peerStreams = []
      state.myStream = initStream
      state.currentStream = initStream
      state.isScreenSharing = false
    },
    handleScreenSharing: (state, action: PayloadAction<boolean>) => {
      state.isScreenSharing = action.payload
    },
    handleAudio: (state) => {
      if (!state.myStream.stream) return
      const audioTrack = state.myStream.stream.getAudioTracks()[0]
      audioTrack.enabled = audioTrack.enabled ? false : true
    },
    handleVideo: (state) => {
      if (!state.myStream.stream) return
      const videoTrack = state.myStream.stream.getVideoTracks()[0]
      videoTrack.enabled = videoTrack.enabled ? false : true
    },
  },
})

export const {
  setMyStream,
  setCurrentStream,
  addPeerStream,
  deletePeerStream,
  updatePeerStreamVideo,
  updatePeerStreamSound,
  stopStream,
  controlVideoStream,
  controlAudioStream,
  handleScreenSharing,
  handleAudio,
  handleVideo,
} = MyStreamSlice.actions
