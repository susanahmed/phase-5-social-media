
import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useFormik } from "formik"
import * as yup from "yup"

function PostForm({addPost}) {
    const history = useHistory()
    const formSchema = yup.object().shape({
        text: yup.string().required("Must enter text"),
        file: yup.string()
    })

    const formik = useFormik({
        initialValues: {
            text: '',
            file: '',
        },

        validationSchema: formSchema, 
        onSubmit: (values) => {
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
        <div className='App'>
            <Form onSubmit = {formik.handleSubmit}>
                <label>Text</label>
                <br />
                <input type = 'text' name = 'text' value={formik.values.text} onChange={formik.handleChange} />
                <br />
                <label>Content</label>
                <br />
                <input type = 'text' name = 'file' value={formik.values.file} onChange={formik.handleChange} />

                <input type = 'submit' />

            </Form>
        </div>
    )
}

export default PostForm

const Form = styled.form`
display:flex;`