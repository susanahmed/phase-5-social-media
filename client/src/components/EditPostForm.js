
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
import { useFormik } from "formik"
import * as yup from "yup"

function EditPostForm({updatePost}) {
    const [post, setPost] = useState()

    const history = useHistory()
    const { id } = useParams()

    const formSchema = yup.object().shape({
        text: yup.string().required("Must enter text"),
        file: yup.string(),
        description: yup.string()
    })

    useEffect(() => {
        fetch(`/posts/${id}`)
        .then(r => r.json())
        .then(post => {
            setPost(post)
            formik.values.text = post.text
            formik.values.description = post.description
            formik.values.file = post.file
        })
    }, [])

    const formik = useFormik({
        initialValues:{
            text: '',
            file: '',
            description: ''
        },

        validationSchema: formSchema, 
        onSubmit:(values) => {
            fetch("/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((res) => {
                if (res.ok) {
                    res.json().then(updatedPost => {
                        updatedPost(updatedPost)
                        history.push(`/posts`)
                    })
                }
            })
        }
    })
    console.log(formik)
    return(
        <div className='App'>
            <Form onSubmit = {formik.handleSubmit}>
            <label>Title</label>
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
        </div>
    )
}

export default EditPostForm

const Form = styled.form`
display:flex;`