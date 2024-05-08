import { useNavigate } from 'react-router-dom'
import './CategoryTile.css'

type Props = {
    name: string,
    imageUrl: string
}

const CategoryTile = ({name, imageUrl}: Props) => {
  const navigate = useNavigate()
  return (
    <span className='tile' onClick={() => {navigate(`/${name}`)}}>
      <div className='tileRow'>
        <div className='imageCell' style={{ backgroundImage: `url(${imageUrl})` }}></div>
        <div className='textCell'>{name}</div>
      </div>
    </span>
  )
}

export default CategoryTile