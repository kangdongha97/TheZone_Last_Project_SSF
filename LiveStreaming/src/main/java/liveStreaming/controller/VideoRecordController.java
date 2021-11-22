package liveStreaming.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import liveStreaming.dto.VideoRecordDto;
import liveStreaming.service.VideoRecordService;

@RestController
@RequestMapping("/api")
public class VideoRecordController {
	@Autowired
	VideoRecordService service;

	// 로그인 후 마이페이지 View 
	@GetMapping("/videorecord/{u_id}")
	public ResponseEntity<Object> showVideoRecord(@PathVariable String u_id) {
		System.out.println(1);
		return ResponseEntity.ok(service.videoRecord(u_id));
	}

	// 20211122 윤성준 게시물 삭제
	@PostMapping("/videoDelete")
	public ResponseEntity<Object> deleteVideoRecord(@RequestBody VideoRecordDto videoRecordDto) {
		System.out.println(2);
		int res = service.videoDelete(videoRecordDto);
		System.out.println(res);
		return ResponseEntity.ok(res);
	}




	// 2021 11-21 이태훈 비디오 업로드
	@PostMapping("/videoupload")
	public ResponseEntity<Object> videoUpload(@RequestBody VideoRecordDto video) {
		return ResponseEntity.ok(service.videoUpload(video));
  }

	// 2021-11-21 강동하 마이페이지 조회수 탑5 영상 조회
	@GetMapping("/videoviews/{u_id}")
	public ResponseEntity<Object> showVideoViews(@PathVariable String u_id){
		System.out.println(1);
		return ResponseEntity.ok(service.videoViews(u_id));
	}
  
}