export const checkRelations = async () => {
  const relations = await (await fetch('/api/learner/my/relations')).json()
  return relations
}
