package com.clazzbuddy.utils;

import java.util.Random;

public class CommonUtils {

	public static Integer getRandomId() {
		Random random = new Random();
		return random.nextInt(256*256*256);
	}
}
