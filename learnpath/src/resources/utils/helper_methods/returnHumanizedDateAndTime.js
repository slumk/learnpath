export const returnHumanizedDateAndTime = (date) => {
  const inDate = new Date(date)
  return inDate.toDateString()
}
