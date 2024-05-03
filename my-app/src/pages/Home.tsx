import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useNavigate, useNavigation, useRoutes } from "react-router-dom";
import requestJson from "../components/helpers/requestJson";
import requestUpload from "../components/helpers/request";

type Props = {
  isAuthenticated: boolean
}

const Home = ({
  isAuthenticated
}: Props) => {
  const [list, setList] = useState<string[]>([])
  const navigate = useNavigate()

  const onClickLogin = () => {
    navigate('/login')
  }
  const submitUpload = () => {
    const file = document.getElementById('file') as HTMLInputElement
    const formData = new FormData()

    if (file?.files) {
      formData.append('file', file.files[0])
      requestUpload('/upload', {
        method: 'POST',
        body: formData
      })
    }
  }

  return(
    <>
      {!!isAuthenticated ? (
        <form>
          <input id='file' type='file' name='file' />
          <button onClick={submitUpload} type='button'>Upload</button>
        </form>
      ) : (
        <button type='button' onClick={onClickLogin}>Login</button>
      )}
{/* 
      {list.map((item) => (
        <p key={item}>{item}</p>
      ))} */}
    </>
  );
}
export default Home
