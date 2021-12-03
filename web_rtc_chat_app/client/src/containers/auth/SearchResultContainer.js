import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../scroll/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Box,
  Grid,
  Typography,
} from "../../../node_modules/@material-ui/core/index";
import {
  showInfiniteVideoSearch,
  showInfiniteStreamingSearch,
} from "../../lib/api/StreamingAPI";

// 2021-12-03 이태훈 검색시 비디오, 스트리밍 무한 스크롤,
const SearchResultContainer = () => {
  const { search } = useParams();
  const [items, setItems] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [streamEnd, setStreamEnd] = useState(false);

  // 스크롤이 어느정도 내려오면 감지 해서 fetchData함수 실행
  const fetchData = () => {
    setPageNum(pageNum + 1);
    if (!streamEnd && pageNum !== 0) {
      showInfiniteStreamingSearch(search, pageNum).then((res) => {
        if (res.data.length === 0) {
          console.log(22222); 
          setHasMore(false);
          setLoading(false);
          setStreamEnd(true);
          console.log(items);
          getVideos(items, search);
          return;
        }
        return setItems([...items, ...res.data]);
      });
    }

    if(streamEnd && pageNum !== 0){
      console.log(222);
        showInfiniteVideoSearch(search, pageNum).then((res) => {
            setPageNum(pageNum + 1);
            console.log(pageNum);
            if (res.data.length === 0) {
              setHasMore(false);
              setLoading(false);
              return;
            }
            return setItems([...items, ...res.data])
        });
    }
  };

  // 비디오 값 받아오기
  const getVideos = useCallback((items,search) => {
    console.log(items);
    console.log(items.length === 0);
    setLoading(true);
    setHasMore(true);
    setPageNum(0);
    
    showInfiniteVideoSearch(search, 0).then((res) => {
      setPageNum(pageNum + 1);
      if (res.data.length === 0) {
        setLoading(false);
        setHasMore(false);
        return;
      }
      return setItems((items) => [ ...items, ...res.data])
    });
  }, []);

  // 첫 스트리밍 값 받아오기
  const getStreams = useCallback((search) => {
    setLoading(true);
    setHasMore(true);
    showInfiniteStreamingSearch(search, 0).then((res) => {
      if (res.data.length < 5) {
        getVideos(res.data,search);
      }
      setPageNum(pageNum + 1);
      return setItems([...items, ...res.data]);
    });
  }, []);

  // 검색 후 초기화
  useEffect(() => {
    setStreamEnd(false);
    setLoading(true);
    setPageNum(0);
    getStreams(search);
    setItems([]);
  }, [search]);

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      loader={loading && <Loader />}
      endMessage={<p>End!</p>}
    >
      <div className="container">
        <h1>관련 동영상</h1>
        <div className="row m-2">
          {items.map((data, idx) => (
            <Grid
              container
              component={Link}
              to={
                (data.v_code && `/WatchPage2/${data.v_code}`) ||
                (data.l_code && `/WatchPage/${data.l_code}`)
              }
              style={{
                textDecoration: "none",
                marginBottom: 10,
              }}
              key={idx}
            >
              <Grid item xs={5}>
                <Box>
                  <img
                    src={data.l_img || data.v_img}
                    width="100%"
                    alt={data.l_code || data.v_name}
                  />
                </Box>
              </Grid>

              <Grid item xs={4} style={{ marginLeft: 10 }}>
                <Box style={{ width: "800px" }}>
                  <Typography variant="h5" style={{ color: "white" }}>
                    {data.v_name || data.l_title}
                  </Typography>
                  <br />

                  <Typography variant="body1" style={{ color: "gray" }}>
                    {data.v_date || data.l_date}
                  </Typography>

                  <Typography variant="body1" style={{ color: "gray" }}>
                    {data.v_views && `조회수 ${data.v_views} 회`}
                    {data.l_code && `실시간`}
                  </Typography>
                  <br />

                  <Typography variant="body1" style={{ color: "gray" }}>
                    {data.v_descript}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          ))}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default SearchResultContainer;
