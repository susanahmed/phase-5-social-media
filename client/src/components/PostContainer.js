import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { Icon, List, Button, Container } from "semantic-ui-react"

function PostContainer({posts, handleDelete}) {
    const postList = posts?.map(post => {
        return (
            <React.Fragment key ={post.id}>
                <br />
                <List.Item>
                    <List.Icon name="like" size="big" color='red' />
                    <List.Content>
                        <List.Header >
                            {post.text}
                            <Button.Group basic size='small' floated='right' color ='blue'>
                            <Link to = {`posts/${post.id}/edit`}>
                                <Button icon>
                                    <Icon name='edit' size="small" />
                                </Button>
                            </Link>
                            <Button icon onClick={() => handleDelete(post.id)}>
                                <Icon name = 'trash alternate' size="small" />
                            </Button>
                            </Button.Group>

                        </List.Header>
                        <List.Description >
                            {post.file}
                        </List.Description>

                    </List.Content>
                </List.Item>
            </React.Fragment>
        )
    })
}
export default PostContainer