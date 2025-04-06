export const requestMediaPermissions =
  async (): Promise<MediaStream | null> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      stream.getTracks().forEach((track) => track.stop())

      return stream
    } catch (error) {
      console.error('미디어 권한 요청 실패:', error)
      return null
    }
  }
