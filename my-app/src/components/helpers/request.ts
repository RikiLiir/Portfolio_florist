const requestUpload = async (
  url: string,
  options: RequestInit
) => {
  try {
    return await fetch(
      `http://localhost:4000${url}`,
      {
        method: options.method,
        headers: {
          authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
          
        },
        body: options.body
      }
    )
      .then((response: Response) => {
         
          return response.json()
        
      }).then((response) => {
        return response
      })
  } catch(error) {
    console.error(error)
  }
}

export default requestUpload