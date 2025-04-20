export default function fade(props?: { duration?: number }) {
  const duration = props?.duration || 0.3

  return {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration },
    },
    fadeOut: {
      initial: { opacity: 1 },
      animate: { opacity: 0 },
      transition: { duration },
    },
  }
}
