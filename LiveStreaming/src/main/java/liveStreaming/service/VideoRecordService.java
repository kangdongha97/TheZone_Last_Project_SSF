package liveStreaming.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import liveStreaming.dto.VideoRecordDto;
import liveStreaming.mapper.VideoRecordMapper;

@Service
public class VideoRecordService {
    @Autowired
	VideoRecordMapper mapper;
	
	// 로그인 후 마이페이지 View
	public List<VideoRecordDto> videoRecord(String u_id){
		return mapper.videoRecord(u_id);
	}

	// 20211122 게시물 삭제 
	public int videoDelete(VideoRecordDto videoRecordDto){
		return mapper.videoDelete(videoRecordDto);
	}

	// 20211122 게시물 업로드
	
	public int videoUpload(VideoRecordDto video) {
		return mapper.videoUpload(video);
  }

	// 2021-11-21 강동하 마이페이지 조회수 탑5 영상 조회
	public List<VideoRecordDto> videoViews(String u_id){
		return mapper.videoViews(u_id);
	}

	// 2021-11-22 강동하 WatchPage2 영상 정보 조회
	public List<VideoRecordDto> thisVideo(String v_code){
		return mapper.thisVideo(v_code);
	}
}