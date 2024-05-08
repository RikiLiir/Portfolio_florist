import './BlogPages.css'


type Props = {
    heroUrl: string
}

const BlogPages = ({heroUrl}: Props) => {
  return (
      <div className='Hero'>
        <div className='Heroimg' style={{ backgroundImage: `url(${heroUrl})` }}></div>
      </div>
  )
}

export default BlogPages