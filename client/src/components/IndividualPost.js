// import React, { useState, useEffect } from "react";
// import { Icon, List, Pagination, Button, Container } from "semantic-ui-react";
// import { useParams } from 'react-router-dom';

// function IndividualPost({posts, setRefresh, refresh}) {
//     const {id} = useParams()
//     const [onePost, setOnePost] = useState([])

//     useEffect(() => {
//         fetch(`/posts/${id}`)
//         .then(r => r.json())
//         .then(post_data => {
//             setOnePost(onePost)
//             setOnePost(
//                 post_data.posts.map(post => {
//                     return(
//                         <h1>{post.title}</h1>
//                     )
//                 })
//             )
//         })
//     })
//     return(
//         <h1>{posts.id}</h1>
//     )
// }

// export default IndividualPost