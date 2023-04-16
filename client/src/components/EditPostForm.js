
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
import { useFormik } from "formik"
import * as yup from "yup"
import { Form, Modal, Header, Button, Icon, Popup } from "semantic-ui-react";
import PostDetail from './PostDetail'

function EditPostForm({ posts, updatePost }) {
console.log(posts)
    const [errors, setErrors] = useState([])
    const [post, setPost] = useState([])
    const {id, title, description, file, comments} = post
    const params = useParams()

    const formSchema = yup.object().shape({
        title: yup.string().required("Please enter a title"),
        description: yup.string().required("Please enter a description"),
        file: yup.string()
    })

    const formik = useFormik({
        initialValues: {
            title: post.title,
            description: post.description, 
            file: post.file

        }, 
        validationScehma: formSchema,
        onSubmit:(values) => {
        fetch(`/posts/${params.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
        }) . then ((res) => {
            if (res.ok) {
                res.json().then(updatedPost => {
                    updatePost(updatedPost)
                })
            } else {
                setErrors("Please fill out required fields")
            }
        })
    }})

    return(
        <>
        <h1> Edit Post:</h1>
        {errors&& <h2 style= {{color:'red'}}>{errors}</h2>}
        <Form onSubmit = {formik.handleSubmit}>
            <label>Title*</label>
                 <br />
                 <input type = 'text' name = 'title' value={formik.values.title} onChange={formik.handleChange} />
                <br />
                 <label>File</label>
                <br />
                 <input type = 'text' name = 'file' value={formik.values.file} onChange={formik.handleChange} />
                 <br />
                <label>Description</label>
               <br />
                <input type = 'text' name = 'description' value={formik.values.description} onChange={formik.handleChange} />

                <input type = 'submit' />

            </Form>
           
        </>
    )












//     const [posts, setPost] = useState()

//     const history = useHistory()
//     const { id } = useParams()
//     const [initialData, setInitialData] = useState({
//         title: '',
//         description: '',
//         file: '',
//     });

//     // const formSchema = yup.object().shape({
//     //     title: yup.string().required("Must enter text"),
//     //     file: yup.string(),
//     //     description: yup.string()
//     // })

    // useEffect(() => {
    //     fetch(`/posts/${post.id}`)
    //     .then(r => r.json())
    //     .then(post => {
    //         setPost(post)
    //         formik.values.title = post.title
    //         formik.values.description = post.description
    //         formik.values.file = post.file
    //     })
    // }, [])

//     // const formik = useFormik({
//     //     initialValues:{
//     //         text: '',
//     //         file: '',
//     //         description: ''
//     //     },

//     const formSchema = yup.object().shape({
//         title: yup.string().required("Must enter text"),
//         file: yup.string(),
//         description: yup.string()
//     })

//     const formik = useFormik({
//         initialValues: initialData,

//         validationSchema: formSchema, 
//         onSubmit:(values) => {
//             fetch(`/posts/${id}/edit`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(values, null, 2),
//             }).then((res) => {
//                 if (res.ok) {
//                     res.json().then(updatedPost => {
//                         updatePost(updatedPost)
//                         history.push(`/posts`)
//                     })
//                 }
//             })
//         }
//     })
//     return(
//         <div className='App'>
//             <Form onSubmit = {formik.handleSubmit}>
//             <label>Title</label>
//                 <br />
//                 <input type = 'text' name = 'title' value={formik.values.title} onChange={formik.handleChange} />
//                 <br />
//                 <label>File</label>
//                 <br />
//                 <input type = 'text' name = 'file' value={formik.values.file} onChange={formik.handleChange} />
//                 <br />
//                 <label>Description</label>
//                 <br />
//                 <input type = 'text' name = 'description' value={formik.values.description} onChange={formik.handleChange} />

//                 <input type = 'submit' />

//             </Form>
//         </div>
//     )
// }

}
export default EditPostForm

// const Form = styled.form`
// display:flex;`