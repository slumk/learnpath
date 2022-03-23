import { useState } from 'react'

const reportCapsule = async (capsuleId, reason) => {
  const reportReason = {
    reportReason: reason
  }
  const isReported = await fetch('/api/capsules/capsule/report/' + capsuleId,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reportReason)
    })
  if (isReported.status === 202) {
    return true
  }
  return false
}

const ReportCapsule = ({ capsule, updateReportDialogueStatus, updateIconStatus }) => {
  const [reportReason, updateReason] = useState('')
  const arrayOfReasons = [
    'Fraudulent Content',
    'Title Mismatch',
    'Adult Content',
    'Violent or Repulsive Content',
    'Spam or Misleading'
  ]
  return (
      <div className="w-fit px-4 mx-auto h-fit bg-white fixed border-10 top-10 inset-x-40 rounded-3xl border-2 border-black overflow-scroll">
          <h1 className="p-3 font-medium text-center">Report {capsule.label}</h1>
          <h1 className="p-3 font-light">Please Select Reason From Below</h1>
      <form onSubmit={async (e) => {
        e.preventDefault()
        if (await reportCapsule(capsule._id, reportReason)) {
          updateIconStatus(false)
          return updateReportDialogueStatus(false)
        }
        return null
      }}>
              <div className="grid gap-2 p-2 pt-1 px-4">
              {
                  arrayOfReasons.map((reason) =>
                    (
                      <div className="flex gap-1" key={reason} >
                          <input type='radio' name="reason-for-reporting" value={reason}
                              onChange={ (e) => updateReason(e.target.value) }/>
                          <span className='font-extralight'>{reason}</span>
                        </div>
                    ))
                  }
                  <div className="flex justify-self-center gap-5 pt-2" >
            <button type='submit' className=' bg-red-200 px-3 py-1 rounded-full hover:bg-red-400'>
                          Report
                      </button>
                      <button className=' bg-green-200 hover:bg-green-400 rounded-full px-3 py-1'
                      onClick={(e) => updateReportDialogueStatus(false)}>
                          Close
                      </button>
                      </div>
                  </div>
          </form>
    </div>
  )
}
export default ReportCapsule
