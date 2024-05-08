import './UploadBlogPost.css'
import requestUpload from '../helpers/request'
import { Post } from '../../pages/Page'

type Props = {
  postList: Post[]
  setPostList: React.SetStateAction<any>
}

const UploadBlogPost = ({postList, setPostList}: Props) => {
  const submitUpload = () => {
    const file = document.getElementById('file') as HTMLInputElement
    const name = document.getElementById('name') as HTMLInputElement
    const category = document.getElementById('category') as HTMLInputElement
    const description = document.getElementById('description') as HTMLInputElement
    const formData = new FormData()

    if (file?.files && name?.value && description?.value && category?.value) {
      formData.append('file', file.files[0])
      formData.append('name', name.value)
      formData.append('type', category.value)
      formData.append('description', description.value)
      requestUpload('/upload', {
        method: 'POST',
        body: formData
      }).then((res) => {
        if (res) {
          setPostList([res, ...postList])
        }
      })
    }
  }
  return (
    <div className='grid'>
      <div className='row spacing'>
        <div className='cell'><input id='file' type='file' name='file' /></div>
        <div className='cell'>
          <div className='grid spacing'>
            <div className='row'>
              <div className='cell'>
                <input type='text' id='name' name='name' placeholder='Sisesta pealkiri' />
              </div>
            </div>
            <div className='row'>
              <div className='cell'>
                <select name="cars" id="category">
                  <option value="Pulmatööd">Pulmatööd</option>
                  <option value="Leinatööd">Leinatööd</option>
                  <option value="ruumidekoratsioonid">ruumidekoratsioonid</option>
                  <option value="lillekimbud">lillekimbud</option>
                  <option value="seadedplastvahus">seaded plastvahus</option>
                </select>
              </div>
            </div>
            <div className='row'>
              <div className='cell'>
                <textarea className='description' id='description' name='description' placeholder='Sisesta kirjeldus' />
              </div>
            </div>
            <div className='row'>
              <div className='cell'>
                <button onClick={submitUpload} type='button'>Lae ülesse</button>
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* <div className='row'>
          <div className='cell'>
            <button onClick={submitUpload} type='button'>Lae ülesse</button>
          </div>
        </div> */}
    </div>
  )
}

export default UploadBlogPost