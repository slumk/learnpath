import { useContext, useEffect, useState } from 'react'
import { commentCapsule } from '../learner/commentCapsule'
import userIcon from '../../icons/commentUser.png'
import { returnHumanizedDateAndTime } from '../mod/pendingGrid'
import reportIcon from '../../icons/report.png'
import commentIcon from '../../icons/comment.png'
import { AuthContext } from '../../App'

const Comments = ({ comments, capsule, refresh }) => {
  const { auth } = useContext(AuthContext)
  const [commentText, updateText] = useState('')
  const [areCommentsHere, updateCommentsThere] = useState(false)
  useEffect(() => {
    const divElement = document.getElementById('comment')
    divElement.scrollIntoView({ behavior: 'smooth' })
    if (comments.toString()) {
      updateCommentsThere(true)
    }
  }, [comments])
  return (
    <div className="grid pt-3" id="comment">
      <form onSubmit={(e) => {
        e.preventDefault()
        if (commentCapsule(capsule, commentText)) {
          refresh(true)
          return updateText('')
        }
        return null
      }}
      className={`${auth.isLoggedin ? null : 'hidden'}`}>
        <input type="text" value={commentText} className="p-1 w-full placeholder:italic rounded-xl border-2 border-black" placeholder="Type Your Comment"
        onChange={(e) => updateText(e.target.value)}/>
      </form>
      <div className='grid gap-1 pt-2'>
        {areCommentsHere
          ? comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))
          : <span className='text-center py-2 text-3xl font-mono'>No Comments</span>}
      </div>
      </div>
  )
}

const Comment = ({ comment }) => {
  const [isReported, toggleReportStatus] = useState(false)
  return (
    <div className='rounded-xl bg-red-200'>
      <div className='grid py-1 px-0.5'>
        <div className='flex'>
        <img src={userIcon} width='20px'/>
          <span className='text-sm self-center font-mono'>{comment.learner_id.name}</span>
        </div>
        <div className='grid'>
          <div className='flex gap-0.5 px-2'>
            <img src={ commentIcon } width='30px'/>
            <span className='font-serif self-center'>{comment.comment_text}</span>
        </div>
        <div className='flex gap-0.5 px-2 py-0.5 place-self-end'>
        <span className='italic self-center text-xs text-gray-600'>
          {returnHumanizedDateAndTime(comment.commented_date)}
        </span>
          <button className={`${isReported ? 'hidden' : null}`}>
            <img src={reportIcon} className='my-auto'/>
        </button>
          </div>
          </div>
      </div>
    </div>
  )
}

export default Comments
