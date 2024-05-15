import React, {useEffect, useState,} from "react";
import UploadBlogPost from "../components/UploadBlogPost/UploadBlogPost";
import request from "../components/helpers/request";
import "./Page.css";
import { url } from "inspector";

type Props = {
    isAuthenticated: boolean
    heroImage: string
    typeName: string
}

export type Post = {name: string, description: string, image: string}

const Page = ({
    isAuthenticated,
    heroImage,
    typeName
}: Props) => {
  const [postList, setPostList] = useState<Post[]>([])

  useEffect(() => {
    const getPosts = async () => await request(`/posts?type=${typeName}`, { method: 'GET' })
    getPosts().then((res) => {
      if (res?.posts) setPostList(res?.posts)
    })
  }, [])

  let rtl = true

  return (
    <div className="container">
      <div className="grid">
        <div className="row">
          <div className="cell"> 
            <div className="herocontainer" style={{ backgroundImage: `url(${heroImage})`}}></div>
          </div>
        </div>
        {!!isAuthenticated ? ( 
          <div className="row">
            <div className="cell center padding">
              <UploadBlogPost postList={postList} setPostList={setPostList} />
            </div>
          </div>
        ) : <></>}

        {postList?.map((post) => {
          rtl = !rtl
          return (
            <>
              {!!rtl ? (
                <div className="row">
                  <div className="cell">
                    <img style={{ width: '100%' }} src={`http://localhost:4000/image/${post.image}`} />
                  </div>
                  <div className="cell"> 
                    <div className="grid padding">
                      <div className="cell"><h2>{post.name}</h2></div>
                      <div className="cell">{post.description}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="cell"> 
                    <div className="grid padding">
                      <div className="cell"><h2>{post.name}</h2></div>
                      <div className="cell">{post.description}</div>
                    </div>
                  </div>
                  <div className="cell">
                    <img style={{ width: '100%' }} src={`http://localhost:4000/image/${post.image}`} />
                  </div>
                </div>
              )}
            </>
          )
        })}
      </div>
    </div>
  )
}

export default Page

