
import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useFormik } from "formik"
import * as yup from "yup"
import './PostForm.css'
import { Icon, Button } from "semantic-ui-react"

function PostForm({addPost}) {
    const history = useHistory()
    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter text"),
        file: yup.string(),
        description: yup.string()
    })

    const formik = useFormik({
        initialValues:{
            title: '',
            file: '',
            description: '',
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
                    res.json().then(post => {
                        addPost(post)
                        history.push(`/posts/${post.id}`)
                    })
                }
            })
        }
    })
    return(
        <div className='share'>

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

export default PostForm

const Form = styled.form`
display:flex;`