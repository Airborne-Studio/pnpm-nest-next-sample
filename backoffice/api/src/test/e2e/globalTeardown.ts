const globalTeardown = async () => {
  await globalThis.__APP__.close();
};

export default globalTeardown;
