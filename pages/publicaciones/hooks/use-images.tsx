export const useImages = ({ publication }) => {
  const images: {url:string, name:string}[] = []
  publication?.img?.url !== undefined && images.push({ url: publication?.img?.url || '', name: publication?.img?.name || '' })
  publication?.img2?.url !== undefined && images.push({ url: publication?.img2?.url || '', name: publication?.img2?.name || '' })
  publication?.img3?.url !== undefined && images.push({ url: publication?.img3?.url || '', name: publication?.img3?.name || '' })
  publication?.img4?.url !== undefined && images.push({ url: publication?.img4?.url || '', name: publication?.img4?.name || '' })
  publication?.img5?.url !== undefined && images.push({ url: publication?.img5?.url || '', name: publication?.img5?.name || '' })
  publication?.img6?.url !== undefined && images.push({ url: publication?.img6?.url || '', name: publication?.img6?.name || '' })
  publication?.img7?.url !== undefined && images.push({ url: publication?.img7?.url || '', name: publication?.img7?.name || '' })
  return { images }
}
