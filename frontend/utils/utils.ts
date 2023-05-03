export const generateCloudinarySRCSETURLs = (url: string): string[] => {
  const URLs: string[] = [];
  const sizes = [
    ['thumbnail_', '100w'],
    ['small_', '350w'],
    ['medium_', '515w'],
    ['large_', '700w'],
    ['', '1015w'],
  ];

  sizes.forEach(size => {
    URLs.push(`${url.substring(0, url.lastIndexOf('/'))}/${size[0]}${url.substring(url.lastIndexOf('/') + 1)} ${size[1]}`)
  })

  return URLs;
}
