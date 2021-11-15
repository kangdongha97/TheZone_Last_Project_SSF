package liveStreaming.service;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import liveStreaming.dto.TestDto;

@RunWith( SpringRunner.class )
@SpringBootTest
public class TestServiceTest {

	@Autowired
	TestService service;
	
	@Test
	public void testShowTest() {
		List<TestDto> t = service.showTest();
		for(TestDto t2 : t) {
			System.out.println(t2);
		}
		Assertions.assertNotNull(t);
	}

}
