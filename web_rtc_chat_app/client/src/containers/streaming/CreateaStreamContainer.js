import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change, cut, insertStreaming } from "../../modules/streaming";
import { nanoid } from "nanoid";
import { useHistory } from "react-router";
import { SocketContext } from "../../SocketContext";
import Container from "@mui/material/Container";
import { Grid, Typography, Input } from "../../../node_modules/@material-ui/core/index";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

// 2021 1125 streaming 방만들기 이태훈 << 구대기
// 2021-12-02 강동하 대규모 리팩토링2

const CreateaStreamContainer = () => {
  const { socketRef } = useContext(SocketContext);
  //const u_id = localStorage.getItem("u_id");
  const dispatch = useDispatch();
  //const l_code = nanoid();

  //const [u_id, setU_id] = useState(localStorage.getItem("u_id"));
  //const [l_code, setL_code] = useState(nanoid());
  // useEffect(()=>{
    
  // })
  const history = useHistory();

  // const streamingInfo = {
  //   l_code:"",
  //   u_id:"",
  //   l_title: "",
  //   l_description: "",
  //   l_img: "",
  // };

  //const [streamInfo, setStreamInfo] = useState("streamingInfo");
  //const [streamInfo, setStreamInfo] = useState({});
  const [isValidCheck, setIsValidCheck] = useState(false);
  const [selectedIFile, setSelectedIFile] = useState(null); // 이미지
  const [img, setImg] = useState(""); // 이미지
  const [setting, setSetting] = useState("");

  const {streamInfo, l_code, u_id, l_title, l_description, l_img } = useSelector((state) => ({
    //imgTransf:state.streaming.streamInfo.l_img,
    streamInfo:state.streaming,
    l_code:state.streaming.l_code,
    u_id:state.streaming.u_id,
    l_title:state.streaming.l_title,
    l_description:state.streaming.l_description,
    l_img:state.streaming.l_img,
  }))

  const handleStreamInfo = (e) => {
    //setStreamInfo({ ...streamInfo, [e.target.name]: e.target.value });
    setIsValidCheck(false);
    // dispatch(change({ streamInfo }));
    const { name, value } = e.target;
    dispatch(change({ name, value }));
  };

  const createStreaming = () => {
    // console.log('방만들기');

    // 방만들기
    if (streamInfo.l_title === "") {
      setIsValidCheck(true);
      return;
    }
    if (window.confirm(`스트림키는 ${streamInfo.l_code}입니다.`)) {
      socketRef.emit("clientCreateRoom", streamInfo);
      dispatch(insertStreaming(streamInfo));
      history.push(`/WatchPage/${streamInfo.l_code}`);
    } else {
      alert("방만들기를 취소 하셨습니다.");
    }
  };

  // 2021-12-02 강동하 썸네일 이미지 업로드
  // 2021-12-02 강동하 썸네일 이미지 onChange
  const handleImgChange = (e) => {
    // console.log(e.target.files[0]);
    setSelectedIFile(e.target.files[0]);
  };

  useEffect(()=>{
    selectedIFile && fileNameCheck();
    //console.log(selectedIFile);
  }, [selectedIFile])

  // useEffect(()=>{
  //   console.log("바뀜");
  // }, [imgTransf])

    // 2021-12-02 강동하 썸네일 이미지 파일 정규표현식 및 중복체크
    const fileNameCheck = (e) => {
      //console.log(e.currentTarget);
      if (selectedIFile != null) {
        let imegePattern = /(.png|.jpg|.jpeg|.gif|.bmp|.dib|.tif|.tiff)$/;
        if(imegePattern.test(selectedIFile.name) !== true) {
          alert("이미지 파일을 확인해주세요. \n\n사용가능 파일 : PNG, JPG, JPEG, GIF, BMP, DIB, TIF, TIFF");
        }
        else {
          let imagePreProcess = selectedIFile.name.replace(imegePattern, "");
          // 썸네일 파일이름 중복체크
          axios.get(`/api/streamfilename/${imagePreProcess}`)
          .then(response => {
            let INumber = response.data;
            //console.log(INumber);
            //handleFileUpload(INumber);
            // console.log(INumber);
            if(INumber != 0) {
              INumber = INumber + 1;
              let IFileSplit = selectedIFile.name.split('.');
                // for ( let i in IFileSplit ) {
                //   console.log(IFileSplit[i]);
                // }
              var IResult = IFileSplit[0].concat(` (${INumber}).${IFileSplit[1]}`);
            } else {
              var IResult = selectedIFile.name;
            }
            // console.log(IResult);
            setImg(IResult);
            const url = "https://ssfupload.s3.ap-northeast-2.amazonaws.com/streaming/";
            const l_imgURL = url + IResult;
            //setStreamInfo({ ...streamInfo, l_img: l_imgURL});
            // 2021-12-02 강동하 s3 url + 파일명 스토어에 저장
            dispatch(change({ name: 'l_img', value: l_imgURL }));
          })
          .catch(error => {
            // console.log(error);
          })
        }
      } 
    }

    // 2021-12-02 강동하 썸네일 이미지 파일 저장
    const handleFileUpload = () => {
      // console.log("저장");
      // console.log(img);
      // console.log(INumber);
      // console.log(selectedIFile.name);

      // 2021-12-02 강동하 S3 업로드
      if (selectedIFile != null) {
        const imgData = new FormData();
        imgData.append("file", selectedIFile, img);
  
        axios
        .post("/api/uploadimg", imgData, {
          //.post("https://18.219.234.0:8080/api/upload", imgData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      }
      // 2021-12-02 강동하 db에 이미지 경로 업로드(방송 시작)
      createStreaming();
    };

  return (
    <div>
      <Container
        component="main"
        maxWidth="xs"
        
        style={{
          background: "#FFFF",
          borderRadius: 5,
          marginTop: 170,
          height: "100%",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20,fontFamily:'Noto Sans KR' }}>실시간 방 만들기</h2>
        <div>
          <p>방 제목</p>
          <TextField
            fullWidth
            name="l_title"
            onChange={handleStreamInfo}
            value={l_title}
          />
        </div>
        <div>
          {isValidCheck && (
            <label style={{ color: "red",fontFamily:'Noto Sans KR' }}>방 제목을 입력 해주세요</label>
          )}
        </div>
        <p style={{ marginTop: 20,fontFamily:'Noto Sans KR' }}>방 설명</p>
        <TextField
          name="l_description"
          onChange={handleStreamInfo}
          value={l_description}
          fullWidth
        />
            {/* 이미지 선택 */}
            {/* 2021-12-02 강동하 방송중 썸네일 업로드 */}
            <Grid style={{ marginTop: 30 }}>
              <Typography style={{fontFamily:'Noto Sans KR'}}>썸네일 파일 선택</Typography>
            </Grid>
            <Grid>
              
              <Input
              name="l_img"
                type="file"
                required
                onChange={handleImgChange}
                style={{ width: '100%' }}
              />
              
            </Grid>

        <div style={{ textAlign: "center" }}>
          <Button
            style={{ marginTop: 30, marginBottom: 20,fontFamily:'Noto Sans KR' }}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleFileUpload}
          >
            방만들기{" "}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default CreateaStreamContainer;
