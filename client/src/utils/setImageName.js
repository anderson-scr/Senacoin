// Set the img name to return for the route to sabe the file
const setImageName = (img) => {
  const date = new Date().getTime() + (Math.random() | 0)
  const imgName = `${date}_${img}`

  return imgName
}

export default setImageName;