export async function resToUintArr(response: Response):Promise<Uint8Array> {
  const resBinary = await response.arrayBuffer();
  const uInt8Array = new Uint8Array(resBinary);
  return uInt8Array;
}
