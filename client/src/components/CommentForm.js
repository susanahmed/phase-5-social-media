
import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useFormik } from "formik"
import * as yup from "yup"
import './PostForm.css'
import { Icon, Button } from "semantic-ui-react"

function CommentForm({addComment}) {
    const history = useHistory()
    const formSchema = yup.object().shape({
        comment: yup.string().required("Must enter text"),

    })

    const formik = useFormik({
        initialValues:{
            comment: '',
        },

        validationSchema: formSchema, 
        onSubmit:(values) => {
            fetch("/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((res) => {
                if (res.ok) {
                    res.json().then(comment => {
                        addComment(comment)
                        history.push(`/comments/${comment.id}`)
                    })
                }
            })
        }
    })
    return(
        <div className='share'>

            <Form onSubmit = {formik.handleSubmit}>
                <label>Add Comment</label>
                <br />
                <input type = 'text' name = 'comment' value={formik.values.comment} onChange={formik.handleChange} />

                <input type = 'submit' />
            </Form>
        </div>

    )
}

export default CommentForm

const Form = styled.form`
`