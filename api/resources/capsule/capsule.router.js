import { Router } from 'express'
import { fetchCapsules, fetchSingleCapsule, reportCapsule, searchCapsule } from './capsule.controller.js'
const capsuleRouter = Router()
// fetching capsules for home screen
capsuleRouter.get('/', async (req, res) => {
	const capsules = await fetchCapsules()
	if (capsules) {
		return res.status(200).json(capsules).end()
	}
	return res.status(400).end()
})

// fetching information about single learning capsule
capsuleRouter.get('/capsule/:id', async (req, res) => {
	const capsule = await fetchSingleCapsule(req.params.id)
	if (capsule) {
		return res.status(200).json(capsule).end()
	}
	return res.status(404).end()
})

// searchs in capsules using a search term
capsuleRouter.get('/search/:term', async (req, res) =>{
	const result = await searchCapsule(req.params.term)
	if(!result){
		res.status(404).json({ message: 'no match found' }).end()
	}
	res.status(200).json(result).end()
})

// reports a capsule
capsuleRouter.put('/capsule/report/:id', async (req, res) => {
	const status = await reportCapsule(req.params.id)
	if (status) {
		return res.status(202).json({ message: 'reported successfully' }).end()
	}
	return res.status(404).json({ message: 'some error occured' }).end()
})



export default capsuleRouter
