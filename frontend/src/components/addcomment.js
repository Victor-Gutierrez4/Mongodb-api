// Name: Victor Gutierrez
// Date: 4/27/26
// Course: IT-302
// Section: [452]
// Assignment: Phase 5 C.U.D. Node.js Data using React.js
// Email: vag@njit.edu

import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import BreweriesDataService from "../services/BreweriesDataService"

export default function AddComment({ user }) {
  const { id } = useParams()
  const [text, setText] = useState("")
  const [existingComment, setExistingComment] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (user) {
      BreweriesDataService.getComments(id)
        .then((res) => {
          const userComment = res.data.find(
            (comment) => comment.userId === user.id
          )

          if (userComment) {
            setExistingComment(userComment)
            setText(userComment.text)
          }
        })
        .catch((err) => console.log(err))
    }
  }, [id, user])

  const saveComment = (e) => {
    e.preventDefault()

    if (!user) {
      setMessage("Please login before adding a comment.")
      return
    }

    if (existingComment) {
      BreweriesDataService.updateComment({
        commentId: existingComment._id,
        text: text,
        userId: user.id
      })
        .then(() => setMessage("Comment updated successfully."))
        .catch((err) => console.log(err))
    } else {
      BreweriesDataService.createComment({
        breweryId: id,
        text: text,
        userName: user.name,
        userId: user.id
      })
        .then(() => setMessage("Comment added successfully."))
        .catch((err) => console.log(err))
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{existingComment ? "Edit Comment" : "Add Comment"}</h1>

      {!user ? (
        <p>
          You must <Link to="/vag_login">login</Link> before adding a comment.
        </p>
      ) : (
        <form onSubmit={saveComment}>
          <label>Comment:</label>
          <br />

          <textarea
            rows="5"
            cols="50"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />

          <br />

          <button type="submit" style={{ marginTop: "10px" }}>
            Submit
          </button>
        </form>
      )}

      {message && <p>{message}</p>}

      <br />
      <Link to={`/vag_breweries/${id}`}>Back to Brewery</Link>
    </div>
  )
}