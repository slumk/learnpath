export const fetchCapsuleInfo = async (capsuleId) => {
  let info = await fetch('/api/capsules/capsule/' + capsuleId)
  if (await info.status === 200) {
    info = await info.json()
    // console.log(info.data)
  } else if (await info.status === 404) {
    // console.log('sucked')
  }
}
