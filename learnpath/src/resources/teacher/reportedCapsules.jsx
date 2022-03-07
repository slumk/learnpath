import { useEffect, useState } from 'react'
import { fetchReportedCapsules } from './fetchReportedCapsules'
import MyCapsuleGrid from './myCapsuleGrid'

const ReportedCapsules = () => {
  const [reportedCapsules, updateReportedCapsules] = useState([])
  useEffect(async () => {
    const reportedShits = await fetchReportedCapsules()
    if (reportedShits) {
      return updateReportedCapsules(reportedShits)
    }
    return null
  }, [])
  return (
      <div className="w-100">
      <hr />
      <h1 className="text-2xl font-bold text-center py-5">Reported Capsules</h1>
      <div className={`${(reportedCapsules.toString()) ? null : 'hidden'} p-5`}>
        {reportedCapsules.map((capsule) => (<MyCapsuleGrid key={capsule._id} capsule={capsule} isReportedCapsules={ true }/>)) }
      </div>
      <div className='p-1'>
        {!(reportedCapsules.toString())
          ? <h1 className='text-center text-2xl font-medium italic'>No Reported Capsules</h1>
          : null }
      </div>
      </div>
  )
}

export default ReportedCapsules
