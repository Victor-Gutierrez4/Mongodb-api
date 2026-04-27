// Name: Victor Gutierrez
// Date: 4/27/26
// Course: IT-302
// Section: [452]
// Assignment: Phase 5 C.U.D. Node.js Data using React.js
// Email: vag@njit.edu

import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import BreweriesDataService from "../services/BreweriesDataService"

export default function Brewery({ user }) {
  const { id } = useParams()
  const [brewery, setBrewery] = useState(null)
  const [comments, setComments] = useState([])

  const getBrewery = () => {
    BreweriesDataService.get(id)
      .then((res) => setBrewery(res.data))
      .catch((err) => console.log(err))
  }

  const getComments = () => {
    BreweriesDataService.getComments(id)
      .then((res) => setComments(res.data))
      .catch((err) => console.log(err))
  }

  const deleteComment = (commentId) => {
    BreweriesDataService.deleteComment({
      commentId: commentId,
      userId: user.id
    })
      .then(() => getComments())
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getBrewery()
    getComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (!brewery) {
    return <p style={{ padding: "20px" }}>Loading...</p>
  }

  const userComment = user
    ? comments.find((comment) => comment.userId === user.id)
    : null

  return (
    <div style={{ padding: "20px" }}>
      <h1>{brewery.name}</h1>

      {brewery.image && (
        <img
          src={brewery.image}
          alt={brewery.name}
          style={{ maxWidth: "400px", width: "100%" }}
        />
      )}

      <p><strong>Type:</strong> {brewery.brewery_type}</p>
      <p><strong>City:</strong> {brewery.city}</p>
      <p><strong>State:</strong> {brewery.state}</p>

      <hr />

      <h2>Comments</h2>

      {user ? (
        <Link to={`/vag_breweries/${id}/comment`}>
          {userComment ? "Edit Comment" : "Add Comment"}
        </Link>
      ) : (
        <p>
          <Link to="/vag_login">Login</Link> to add a comment.
        </p>
      )}

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginTop: "10px"
            }}
          >
            <p>{comment.text}</p>
            <p>
              <strong>By:</strong> {comment.userName}
            </p>

            {user && user.id === comment.userId && (
              <button onClick={() => deleteComment(comment._id)}>
                Delete Comment
              </button>
            )}
          </div>
        ))
      )}

      <br />
      <Link to="/vag_breweries">Back to Breweries</Link>
    </div>
  )
}