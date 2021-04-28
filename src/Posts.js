import React, {useState, useEffect} from 'react'

export const Posts = () => {
    const [data, setData] = useState({posts: [], comments: [], profile: {}})
    const [urls, setUrls] = useState(['posts', 'comments', 'profile'])

    useEffect(() => {
        Promise.all(urls.map(u => fetch(u,))).then(responses =>
            Promise.all(responses.map(res => res.json()))
        ).then(res => {
            urls.forEach((item, i) =>
                setData(prev => ({...prev, [item]: res[i]})))
        })
    }, [urls])

    return (
        <div>
            {data.posts.map((post, idx) => {
                const comments = data.comments.filter(({postId = null}) => postId === post.id)
                return (
                    <div key={idx} className="post-item">
                        <div>
                            <small><small><em>author:</em></small> {post.author} <span
                                className="date">{new Date(post.date).toLocaleString()}</span></small>
                        </div>
                        <h4>{post.title}</h4>
                        {comments.length ? <div className="comments">
                            <h5>Comments:</h5>
                            {comments.map((com, idxCom) => {
                                return (
                                    <div key={idxCom} className="comment">
                                        <p>{com.body}</p>
                                        <small><strong><em>{com.author}</em></strong> /<span
                                            className="date">{new Date(com.date).toLocaleString()}</span>/</small>
                                    </div>
                                )
                            })}
                        </div> : null}
                    </div>
                )
            })}
        </div>
    )
}