package liveStreaming.controller;


import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import liveStreaming.mapper.VideoRecordMapper;

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

	@Autowired
	VideoRecordMapper mapper;
	// 20211119 윤성준 로그인 후 마이페이지 영상 조회
	@GetMapping("/videorecord/{u_id}")
	public ResponseEntity<Object> showVideoRecord(@PathVariable String u_id) {
		return ResponseEntity.ok(service.videoRecord(u_id));
	}

	// 20211122 윤성준 게시물 삭제
	@PostMapping("/videoDelete")
	public ResponseEntity<Object> deleteVideoRecord(@RequestBody VideoRecordDto videoRecordDto) {
		List<VideoRecordDto> res = service.videoDelete(videoRecordDto);
		return ResponseEntity.ok(res);
	}

	// 20211123 윤성준 Main video 전체 리스트검색문
	@GetMapping("/videoView")
	public ResponseEntity<Object> showMainVideo() {
		return ResponseEntity.ok(service.mainVideo());
	}

	// 20211123 윤성준 MainPage 조회수 탑5 영상 조회
	@GetMapping("/videoTop5")
	public ResponseEntity<Object> showTopViews() {
		return ResponseEntity.ok(service.videoTop5());
	}

	// 20211125 윤성준 All Video Search 전체에서 영상 조회
	@GetMapping("/videoSearch/{v_name}")
	public ResponseEntity<Object> searchVideoAll(@PathVariable String v_name) {
		return ResponseEntity.ok(service.videoSearch(v_name));
	}

	// 2021 11-21 이태훈 비디오 업로드
	@PostMapping("/videoUpload")
	public ResponseEntity<Object> videoVidImgUpload(@RequestBody VideoRecordDto video) {
		return ResponseEntity.ok(service.videoUpload(video));
	}


	// 2021-11-30 강동하 수정 영상파일이름, 썸네일이름 중복체크
	@GetMapping("/filename/{v_link}/{v_img}")
	public LinkedList<Object> fileName(@PathVariable String v_link, @PathVariable String v_img) {

		LinkedList<Object> result = new LinkedList<Object>();
		result.add(ResponseEntity.ok(service.videoVfileCheck(v_link)));
		result.add(ResponseEntity.ok(service.videoIfileCheck(v_img)));
		return result;
	}
	//2021 11-26 박진현 비디오 수정
	@PatchMapping("/videoupdate")
	public ResponseEntity<Object> videoupdate(@RequestBody VideoRecordDto video) {
		int videoUpdate = mapper.videoupdate(video);
		return ResponseEntity.ok(videoUpdate);
	}

	//2021 11-26 박진현 비디오 검색
	@GetMapping("/videochangeserch/{v_code}")
		public ResponseEntity<Object> videochangeserch(@PathVariable String v_code) {
		return ResponseEntity.ok(mapper.videochangeserch(v_code));

	}

	// 2021-11-21 강동하 마이페이지 조회수 탑5 영상 조회
	@GetMapping("/videoviews/{u_id}")
	public ResponseEntity<Object> showVideoViews(@PathVariable String u_id) {
		return ResponseEntity.ok(service.videoViews(u_id));
	}

	// 2021-11-22 강동하 WatchPage2 영상 정보 조회
	@GetMapping("/thisvideo/{v_code}")
	public ResponseEntity<Object> showThisVideo(@PathVariable String v_code) {
		return ResponseEntity.ok(service.thisVideo(v_code));
	}

	// 2021-11-25 강동하 영상 조회수 + 1
	@PatchMapping("/viewsinc")
	public ResponseEntity<Object> viewsInc(@RequestBody VideoRecordDto video) {
		return ResponseEntity.ok(service.viewsInc(video));
	}


	// 2021-11-29 강동하 영상 업로드 시 영상제목 중복체크
	@GetMapping("/videonamecheck/{v_name}")
	public ResponseEntity<Object> videoNameCheck(@PathVariable String v_name) {
		return ResponseEntity.ok(service.videoNameCheck(v_name));
	}
	
	// 2021-12-02 이태훈 비디오 무한 스크롤 검색
	@GetMapping("/videoInfiniteSearch/{v_name}/{pageNum}")
	public ResponseEntity<Object> videoInfiniteSearch(@PathVariable String v_name, @PathVariable int pageNum) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("v_name", v_name);
		map.put("pageNum", pageNum);
		return ResponseEntity.ok(service.videoInfiniteSearch(map));
	}
}