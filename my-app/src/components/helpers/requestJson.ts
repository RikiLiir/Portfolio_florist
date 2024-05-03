const requestJson = async (
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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options?.body) ?? ''
      }
    )
      .then((response: Response) => {
        if (response.status === 200) {
          return response.json()
        }
      }).then((response) => {
        return response
      })
  } catch(error) {
    console.error(error)
  }
}

export default requestJson