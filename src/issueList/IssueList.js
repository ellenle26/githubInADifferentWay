import React, { useState } from "react";
import IssueItem from "../issueItem/IssueItem.js";

const IssueList = ({
  data,
  issueDetail,
  commentList,
  handleComment,
  getIssueItem,
  totalComPage,
  commentPage,
  commentloading,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {data &&
        data.map((issue) => {
          return (
            <div
              style={{
                width: "90%",
                border: "solid 2px black",
                margin: "10px",
                padding: "20px",
              }}
            >
              <div>UserID : {issue.user.id}</div>
              <img
                src={issue.user.avatar_url}
                alt=""
                style={{ width: "50px" }}
              ></img>
              <a
                href="#"
                onClick={() => {
                  handleShow();
                  getIssueItem(issue.number);
                }}
              >
                Title: {issue.title}
              </a>
              <div style={{ height: "25px", overflow: "hidden" }}>
                {issue.body}
              </div>
              <div>Comment: {issue.comments}</div>
            </div>
          );
        })}
      {!issueDetail || !commentList ? (
        <></>
      ) : (
        <IssueItem
          show={show}
          onHide={handleClose}
          handleClose={handleClose}
          issueDetail={issueDetail}
          commentList={commentList}
          handleComment={handleComment}
          totalComPage={totalComPage}
          commentPage={commentPage}
          commentloading={commentloading}
        />
      )}
    </div>
  );
};

export default IssueList;
