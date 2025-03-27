import GameScene from '@games/scenes/Game'
import * as mediasoupClient from 'mediasoup-client'

export class VideoManager {
  private game: GameScene
  private device: mediasoupClient.Device | null = null
  private sendTransport: mediasoupClient.types.Transport | null = null
  videoChatPlayers: Set<string> = new Set()

  constructor(game: GameScene) {
    this.game = game

    this.initialize()
  }

  private initialize() {
    this.game.ws.socket.on('serverRtpCapabilities', async (rtpCapabilities) => {
      console.log('🔹 서버 RTP Capabilities 수신:', rtpCapabilities)

      this.device = new mediasoupClient.Device()
      await this.device.load({ routerRtpCapabilities: rtpCapabilities })

      // 송신 Transport 요청
      this.game.ws.socket.emit('clientCreateSendTransport', this.game.roomNum)
    })

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
      },
    )
  }

  joinVideoRoom() {
    this.game.ws.socket.emit('clientJoinVideoRoom', this.game.roomNum)
  }
}
