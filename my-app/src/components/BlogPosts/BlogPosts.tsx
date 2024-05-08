import './BlogPosts.css'


type Props = {
    imageUrl: string
    description: string
}

const BlogPosts = ({description, imageUrl}: Props) => {
  return (
      <div className='blogpost'>
        <div className='blogImg' style={{ backgroundImage: `url(${imageUrl})` }}></div>
        <div className='description'>{description}</div>
      </div>
  )
}

export default BlogPosts