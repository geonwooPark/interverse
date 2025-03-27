export const requestMediaPermissions = async () => {
  try {
    // 카메라와 마이크 권한을 요청
    await navigator.permissions.query({ name: 'camera' })
    await navigator.permissions.query({ name: 'microphone' })
  } catch (error) {
    console.error('권한 요청 실패:', error)
  }
}
