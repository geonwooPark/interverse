import { Socket } from 'socket.io'
import { ClientToServerEvents, ServerToClientEvents } from '../../types/socket'
import * as mediasoup from 'mediasoup'
import { Worker, Router } from 'mediasoup/node/lib/types'
import { room } from '..'

let worker: Worker
let router: Router

const createWorkerAndRouter = async () => {
  if (!worker) {
    worker = await mediasoup.createWorker({
      rtcMinPort: 2000,
      rtcMaxPort: 2100,
    })
  }

  if (!router) {
    router = await worker.createRouter({
      mediaCodecs: [
        {
          kind: 'audio',
          mimeType: 'audio/opus',
          clockRate: 48000,
          channels: 2,
        },
        {
          kind: 'video',
          mimeType: 'video/VP8',
          clockRate: 90000,
          parameters: {
            'x-google-start-bitrate': 1000,
          },
        },
      ],
    })
  }
}

// 서버 시작 시 worker & router 생성
;(async () => {
  await createWorkerAndRouter()
})()

export const videoRoomHandler = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  io: any,
) => {
  // 비디오룸 참여 - 클라이언트에게 어떤 오디오 / 비디오 코덱을 지원하는지에 대한 정보를 전송
  const joinVideoRoom = async (roomNum: string) => {
    console.log(`User ${socket.id} joined video room: ${roomNum}`)

    if (!router) {
      console.error('Router is not initialized yet')
      return
    }

    socket.emit('serverRtpCapabilities', router.rtpCapabilities)
  }

  // 송신 Transport 생성
  const createSendTransport = async (roomNum: string) => {
    const transport = await router.createWebRtcTransport({
      listenIps: [{ ip: '0.0.0.0', announcedIp: 'your-public-ip' }],
      enableUdp: true,
      enableTcp: true,
    })

    // Transport 저장
    room[roomNum].video.set(socket.id, transport)

    // Transport 연결 이벤트
    transport.on('dtlsstatechange', (state) => {
      if (state === 'closed') {
        room[roomNum].video.delete(socket.id)
      }
    })

    socket.emit('serverSendTransportCreated', {
      id: transport.id,
      iceParameters: transport.iceParameters,
      iceCandidates: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters,
    })
  }

  // 송신 Transport 연결
  const connectTransport = async ({ roomNum, dtlsParameters }: any) => {
    const transport = room[roomNum].video.get(socket.id)

    if (!transport) return
    await transport.connect({ dtlsParameters })
  }

  // 송신 프로듀서 생성
  const produce = async ({ roomNum, kind, rtpParameters }: any) => {
    const transport = room[roomNum].video.get(socket.id)

    if (!transport) return

    const producer = await transport.produce({ kind, rtpParameters })
    socket.emit('serverProduced', { id: producer.id })
  }

  // 비디오룸 퇴장
  const leaveVideoRoom = (roomNum: string) => {
    console.log(`User ${socket.id} left video room: ${roomNum}`)

    if (room[roomNum].video.has(socket.id)) {
      room[roomNum].video.get(socket.id)?.close()
      room[roomNum].video.delete(socket.id)
    }
  }

  socket.on('clientJoinVideoRoom', joinVideoRoom)
  socket.on('clientCreateSendTransport', createSendTransport)
  socket.on('clientConnectTransport', connectTransport)
  socket.on('clientProduce', produce)
  socket.on('clientLeaveVideoRoom', leaveVideoRoom)
}
