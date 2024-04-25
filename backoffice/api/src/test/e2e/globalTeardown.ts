
const globalTeardown = async () => {
  if (globalThis.__APP__) {
      await globalThis.__APP__.close().catch(e => console.error('Error during app shutdown:', e));
  }
};

export default globalTeardown;
