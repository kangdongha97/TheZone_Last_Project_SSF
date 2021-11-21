package liveStreaming.mapper;

import liveStreaming.dto.UserDto;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMapper {
	// 2021 1116 이태훈
	// 로그인
	UserDto loginUser(UserDto user);
	
	// 2021 1118 강동하
	// 회원가입 
	int registerUser(UserDto user);

	// 2021 1116 박진현
	//아이디 체크
	UserDto checkUser(UserDto user);


	UserDto login(UserDto user);
}