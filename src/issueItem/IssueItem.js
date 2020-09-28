import React from "react";
import { Modal, Button } from "react-bootstrap";
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;
const IssueItem = ({
  show,
  handleClose,
  issueDetail,
  commentList,
  handleComment,
  totalComPage,
  commentPage,
  commentloading,
}) => {
  return (
    <div>
      <Modal size="xl" show={show} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{issueDetail.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{issueDetail.body}</div>
          <div>
            <div
              style={{
                borderTop: "solid 2px black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              COMMENTS:
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {commentList &&
                commentList.map((com) => (
                  <div
                    style={{
                      border: "solid 1px black",
                      margin: "20px",
                      width: "90%",
                    }}
                  >
                    <img
                      src={com.user.avatar_url}
                      alt=""
                      style={{ width: "50px" }}
                    ></img>
                    <div style={{ wordWrap: "break-word" }}>{com.body}</div>
                  </div>
                ))}
              <div>
                {commentList.length == issueDetail.comments ? (
                  <BarLoader
                    css={override}
                    size={150}
                    color={"blue"}
                    loading={commentloading}
                  />
                ) : (
                  <button
                    onClick={() => {
                      handleComment(issueDetail.number);
                      console.log(
                        "commentnum",
                        issueDetail.number,
                        "dc di ma oi"
                      );
                    }}
                  >
                    Load more
                  </button>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IssueItem;
