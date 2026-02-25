export async function fakeDelay(
  milliseconds: number = 1000,
): Promise<undefined> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
