import React, { useState, useEffect } from "react";
import SearchBox from "./searchBox/SearchBox.js";
import IssueList from "./issueList/IssueList.js";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";
import Pagination from "react-js-pagination";
import "./App.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;
function App() {
  let [keyword, setKeyword] = useState("");
  let [owner, setOwner] = useState(null);
  let [repo, setRepo] = useState(null);
  let [data, setData] = useState([]);
  let [error, setError] = useState();
  let [pageNumber, setPageNumber] = useState();
  let [loading, setloading] = useState(false);
  let [totalPage, setTotalPage] = useState();
  let [issueDetail, setIssueDetail] = useState();
  let [commentList, setCommentList] = useState([]);
  let [commentPage, setCommentPage] = useState(0);
  let [fetchCommentUrl, setFetchCommentUrl] = useState();
  let [totalComPage, setTotalComPage] = useState();
  let [commentloading, setCommentLoading] = useState(false);

  let handleSubmit = () => {
    let { owner, repo } = getRepoOwner(keyword);
    if (!owner || !repo) {
      setError("Invalid input");
    }
    setRepo(repo);
    setOwner(owner);
    console.log(repo, owner);
  };

  let getRepoOwner = (key) => {
    let owner = key.split("/")[0];
    let repo = key.split("/")[1];

    return { owner, repo };
  };

  const getIssues = async () => {
    console.log("should be here");
    setloading(true);
    try {
      let url = `https://api.github.com/repos/${owner}/${repo}/issues?page=${pageNumber}`;
      let response = await fetch(url);
      let data = await response.json();
      setData(data);
      console.log(data);
      const link = response.headers.get("link");
      if (link) {
        console.log(link);
        const getTotalPage = link.match(/page=(\d+)>; rel="last"/); // \d represent number + mean one to many
        if (getTotalPage) {
          setTotalPage(parseInt(getTotalPage[1]));
          console.log(parseInt(getTotalPage[1]));
        }
      } else {
        setError(`API has some problem, error code : ${response.status}`);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const getIssueItem = async (issueNumber) => {
    setCommentList([]);
    try {
      let url = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`;
      let response = await fetch(url);
      let issueData = await response.json();
      setIssueDetail(issueData);
      setFetchCommentUrl(
        `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/comments?page=1&per_page=5`
      );
      console.log("issuedata", issueData, "issueNumber", issueNumber);
    } catch (err) {
      setError(err);
    }
  };

  const getCommentList = async () => {
    console.log("get list of comments");
    // try {
    let comurl = fetchCommentUrl;
    let commentRes = await fetch(comurl);
    let commentData = await commentRes.json();

    if (commentRes.status == 200) {
      const link = commentRes.headers.get("link");
      if (link) {
        const getTotalPage = link.match(/page=(\d+)&per_page=\d+>; rel="last"/);
        if (getTotalPage) {
          console.log("totalpage ne", totalPage);
          setTotalComPage(parseInt(getTotalPage[1]));
        }
      }
      setCommentList([...commentList, ...commentData]);
      console.log("datacomment where?", commentData);
    }
    // } catch (err) {
    //   setError(err);
    // }
  };

  const handleComment = (issueNumber) => {
    setCommentPage(commentPage++);
    setFetchCommentUrl(
      `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/comments?page=${commentPage}&per_page=5`
    );
  };

  useEffect(() => {
    if (!owner || !repo) {
      console.log("am i here???", owner, repo);
      return;
    }
    getIssues();
  }, [owner, repo, pageNumber]);

  useEffect(() => {
    getCommentList();
  }, [fetchCommentUrl]);

  return !data ? (
    <div>
      <BarLoader css={override} size={150} color={"blue"} loading={loading} />
    </div>
  ) : (
    <div>
      <SearchBox setKeyword={setKeyword} handleSubmit={handleSubmit} />
      {error && <Alert variant="danger">{error}</Alert>}
      {totalPage && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={pageNumber}
            itemsCountPerPage={20}
            totalItemsCount={totalPage * 20}
            pageRangeDisplayed={5}
            onChange={(clickedPage) => setPageNumber(clickedPage)}
          />
        </div>
      )}

      {!data ? (
        <div>
          Try to make github issue in a different way. <br />
          Things work, except: <br />
          - Loadmore works after 2nd click i/o first click <br />
          - Spinner didn't show up <br />- If use try-catch on the
          getCommentList function, can't do loadmore T.T
        </div>
      ) : (
        <IssueList
          data={data}
          getIssueItem={getIssueItem}
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
}

export default App;
