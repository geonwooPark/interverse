import GameScene from '@games/scenes/Game'
import * as mediasoupClient from 'mediasoup-client'
import { Observable } from './Observable'

export class VideoManager extends Observable<MediaStreamTrack[]> {
  private game: GameScene
  private device: mediasoupClient.Device = new mediasoupClient.Device()
  private sendTransport: mediasoupClient.types.Transport | null = null
  private recvTransport: mediasoupClient.types.Transport | null = null
  // tracks: Map<string, MediaStreamTrack[]> = new Map()
  tracks: MediaStreamTrack[] = []

  constructor(game: GameScene) {
    super()

    this.game = game

    this.initialize()
  }

  getState() {
    return this.tracks
  }

  private initialize() {
    this.game.ws.socket.once(
      'serverRtpCapabilities',
      async (rtpCapabilities) => {
        this.device
          .load({ routerRtpCapabilities: rtpCapabilities })
          .then(() => {
            console.log('Device loaded successfully')

            // 송신 Transport 요청
            this.game.ws.socket.emit(
              'clientCreateSendTransport',
              this.game.roomNum,
            )
          })
          .catch((error) => {
            console.error('Error loading device:', error)
          })
      },
    )

    // 송신 Transport 생성
    this.game.ws.socket.on(
      'serverSendTransportCreated',
      async ({ id, iceParameters, iceCandidates, dtlsParameters }) => {
        if (!this.device) return

        this.sendTransport = this.device.createSendTransport({
          id,
          iceParameters,
          iceCandidates,
          dtlsParameters,
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
        })

        this.sendTransport.on('connect', ({ dtlsParameters }, callback) => {
          this.game.ws.socket.emit('clientConnectTransport', {
            roomNum: this.game.roomNum,
            dtlsParameters,
          })
          callback()
        })

        this.sendTransport.on(
          'produce',
          async ({ kind, rtpParameters }, callback) => {
            this.game.ws.socket.emit('clientProduce', {
              roomNum: this.game.roomNum,
              kind,
              rtpCapabilities: this.device.rtpCapabilities,
              rtpParameters,
            })
            this.game.ws.socket.once('serverProduced', ({ id }) => {
              callback({ id })
            })
          },
        )

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })
        const track = stream.getVideoTracks()[0]

        await this.sendTransport.produce({ track })

        // 수신 트랜스포트 생성 요청
        this.game.ws.socket.emit('clientCreateRecvTransport', this.game.roomNum)
      },
    )

    this.game.ws.socket.on(
      'serverRecvTransportCreated',
      async ({ id, iceParameters, iceCandidates, dtlsParameters }) => {
        if (!this.device) return
        if (!this.sendTransport) return

        // recvTransport 생성
        this.recvTransport = this.device.createRecvTransport({
          id,
          iceParameters,
          iceCandidates,
          dtlsParameters,
        })

        // 기존 프로듀서 목록 요청
        this.game.ws.socket.emit('clientRequestProducers', {
          roomNum: this.game.roomNum,
          rtpCapabilities: this.device.rtpCapabilities,
        })

        // consumerTransport의 consume 메서드가 호출될 때 connect 이벤트가 emit 됨
        this.recvTransport.on('connect', ({ dtlsParameters }, callback) => {
          this.game.ws.socket.emit('clientConnectRecvTransport', {
            roomNum: this.game.roomNum,
            dtlsParameters,
          })

          callback()
        })
      },
    )

    // 기존 플레이어 목록 수신
    this.game.ws.socket.on('serverExistingProducers', async (users) => {
      if (users.length === 0) return

      for (const user of users) {
        if (!user.consumerId) continue

        await this.consumeTrack(
          user.producerId,
          user.consumerId,
          user.kind,
          user.rtpParameters,
        )
      }
    })

    // 새로 추가된 플레이어 수신
    this.game.ws.socket.on('serverNewProducer', async (newUser) => {
      await this.consumeTrack(
        newUser.producerId,
        newUser.consumerId,
        newUser.kind,
        newUser.rtpParameters,
      )
    })
  }

  private async consumeTrack(
    producerId: string,
    consumerId: string,
    kind: mediasoupClient.types.MediaKind,
    rtpParameters: mediasoupClient.types.RtpParameters,
  ) {
    if (!this.recvTransport) return

    try {
      const consumer = await this.recvTransport.consume({
        producerId,
        id: consumerId,
        kind,
        rtpParameters,
      })

      this.game.ws.socket.emit('clientResumeConsumer', {
        roomNum: this.game.roomNum,
        consumerId,
      })

      const { track } = consumer

      this.tracks = [...this.tracks, track]

      this.notify(this.tracks)

      track.onended = () => {
        this.tracks = this.tracks.filter((t) => t !== track)
        this.notify(this.tracks)
      }
    } catch (error) {
      console.error('❌ consumeTrack 에러:', error)
    }
  }

  joinVideoRoom() {
    this.game.ws.socket.emit('clientJoinVideoRoom', this.game.roomNum)
  }

  leaveVideoRoom() {
    this.game.ws.socket.emit('clientLeaveVideoRoom', this.game.roomNum)
  }
}
